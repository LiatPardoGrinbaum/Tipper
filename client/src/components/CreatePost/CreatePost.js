import React, { useState, useContext, useRef } from "react";
import API from "../../api/user.api";
import Input from "../Input/Input";
import { MyContext } from "../../context/MyContext";

const CreatePost = () => {
  const inputRef = useRef(null);
  const { setRender, setSpinner } = useContext(MyContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const insertOptions = () => {
    const categories = ["choose category", "Home&Garden", "Fitness", "Food", "Travel", "Wellness", "Study"];
    const categoryValues = ["choose category", "home", "fitness", "food", "travel", "wellness", "study"];
    return categories.map((category, idx) => {
      return (
        <React.Fragment key={idx}>
          <option value={categoryValues[idx]}>{category}</option>
        </React.Fragment>
      );
    });
  };

  // const onHandleChange = (categoryCode) => {
  //   setCategory(categoryCode.value);
  // };

  const onHandleSubmit = async (e) => {
    setError(null);
    setSpinner(true);
    e.preventDefault();
    //spinner?
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("image", file);
      console.log("formdata", formData);
      await API.post("posts/create", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      alert("Your tip was published successfuly!");
      setTitle("");
      setDescription("");
      setCategory("");
      setFile(null);
      inputRef.current.value = null;
      setRender(true); //for profile component to render
      setSpinner(false);
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };
  console.log(file);
  return (
    <div className="createPost-container">
      <form className="form" onSubmit={onHandleSubmit}>
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
        <div className="field">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            type="text"
            rows="7"
            cols="40"
            placeholder="Enter you tip here"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <select className="selectbar" onChange={(e) => setCategory(e.target.value)} value={category}>
          {insertOptions()}
        </select>
        <div className="field">
          <label htmlFor="image">Upload Image (optional):</label>
          <input
            ref={inputRef}
            type="file"
            label="Upload Image (optional):"
            id="image"
            onChange={(e) => {
              setFile(e.target.files[0]);
              // e.target.value = null;
            }}
          />
        </div>
        <button className="btn" type="submit">
          Add your tip
        </button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default CreatePost;
