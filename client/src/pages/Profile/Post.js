import { Link } from "react-router-dom";
import { MyContext } from "../../context/MyContext";
import { useContext, useState } from "react";
import tipImage from "../../assets/Tip.jpg";
import API from "../../api/user.api";

export const Post = ({ postObj }) => {
  const { loggedUser } = useContext(MyContext);
  const [likeCounter, setLikeCounter] = useState(postObj.likes.length);
  const [post, setPost] = useState(postObj);

  const port = process.env.PORT || "http://localhost:5050";

  const onHandleDelete = () => {};
  // const onHandleUpdate = () => {
  // setUpdatedMode((prev) => !prev);
  // setPostToBeUpdated(postObj);
  // };

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
  // http://localhost:5050/
  return (
    <div className="post-container">
      <div className="postImage">
        <img src={postObj.image === "null" ? tipImage : `/images/${postObj.image}`} alt="tip" />
      </div>

      <div className="postTitle">
        <Link
          to={{
            pathname: `/posts/${postObj._id}`,
            state: postObj,
          }}>
          <h3>{postObj.title}</h3>
        </Link>
      </div>
      <div>
        <div className="createdBy">
          <p>
            Published by: {postObj.ownerName}, {new Date(postObj.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="updatedAt">Updated at: {new Date(postObj.updatedAt).toLocaleString()}</div>
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
              <Link to={{ pathname: "/update/post", state: postObj }} style={{ margin: "0" }}>
                <i className="fa-solid fa-pen-to-square "></i>
              </Link>

              <i className="fa-regular fa-trash-can" onClick={onHandleDelete}></i>

              {/*  <Link to={{ pathname: "/update/post", state: postObj }}>
                <button className="btn">Update</button>
              </Link>
              <button className="btn" onClick={onHandleDelete}>
                delete
              </button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
