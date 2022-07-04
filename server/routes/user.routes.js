import express from "express";
const userRouter = express.Router();

import { register, getAllUsers, login, logout } from "../controllers/user.controllers.js";
import auth from "../middlewere/auth.js";

userRouter.post("/users/register", register);
userRouter.get("/users", getAllUsers);
userRouter.post("/users/login", login);
userRouter.post("/users/logout", auth, logout);
// add root to get all users? maybe later for finding users in the client side?

export { userRouter };
