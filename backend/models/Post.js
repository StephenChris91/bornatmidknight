const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    title: { type: String },
    summary: { type: String },
    content: { type: String },
    image: { type: String },
    category: { type: String },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const PostModel = model("Post", PostSchema);

module.exports = PostModel;
