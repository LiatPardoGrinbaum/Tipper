import { User } from "../models/user.model.js";

//register/sign-up (create new user)
export const register = async (req, res) => {
  try {
    const userBodyToSave = req.body;
    const newUSer = new User(userBodyToSave);
    const savedUser = await newUSer.save();
    const token = await savedUser.generateAuthToken();
    res.status(201).send({ savedUser, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//login
export const login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) throw new Error("Please fill all fields.");
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

//logout
export const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
};

//get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({ users });
  } catch (error) {
    res.status(400).send();
  }
};
