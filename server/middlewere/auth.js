import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisismyfinalproject");
    const user = await User.findOne({ _id: decoded._id, "tokens.token": token });
    req.token = token;
    req.user = user;

    next();
    if (!user) {
      throw new Error();
    }
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default auth;
