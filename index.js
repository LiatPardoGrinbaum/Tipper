import "./server/db/mongoose.js";
import { app } from "./server/app.js";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { User } from "./server/models/user.model.js";
import { Post } from "./server/models/post.model.js";

const fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileName);
const publicDirPath = path.join(__dirname, "client/build");
const imagespath = path.join(__dirname, "images");

console.log("dirname", __dirname);
console.log(publicDirPath);

const PORT = process.env.PORT || 5050;

//pay attention to the location of this:
app.use(express.static(publicDirPath));
app.use("/images", express.static(imagespath));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicDirPath, "index.html"));
});

app.listen(PORT, (error) => {
  if (error) throw new Error("app.listen Error: " + error);
  console.log("server is up and running on port " + PORT);
});

//basic example
/* const main = async () => {
  //get object of the user created the post
  const post = await Post.findById("62cac8d412ff09562198c251");
  await post.populate("owner");
  console.log(post.owner.name);
  //get all posts created by the user (without actually have posts field in the userSchema. we use virtual instead)
  const user = await User.findById("62c74d60df5746afb8c94218");
  await user.populate("userPosts");
  console.log(user.userPosts);
};
main(); */
