import React, { useEffect, useState, useContext } from "react";
import API from "../../api/user.api";
import { Post } from "../../pages/Profile/Post";
import { Spinner } from "../Spinner/spinner";
import { MyContext } from "../../context/MyContext";

const Category = (props) => {
  const { setSpinner, spinner, setRender, render } = useContext(MyContext);
  const [posts, setPosts] = useState([]);
  const [term, setTerm] = useState("");

  // const { id } = useParams();
  /* 2 ways to pass props..
   console.log(props.match.params);
  console.log(props.location.state); */
  useEffect(() => {
    setRender(false);
    setSpinner(true);
    let categoryName = props.match.params.id;
    let url = "";
    if (categoryName) {
      url = `/posts?category=${categoryName}`;
    } else {
      url = "/posts";
    }
    try {
      const getData = async () => {
        const { data } = await API.get(url, {
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
  }, [props, setRender, render, setSpinner]);

  const insertPosts = () => {
    const filteredPosts = posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.ownerName.toLowerCase().includes(term.toLowerCase())
      );
    });
    return filteredPosts.map((post) => {
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
            <p className="backLink" onClick={() => props.history.goBack()}>
              Back
            </p>
            <h2>{props.match.params.id}</h2>
            {!props.match.params.id && <h2>All Tips</h2>}

            {/* ! convert topBar to a component ! */}
            <div className="topBar">
              <div className="searchBar">
                <input
                  type="text"
                  placeholder="search..."
                  value={term}
                  onChange={(e) => {
                    setTerm(e.target.value);
                  }}
                />
              </div>
              {/*    <div className="sortBar">
                <select></select>
              </div> */}
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
