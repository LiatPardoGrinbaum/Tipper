import React, { useEffect, useState, useContext } from "react";
import CreatePost from "../../components/CreatePost/CreatePost";
import { Spinner } from "../../components/Spinner/spinner";
import { MyContext } from "../../context/MyContext";
import { Post } from "./Post";
import API from "../../api/user.api";

const Profile = () => {
  const { myPosts, setMyPosts, setSpinner, spinner, setRender, render } = useContext(MyContext);
  const [error, setError] = useState("");

  useEffect(() => {
    setRender(false);
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
      setError(err.response.data);
    }
    setSpinner(true);
  }, [setMyPosts, render, setRender, setSpinner]);
  const insertMyPosts = () => {
    return myPosts.map((postObj) => {
      return (
        <React.Fragment key={postObj._id}>
          <Post postObj={postObj} />
        </React.Fragment>
      );
    });
  };
  return (
    <div className="profile-container">
      <h1>Profile page</h1>

      <div className="profile-inner">
        <div className="profile-left">
          {spinner ? (
            <Spinner />
          ) : (
            <div>
              {" "}
              <h3>Update my profile</h3>
              <h3>Delete account</h3>
              <div className="posts-container-profile">{insertMyPosts()}</div>
            </div>
          )}
        </div>
        <CreatePost />{" "}
        {/* need to check if i should get it out of the profile-inner 
      (fixed) */}
      </div>
    </div>
  );
};

export default Profile;
