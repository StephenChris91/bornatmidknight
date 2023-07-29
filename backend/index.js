const express = require("express");
const db = require("mongoose");
const Post = require("./models/Post");
const bodyParser = require("body-parser");
const cors = require("cors");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const multer = require("multer");

const app = express();
// app.use(cors());
const allowedOrigins = ["http://localhost:3000", "https://bornatmidknight.com"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use("/uploads", express.static(__dirname + "/tmp"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const bucket = "bornatmidknight";

// Create a storage engine for multer
const upload = multer({ dest: "/tmp" });
async function uploadToS3(path, originalFilename, mimetype) {
  const client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: "AKIA3O5WTWQJAC3ICTGA",
      secretAccessKey: "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",
    },
  });

  const parts = originalFilename.split(".");
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + "." + ext;
  const data = await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: fs.readFileSync(path),
      Key: newFilename,
      ContentType: mimetype,
      ACL: "public-read",
    })
  );
  // console.log({ data });
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

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
  const { originalname, path, mimetype } = req.file;
  const imageURL = await uploadToS3(path, originalname, mimetype);
  console.log(imageURL);

  try {
    const newPostRef = await Post.create({
      title,
      summary,
      content: postContent,
      category,
      date,
      // cover: img, // Assuming you want to use the updated newPath here
      image: imageURL,
    });

    res.json(newPostRef);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Oops! Failed to create Post" });
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
    "mongodb+srv://bornatmidknight:bornatmidknight@bornatmidknight.b4af7xi.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Set maxTimeMS to a higher value (e.g., 30 seconds)
      // if you have a legitimate reason for longer query times.
      maxTimeMS: 30000, // 30 seconds
    }
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
