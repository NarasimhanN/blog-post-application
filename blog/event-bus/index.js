const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const eventsList = []; // To store all events

app.post("/events", async (req, res) => {
  const event = req.body;
  eventsList.push(event);
  try {
    //    await axios.post("http://localhost:4001/events", event); //Send to Comment Service

    await axios.post("http://posts-srv:4000/events", event); // Send to Post Service
    await axios.post("http://comments-srv:4001/events", event); //Send to Comment Service
    await axios.post("http://query-srv:4002/events", event); // Send to Query service - has all comments and posts ( If we have 3 posts with comments, should'nt call getComments for each post, hence storing all in this )
    await axios.post("http://moderation-srv:4003/events", event); // To Moderation Service to moderate a comment to Approved or Reject ( Current state is Pending)
  } catch {
    console.log("\n\n\t Could not Broadcast");
  }
  res.send({ status: "OK" });
});

//When some Service is down and boots up, it calls the event bus and takes in the events it missed
app.get("/events", (req, res) => {
  console.log("\n\tSending All Event Array to requester", eventsList.length);
  res.send(eventsList);
});

app.listen(4005, () => {
  console.log(" EVENT - BUS : Listening on Port : 4005");
});
