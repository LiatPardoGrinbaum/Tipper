import express from "express";
const postRouter = express.Router();
import auth from "../middlewere/auth.js";
import upload from "../middlewere/multer.js";

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
// postRouter.post("/posts/create", auth, createPost);
postRouter.post("/posts/create", auth, upload.single("image"), createPost, (error, req, res, next) => {
  res.status(400).send(error.message);
});
postRouter.patch("/posts/update", auth, upload.single("image"), updatePost, (error, req, res, next) => {
  res.status(400).send(error.message);
});
postRouter.delete("/posts/:id", auth, deletePost);
postRouter.patch("/like", auth, addOrRemoveLike);

export { postRouter };

//? The main difference between PUT and PATCH in REST API is that PUT handles updates by replacing the entire entity, while PATCH only updates the fields that you give it
