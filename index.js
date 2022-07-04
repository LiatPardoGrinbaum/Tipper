import "./server/db/mongoose.js";
import { app } from "./server/app.js";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

const fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileName);
const publicDirPath = path.join(__dirname, "client/build");
console.log("dirname", __dirname);
console.log(publicDirPath);

const PORT = process.env.PORT || 5050;

//pay attention to the location of this:
app.use(express.static(publicDirPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicDirPath, "index.html"));
});

app.listen(PORT, (error) => {
  if (error) throw new Error("app.listen Error: " + error);
  console.log("server is up and running on port " + PORT);
});
