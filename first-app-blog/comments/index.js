const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  try {
    const commentId = randomBytes(4).toString("hex");
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    //---MODERATION : add status to the comment schema
    comments.push({ id: commentId, content, status: "pending" });

    commentsByPostId[req.params.id] = comments;

    await axios.post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        id: commentId,
        content,
        postId: req.params.id,
        //---MODERATION : send status to EVENT BUS
        status: "pending",
      },
    });

    res.status(201).send(comments);
  } catch (error) {
    console.log(error);
  }
});

app.post("/events", async (req, res) => {
  try {
    console.log("Event Received :", req.body.type);

    //---MODERATION :
    const { type, data } = req.body;
    //check if type CommentModerated
    if (type === "CommentModerated") {
      //create updated the old comment
      //1  get necessary data
      const { postId, id, status, content } = data;
      //2 use postId to get current post comment
      const comments = commentsByPostId[postId];
      //3- find the currnet comment with id
      const comment = comments.find((aComment) => {
        return aComment.id === id;
      });
      //4- update comment STATUS with the new STATUS from Moderation
      comment.status = status;

      //5- send new event to EVENTBUS , return new type and update comment STATUS in QUERY services
      await axios.post("http://localhost:4005/events", {
        type: "CommentStatusUpdated",
        data: {
          postId,
          id,
          status,
          content,
        },
      });
    }

    res.send({});
  } catch (error) {
    console.log(error)
  }
});

app.listen(4001, (err) => {
  err ?
  console.log(err)
  :console.log("listening on port 4001");
});
