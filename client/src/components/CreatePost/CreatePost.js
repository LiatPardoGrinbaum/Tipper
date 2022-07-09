import { useState } from "react";
import API from "../../api/user.api";
import Input from "../Input/Input";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState("");

  //!dont forget convert home&garden to home
  return (
    <div className="createPost-container">
      <h2>Create a new post</h2>

      <Input
        label="Title:"
        id="title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <textarea
        label="Description:"
        id="description"
        type="textarea"
        rows="5"
        cols="40"
        placeholder="Enter you tip here"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <select>
        <option>Home&Garden</option>
        <option>Fitness</option>
        <option>Food</option>
        <option>Travel</option>
        <option>Wellness</option>
        <option>Study</option>
      </select>
      <Input
        type="file"
        label="Image"
        id="image"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
    </div>
  );
};

export default CreatePost;
