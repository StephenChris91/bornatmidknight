const express = require("express");
const db = require("mongoose");
const Post = require("./models/Post");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

// Add body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
db.connect(
  "mongodb+srv://bornatmidknight:bornatmidknight@bornatmidknight.b4af7xi.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/post", async (req, res) => {
  const { title, summary, postContent, category, date } = req.body;

  const newPostRef = await Post.create({
    title,
    summary,
    content: postContent,
    category,
    date,
  });
  res.json(newPostRef);
});

app.get("/posts", (req, res) => {
  res.send("This is a nodejs api");
});

app.listen(4000);
