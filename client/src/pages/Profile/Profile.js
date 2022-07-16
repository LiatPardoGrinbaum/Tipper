import React, { useEffect, useContext, useState } from "react";
import { UserManager } from "./UserManager";
import { Spinner } from "../../components/Spinner/spinner";
import { MyContext } from "../../context/MyContext";
import { Post } from "./Post";
import API from "../../api/user.api";
import CreatePost from "../../components/CreatePost/CreatePost";

const Profile = () => {
  const { myPosts, setMyPosts, setSpinner, spinner, setRender, render, loggedUser, setUpdatedMode } =
    useContext(MyContext);
  // const [error, setError] = useState("");
  const [term, setTerm] = useState("");
  useEffect(() => {
    setRender(false);
    setUpdatedMode(false); //need it to reset updatedmode if I come back from updateUser form without submitting
    setSpinner(true);
    try {
      const getData = async () => {
        const { data } = await API.get("/posts/me", {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        });

        setMyPosts(data);
        setSpinner(false);
      };

      getData();
    } catch (err) {
      console.log(err);
      // setError(err.response.data);
    }
    setSpinner(true);
  }, [setMyPosts, render, setRender, setSpinner, setUpdatedMode]);

  const insertMyPosts = () => {
    const filteredPosts = myPosts.filter((post) => {
      return (
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.ownerName.toLowerCase().includes(term.toLowerCase())
      );
    });
    return filteredPosts.map((postObj) => {
      return (
        <React.Fragment key={postObj._id}>
          <Post postObj={postObj} />
        </React.Fragment>
      );
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-inner">
        <div className="profile-left">
          {spinner ? (
            <Spinner />
          ) : (
            <div>
              <h1>
                Hello, <span>{loggedUser && loggedUser.name}</span>
              </h1>
              <h2>My tips:</h2>
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
              <div className="posts-container-profile">{insertMyPosts()}</div>
            </div>
          )}
        </div>
        <div className="profile-right">
          <CreatePost />

          <UserManager />
        </div>
      </div>
    </div>
  );
};

export default Profile;
