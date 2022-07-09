import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      max: 500, //charecters
      required: true,
    },

    likes: {
      type: Array,
      default: [],
    },
    image: {
      type: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("posts", postSchema);

export { Post };
