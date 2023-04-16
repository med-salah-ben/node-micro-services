const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.json());

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  //-----new event is come
  if (type === "CommentCreated") {
    //---MODERATION : get Status from COMMENT data
    const { id, content, postId, status } = data;
    const post = posts[postId];

    post.comments.push({ id, content, status });
  }
  //-----new event is come
  if (type === "CommentStatusUpdated") {
    const { postId, id, content, status } = data;
    //get current post
    const post = posts[postId];
    console.log(post);
    //get current comment
    const comment = post.comments.find((aComment) => {
      return aComment.id === id;
    });
    // Update comment Status
    comment.status = status;
    comment.content = content;
    console.log("P updated : ",post);
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  try {
    //------------get type & data from req.body when new event is comeing
    const { type, data } = req.body;
    //-----new event is come
    handleEvent(type, data);
  } catch (error) {
    console.log(error);
  }

  res.send({});
});

app.listen(4002, async (err) => {
  err ?
  console.log(err)
  :console.log("listening on port 4002");

  //if we reconnect to our server : GET & listning to all EVENTS.
  //Give All events occured over time.
  //Method : GET
  try {
    const res = await axios.get("http://localhost:4005/events");
    for (let event of res.data) {
      console.log("Processing Event : ", event.type);
      //Call Handle EVENT Function :
      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error);
  }
});
