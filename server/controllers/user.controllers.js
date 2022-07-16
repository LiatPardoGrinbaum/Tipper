import { User } from "../models/user.model.js";

//register/sign-up (create new user)
export const register = async (req, res) => {
  try {
    if (req.body.password !== req.body.confirmPass) throw new Error("Passwords do not match");
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
  } catch (error) {
    res.status(400).send(error.message);
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
  } catch (error) {
    res.status(500).send(error);
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

//update my user account
//patch only update partial data sent by the client, now i want it to change only name and later- picture
// can I use put instead with the same code?
export const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email"];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//delete my user account
export const deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//get my profile details (get my user after I logged in)
export const getMyProfile = async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//upload profile picture
export const uploadImage = async (req, res) => {
  req.user.avatar = req.file.buffer;
  await req.user.save();
  res.send();
};

//delete profile picture
export const deleteImage = async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
};

//get profile picture of users by id:
