import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      requires: true,
      ref: "User",
    },
    category: {
      type: String,
      requires: true,
    },
    title: {
      type: String,
      requires: true,
    },
    description: {
      type: String,
      max: 500, //charecters
      requires: true,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("posts", postSchema);

export { Post };
