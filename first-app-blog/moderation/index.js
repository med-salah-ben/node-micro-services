//we don't need to add cors because this services will never communicate with Our React App
//Moderation communicate just with our services
const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const status = data.content.includes("test") ? "rejected" : "approved";
    try {
      await axios.post("http://localhost:4005/events", {
        type: "CommentModerated",
        data: {
          id: data.id,
          postId: data.postId,
          content: data.content,
          status,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  res.send({});
});

app.listen(4003, (err) => {
  err ?
  console.log(err)
  :console.log("listening on port 4003");
});
