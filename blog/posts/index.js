const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors()); //As we were getting some error to send from local host to local host

const posts = {};

//Retrieve all posts
app.get("/posts", (req, res) => {
  res.send(posts);
});

//Creation of new Posts
app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };

  // Send to event bus for Brodcast
  await axios
    .post("http://event-bus-srv:4005/events", {
      type: "PostCreated",
      data: { id, title },
    })
    .catch((err) => {
      console.log("\n\t Issue in POSTS SERV for Sendin to Event Bus ");
    });

  //Send positive status
  res.status(201).send(posts[id]);
});

//To handel event
app.post("/events", (req, res) => {
  console.log("\n\n\t Recieved EVENT to POST Server : ", req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log("POST SERVER  : Listening on 4000");
});
