import express from "express";
import { userRouter } from "./routes/user.routes.js";
import { postRouter } from "./routes/post.routes.js";

import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRouter);
app.use("/api", postRouter);

export { app };
