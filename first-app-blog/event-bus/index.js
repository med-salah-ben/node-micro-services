const express = require("express");
const { randomBytes } = require("crypto");
const axios = require("axios");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.json());

app.post("/events", (req, res) => {
    const event = req.body;
    console.log(event)
  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });;
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });;
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  });;

  res.status(201).send({status:"OK"})
});

app.listen(4005 , () => {
  console.log("listening on port 4005");
});
