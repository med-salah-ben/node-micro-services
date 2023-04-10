const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.json());

const posts = {};
console.log(posts);

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data  } = req.body;
  if (type === "PostCreated") {
    const { id, title  } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    //---MODERATION : get Status from COMMENT data
    const { id, content, postId , status } = data;
    const post = posts[postId];

    post.comments.push({ id, content , status });
  }
  console.log(posts);
  res.send({});
});

app.listen(4002, () => {
  console.log("listening on port 4002");
});
