const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());

app.use(express.json());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  try {
    const id = randomBytes(4).toString("hex");
    const { title } = req.body;

    // posts[id] = key ----
    posts[id] = {
      id,
      title,
    };

    await axios.post("http://localhost:4005/events", {
      type: "PostCreated",
      data: { id, title },
    });

    res.status(201).send(posts[id]);
  } catch (error) {
    console.log(error);
  }
});

app.post("/events", (req, res) => {
    console.log("Event Received :", req.body.type);
    res.send({msg:"post created"});
  });


app.listen(4000, () => {
  console.log("listening on port 4000");
});
