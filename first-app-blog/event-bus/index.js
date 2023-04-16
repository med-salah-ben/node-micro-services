const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.json());

const events = [];
// console.log("events : " , events)

//end point with POST method
app.post("/events", (req, res) => {
    const event = req.body;
    // console.log(event)

    //store events if one of server down we can store our events to back & take it
    events.push(event);
    // console.log("events2 : " , events)

  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });;
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });;
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err);
  });;
  //---MODERATION : 
  axios.post("http://localhost:4003/events", event).catch((err) => {
    console.log(err.message);
  });;

  res.status(201).send({status:"OK"})
});


//create new end-Points
//Method : GET
//Purpose : synchronize services after they've been out of services 
app.get("/events",(req,res)=>{
  res.send(events);
})



app.listen(4005 , (err) => {
  err ?
  console.log(err)
  :console.log("listening on port 4005");
});
