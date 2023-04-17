// It is used to Watch for events and moderate a comment based on its words
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    //const { id, content, postId, status } = data;
    const status = data.content.includes("orange") ? "rejected" : "approved";
    //Send the moderated comment back
    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        content: data.content,
        postId: data.postId,
        status: status,
      },
    });
  }
  res.send({});
});

app.listen(4003, () =>
  console.log("\n\t MODERATION SERVICE : Listening on 4003")
);
