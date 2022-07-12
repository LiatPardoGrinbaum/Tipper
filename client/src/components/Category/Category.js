import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import API from "../../api/user.api";
import { Post } from "../../pages/Profile/Post";
import { Spinner } from "../Spinner/spinner";

const Category = (props) => {
  const [posts, setPosts] = useState([]);
  const [spinner, setSpinner] = useState(false);
  // const { id } = useParams();
  /* 2 ways to pass props..
   console.log(props.match.params);
  console.log(props.location.state); */
  useEffect(() => {
    console.log(props);
    // console.log(id);
    setSpinner(true);
    let categoryName = props.match.params.id;
    console.log(categoryName);
    try {
      const getData = async () => {
        const { data } = await API.get(`/posts?category=${categoryName}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        });
        setPosts(data);

        setSpinner(false);
      };
      getData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const insertPosts = () => {
    return posts.map((post) => {
      return (
        <React.Fragment key={post._id}>
          {/* add PostComponent here instead */}
          <Post postObj={post} />
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
          <div className="category-outer">
            <NavLink to="/" exact={true} className="backLink">
              Back
            </NavLink>
            <h2>{props.match.params.id}</h2>

            {/* ! convert topBar to a component ! */}
            <div className="topBar">
              <div className="searchBar">
                <input type="text" placeholder="search..." />
              </div>
              <div className="sortBar">
                <select></select>
              </div>
            </div>

            <div className="category-inner">
              <div className="post-wrapper">{insertPosts()}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Category;
