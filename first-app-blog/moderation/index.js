//we don't need to add cors because this services will never communicate with Our React App 
//Moderation communicate just with our services
const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

// app.post("/event",(req,res)=>{

// })

app.listen(4003, () => {
  console.log("listening on port 4003");
});
