import express from "express";
const userRouter = express.Router();
import auth from "../middlewere/auth.js";
import upload from "../middlewere/multer.js";

import {
  register,
  getAllUsers,
  login,
  logout,
  updateUser,
  deleteUser,
  getMyProfile,
  uploadImage,
  deleteImage,
} from "../controllers/user.controllers.js";

userRouter.post("/users/register", register);
userRouter.get("/users", getAllUsers);
userRouter.post("/users/login", login);
userRouter.post("/users/logout", auth, logout);
userRouter.patch("/users/me", auth, updateUser);
userRouter.delete("/users/me", auth, deleteUser);
userRouter.get("/users/me", auth, getMyProfile);
userRouter.post("/users/me/avatar", auth, upload.single("avatar"), uploadImage, (error, req, res, next) => {
  res.status(400).send(error.message);
});
userRouter.delete("/users/me/avatar", auth, deleteImage);
// add root to get all users? maybe later for finding users in the client side?

export { userRouter };
