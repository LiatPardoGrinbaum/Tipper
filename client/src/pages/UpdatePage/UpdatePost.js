import React, { useState, useRef } from "react";
import API from "../../api/user.api";
import Input from "../../components/Input/Input";

const UpdatePost = (props) => {
  const inputRef = useRef(null);

  const [title, setTitle] = useState(props.location.state.title);
  const [description, setDescription] = useState(props.location.state.description);
  const [category, setCategory] = useState(props.location.state.category);
  const [file, setFile] = useState(props.location.state.image);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

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
    setIsUpdating(true);
    setError(null);
    // setRender(false);
    e.preventDefault();
    //spinner?
    try {
      const { url } = await fetch("/api/s3Url").then((res) => res.json());
      console.log(url);
      console.log("url", url);
      // post the image direclty to the s3 bucket
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: file,
      });

      const imageUrl = url.split("?")[0];

      const updatedPost = new FormData();
      updatedPost.append("title", title);
      updatedPost.append("description", description);
      updatedPost.append("category", category);
      file === props.location.state.image
        ? updatedPost.append("image", props.location.state.image)
        : updatedPost.append("image", imageUrl);
      updatedPost.append("id", props.location.state._id);
      console.log(file);
      await API.patch("posts/update", updatedPost, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      alert("Your tip was updated successfuly!");
      setIsUpdating(false);
      setTitle("");
      setDescription("");
      setCategory("");
      setFile(null);
      props.history.goBack();
      inputRef.current.value = null;
    } catch (err) {
      console.log(err);
      setError(err.response.data);
      setIsUpdating(false);
    }
  };
  console.log(file);
  return (
    <div className="updatePost-container">
      <div className="createPost-container">
        <form className="form" onSubmit={onHandleSubmit}>
          <h2>Update your post</h2>

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
          <button
            className="btn"
            type="submit"
            disabled={isUpdating ? true : false}
            style={isUpdating ? { color: "lightgrey" } : { color: "rgb(70, 69, 69)" }}>
            Update post
          </button>
        </form>
        {isUpdating && <span>Updating your tip...</span>}
        {error && <div style={{ color: "red" }}>{error}</div>}
        <p className="backtoPosts" onClick={() => props.history.goBack()}>
          Back
        </p>
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
