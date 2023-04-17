// Sends the list of all posts( each post has its comments)
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
/*
posts=={
    'postId':{
        id,
        title,
        comments:[]
    }
}
*/
const handelEvents = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  //After Commnet Moderation
  if (type === "CommentUpdated") {
    const { status, postId, id, content } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
    comment.content = content;
    //No need to save into array again as its object so we're updating to hte array directly
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handelEvents(type, data);
  console.log("\n\n\t Recieved by QUERY SERVICE : ", type);
  res.send({});
});

app.listen(4002, async () => {
  console.log("\n\t QUERT SERVER : Listening on Port 4002");

  //When ever Query Service is down, when it boots up it calls the event-bus and gets all the events
  // (We are also retriving seen events (events before breakdown) though the o/p doesnt change, performance could)
  const res = await axios.get("http://event-bus-srv:4005/events");
  for (let event of res.data) {
    // res.data has collection of events
    handelEvents(event.type, event.data);
  }
});
