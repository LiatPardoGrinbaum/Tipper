import { useState, useContext, useRef } from "react";
import API from "../../api/user.api";
import Input from "../Input/Input";
import Select from "react-select";
import { MyContext } from "../../context/MyContext";

const CreatePost = () => {
  const inputRef = useRef(null);
  const { setRender } = useContext(MyContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const insertOptions = () => {
    const options = [];
    const categories = ["Home&Garden", "Fitness", "Food", "Travel", "Wellness", "Study"];
    const categoriesCode = ["home", "fitness", "food", "travel", "wellness", "study"];
    categories.forEach((category, idx) => {
      const option = { value: categoriesCode[idx], label: category };
      options.push(option);
    });
    return options;
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
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("image", file);

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
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };
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
            type="textarea"
            rows="5"
            cols="40"
            placeholder="Enter you tip here"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="select">
          {/* <label>Select category:</label>
          <Select
            options={insertOptions()}
            onChange={onHandleChange}
            placeholder="categories"
            defaultValue={category}
          /> */}
          <select onChange={(e) => setCategory(e.target.value)} value={category}>
            <option value="">choose category</option>
            <option value="home">home</option>
            <option value="fitness"> fitness</option>
          </select>
        </div>
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