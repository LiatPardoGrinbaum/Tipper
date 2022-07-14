import { Post } from "../models/post.model.js";
import fs from "fs";

//create new post identified by the user created it
export const createPost = async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.title || !req.body.description || !req.body.category) throw new Error("Please fill all fields.");
    if (req.body.title.length > 100) throw new Error("Title has maximum number of charecters allowed of 100.");
    if (req.body.description.length > 1000)
      throw new Error("Description has maximum number of charecters allowed of 1000.");
    const newPost = new Post({
      ...req.body,
      owner: req.user._id,
      ownerName: req.user.name,
    });
    console.log(req.file);
    if (req.file) {
      newPost.image = req.file.path;
    }
    await newPost.save();

    res.status(201).send(newPost);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//!check- not working this way with populate (and virtual?)
//get all posts created by the logged in user (with auth)
// export const getAllMyPosts = async (req, res) => {
//   try {
//     await req.user.populate("posts").execPopulate();
//     res.send(req.user.userPosts);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

//get all posts created by the logged in user (with auth)
export const getAllMyPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const posts = await Post.find({ owner: userId }).sort({ updatedAt: -1 }).exec();

    res.send(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//update post created by the logged in user with auth//didnt add the updates allowed cause i will decide in frontend what will be updated.
// export const updatePost = async (req, res) => {
//   const updates = Object.keys(req.body);
//   try {
//     const post = await Post.findOne({ _id: req.body.id, owner: req.user._id });
//     if (!post) {
//       return res.status(404).send();
//     }
//     updates.forEach((update) => (post[update] = req.body[update]));
//     await post.save();
//     res.send(post);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

//other approach for update post including file:
export const updatePost = async (req, res) => {
  try {
    const updatedPost = req.body;
    if (req.file) {
      updatedPost.image = req.file.path;
    }
    console.log(req.file);
    const post = await Post.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $set: updatedPost,
      },
      { new: true }
    );
    res.send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//delete one of the logged in user's post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    //maybe
    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//add or remove like from the logged in user.
export const addOrRemoveLike = async (req, res) => {
  try {
    //possible to use req.body to get the id
    console.log(req.body);
    const post = await Post.findById({ _id: req.body.id });

    if (!post.likes.includes(req.user._id)) {
      const updatedPost = await Post.findOneAndUpdate(
        { _id: req.body.id },
        { $push: { likes: req.user._id } },
        { new: true }
      );

      res.status(200).send(updatedPost);
    } else {
      const updatedPost = await Post.findOneAndUpdate(
        { _id: req.body.id },
        { $pull: { likes: req.user._id } },
        { new: true }
      );

      res.status(200).send(updatedPost);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//get all posts (with option to search by category with query params   )
export const getAllPosts = async (req, res) => {
  try {
    const matchQuery = req.query.category;
    console.log(matchQuery);
    if (req.user) {
      //if user authenticate. not anyone can see.
      if (matchQuery) {
        const posts = await Post.find({ category: matchQuery });

        res.status(200).send(posts);
      }
      const posts = await Post.find({});
      // const posts = await Post.find({}).limit(3).exec();
      res.status(200).send(posts);
    }
  } catch (error) {
    res.status(400).send();
  }
};
