import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import API from "../../api/user.api";
import { Spinner } from "../Spinner/spinner";

const Category = (props) => {
  const [posts, setPosts] = useState([]);
  const [spinner, setSpinner] = useState(false);
  /* 2 ways to pass props..
   console.log(props.match.params);
  console.log(props.location.state); */
  useEffect(() => {
    setSpinner(true);
    let categoryName = props.location.state.name;
    try {
      const getData = async () => {
        if (categoryName === "home&garden") {
          categoryName = "home";
        }
        console.log(categoryName);
        const { data } = await API.get(`/posts?category=${categoryName}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        });
        setPosts(data);
        console.log(data);
        setSpinner(false);
      };
      getData();
    } catch (err) {
      console.log(err);
    }
  }, [props.location.state.name]);

  const insertPosts = () => {
    return posts.map((post) => {
      return (
        <React.Fragment key={post._id}>
          {/* add PostComponent here instead */}
          <p>{post.title}</p>
          <p>{post.description}</p>
        </React.Fragment>
      );
    });
  };
  return (
    <div className="category-container">
      {spinner ? (
        <Spinner />
      ) : (
        <>
          <NavLink to="/" exact={true} className="backLink">
            Back
          </NavLink>
          <h2>Hello</h2>
          <div className="searchBar">
            <input />
          </div>

          <div className="post-wrapper">{insertPosts()}</div>
        </>
      )}
    </div>
  );
};

export default Category;
