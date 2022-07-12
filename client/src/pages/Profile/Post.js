import { Link } from "react-router-dom";
import { MyContext } from "../../context/MyContext";
import { useContext, useEffect, useState } from "react";
import tipImage from "../../assets/Tip.jpg";
import API from "../../api/user.api";

export const Post = ({ postObj }) => {
  const { loggedUser } = useContext(MyContext);
  const [likeCounter, setLikeCounter] = useState(postObj.likes.length);
  const [post, setPost] = useState(postObj);

  const onHandleDelete = () => {};
  const onHandleUpdate = () => {
    // setUpdatedMode((prev) => !prev);
    // setPostToBeUpdated(postObj);
  };

  const likePost = async () => {
    try {
      const { data } = await API.patch(
        `/like`,
        { id: postObj._id },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        }
      );
      setLikeCounter(data.likes.length);
      setPost(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="post-container">
      <div className="postImage">
        <img
          src={postObj.image === "null" ? tipImage : `http://localhost:5050/${postObj.image}`}
          height="180"
          alt="tip"
        />
      </div>

      <div className="postTitle">
        <h3>{postObj.title}</h3>
      </div>
      <div>
        <div className="createdBy">
          <p>
            Published by: {postObj.ownerName}, {new Date(postObj.createdAt).toLocaleString()}
          </p>
        </div>
        <div>
          <Link
            to={{
              pathname: `/posts/${postObj._id}`,
              state: postObj,
            }}>
            Read more
          </Link>
        </div>
        <div className="cat-update-delete">
          <div>
            <p style={{ textAlign: "left" }}>
              <i className="fa fa-tags"></i>{" "}
              <Link className="cat-Link" to={`/posts/category/${postObj.category}`}>
                {" "}
                {postObj.category}
              </Link>
            </p>
          </div>
          <div className="likes">
            <i
              className="fa-solid fa-thumbs-up fa-lg"
              style={!post.likes.includes(loggedUser._id) ? { color: "grey" } : { color: "rgb(59, 82, 198)" }}
              onClick={likePost}></i>
            {likeCounter}
          </div>
          {postObj.owner === loggedUser._id && (
            <div className="post-buttons">
              <Link to={{ pathname: "/update/post", state: postObj }}>
                <button className="btn">Update</button>
              </Link>
              <button className="btn" onClick={onHandleDelete}>
                delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
