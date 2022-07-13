import React, { useState, useRef, useEffect } from "react";
import API from "../../api/user.api";
import Input from "../../components/Input/Input";

const UpdatePost = (props) => {
  const inputRef = useRef(null);

  const [title, setTitle] = useState(props.location.state.title);
  const [description, setDescription] = useState(props.location.state.description);
  const [category, setCategory] = useState(props.location.state.category);
  const [file, setFile] = useState(props.location.state.image);
  const [error, setError] = useState(null);

  const insertOptions = () => {
    const categories = ["choose category", "Home&Garden", "Fitness", "Food", "Travel", "Wellness", "Study"];
    const categoryValues = ["home", "fitness", "food", "travel", "wellness", "study"];
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
    // setRender(false);
    e.preventDefault();
    //spinner?
    try {
      const updatedPost = new FormData();
      updatedPost.append("title", title);
      updatedPost.append("description", description);
      updatedPost.append("category", category);
      if (file) updatedPost.append("image", file);
      updatedPost.append("id", props.location.state._id);

      await API.patch("posts/update", updatedPost, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      alert("Your tip was updated successfuly!");
      setTitle("");
      setDescription("");
      setCategory("");
      setFile(null);
      props.history.goBack();
      inputRef.current.value = null;
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <div className="updatePost-container">
      <p className="backtoPosts" onClick={() => props.history.goBack()}>
        Back
      </p>
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
              type="textarea"
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
            Update post
          </button>
        </form>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
};

export default UpdatePost;

/* import { MyContext } from "../../context/MyContext";
const UpdatePost = () => {
  return (
    <div>
      <p>Hii</p>
    </div>
  );
}; */
