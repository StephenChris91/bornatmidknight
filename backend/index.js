const express = require("express");
const db = require("mongoose");
const Post = require("./models/Post");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
// const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use("/uploads", express.static(__dirname + "/uploads"));

// Add body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a storage engine for multer
const upload = multer({ dest: "/tmp" });

// const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("Hello, this is the backend for my application!");
});

app.post("/post", upload.single("image"), async (req, res) => {
  db.connect(
    "mongodb+srv://bornatmidknight:bornatmidknight@bornatmidknight.b4af7xi.mongodb.net/?retryWrites=true&w=majority"
  );
  const { title, summary, postContent, category, date } = req.body;

  // Check if a file was uploaded before accessing its properties
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    const img = newPath.slice(8);
    fs.renameSync(path, newPath);
    // Now imagePath (newPath in this case) can be used in the database
    console.log(img);

    try {
      const newPostRef = await Post.create({
        title,
        summary,
        content: postContent,
        category,
        date,
        cover: img, // Assuming you want to use the updated newPath here
        image: newPath,
      });

      res.json(newPostRef);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the post" });
    }
  }
});

app.put("/post", async (req, res) => {
  db.connect(
    "mongodb+srv://bornatmidknight:bornatmidknight@bornatmidknight.b4af7xi.mongodb.net/?retryWrites=true&w=majority"
  );
  const { id, title, summary, postContent, image } = req.body;

  try {
    const postDoc = await Post.findById(id);

    console.log(postDoc);

    if (!postDoc) {
      return res.status(404).json({ error: "Post not found" });
    }

    postDoc.title = title;
    postDoc.summary = summary;
    postDoc.content = postContent;
    // postDoc.image

    await postDoc.save();

    res.json(postDoc);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the post" });
  }
});

app.get("/posts", async (req, res) => {
  db.connect(
    "mongodb+srv://bornatmidknight:bornatmidknight@bornatmidknight.b4af7xi.mongodb.net/?retryWrites=true&w=majority"
  );
  const post = await Post.find();
  res.send(post);
});

app.get("/recent", async (req, res) => {
  db.connect(
    "mongodb+srv://bornatmidknight:bornatmidknight@bornatmidknight.b4af7xi.mongodb.net/?retryWrites=true&w=majority"
  );
  try {
    const posts = await Post.find().sort({ date: -1 }).limit(3);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.get("/post/:postId", async (req, res) => {
  db.connect(
    "mongodb+srv://bornatmidknight:bornatmidknight@bornatmidknight.b4af7xi.mongodb.net/?retryWrites=true&w=majority"
  );
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE request to delete a specific post
app.delete("/post/:id", async (req, res) => {
  db.connect(
    "mongodb+srv://bornatmidknight:bornatmidknight@bornatmidknight.b4af7xi.mongodb.net/?retryWrites=true&w=majority"
  );
  try {
    const postId = req.params.id;

    // Delete the post from your database
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(4000);
