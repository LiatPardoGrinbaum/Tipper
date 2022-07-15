import express from "express";
import { userRouter } from "./routes/user.routes.js";
import { postRouter } from "./routes/post.routes.js";
import { generateUploadURL } from "../s3.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRouter);
app.use("/api", postRouter);
app.get("/api/s3Url", async (req, res) => {
  try {
    const url = await generateUploadURL();
    res.status(299).send({ url });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
export { app };
