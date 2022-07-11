import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    ownerName: {
      type: String,
    },
    category: {
      type: String,
      required: [true, "Category is a required field"],
      lowercase: true,
    },
    title: {
      type: String,
      required: [true, "Title is a required field"],
      maxLength: 120,
    },
    description: {
      type: String,
      maxLength: 1000, //charecters
      required: [true, "Description is a required field"],
    },

    likes: {
      type: Array,
      default: [],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("posts", postSchema);

export { Post };
