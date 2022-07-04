import express from "express";
const userRouter = express.Router();
/* 
import { register, login, logOut } from "../controllers/user.controllers.js";
// import auth from "../middlewere/auth.js";

userRouter.post("/users/register", register);
userRouter.post("/users/login", login);
userRouter.post("/users/logout", auth, logOut); */
// add root to get all users? maybe later for finding users in the client side?

export { userRouter };
