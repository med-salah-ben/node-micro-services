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
    comments.push({ id: commentId, content , status:"pending" });

    commentsByPostId[req.params.id] = comments;

    await axios.post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        id: commentId,
        content,
        postId: req.params.id,
        //---MODERATION : send status to EVENT BUS
        status:"pending"
      },
    });

    res.status(201).send(comments);
  } catch (error) {
    console.log(error);
  }
});

app.post("/events", (req, res) => {
  console.log("Event Received :", req.body.type);
  res.send({ msg: "comment created" });
});

app.listen(4001, () => {
  console.log("listening on port 4001");
});
