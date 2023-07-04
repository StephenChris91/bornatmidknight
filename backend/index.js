const express = require("express");
const db = require("mongoose");
const Post = require("./models/Post");

const app = express();

db.connect(
  "mongodb+srv://bornatmidknight:bornatmidknight@bornatmidknight.b4af7xi.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/post", async (req, res) => {
  const { title, summary, content } = req.body;

  const newPostRef = await Post.create({ title, summary, content });
  res.json(newPostRef);
});

app.get("/posts", (req, res) => {
  res.send("This is a nodejs api");
});

app.listen(4000);
