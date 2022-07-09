import express from "express";
const postRouter = express.Router();
import auth from "../middlewere/auth.js";

import {
  createPost,
  getAllMyPosts,
  updatePost,
  deletePost,
  addOrRemoveLike,
  getAllPosts,
} from "../controllers/post.controllers.js";

postRouter.get("/posts/me", auth, getAllMyPosts);
postRouter.get("/posts", auth, getAllPosts);
postRouter.post("/posts/create", auth, createPost);
postRouter.patch("/posts/:id", auth, updatePost);
postRouter.delete("/posts/:id", auth, deletePost);
postRouter.patch("/posts/like/:id", auth, addOrRemoveLike);

export { postRouter };
