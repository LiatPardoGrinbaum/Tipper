import { Link } from "react-router-dom";
import { MyContext } from "../../context/MyContext";
import { useContext, useState } from "react";
import tipImage from "../../assets/Tip.jpg";
import API from "../../api/user.api";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export const Post = ({ postObj }) => {
  const { loggedUser, setRender } = useContext(MyContext);
  const [likeCounter, setLikeCounter] = useState(postObj.likes.length);
  const [post, setPost] = useState(postObj);

  // const port = process.env.PORT || "http://localhost:5050";

  const onHandleDelete = () => {
    confirmAlert({
      title: "Delete alert!",
      message: "Are you sure you want to delete your tip?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await API.delete(`/posts/${postObj._id}`, {
              headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
              },
            });
            setRender(true);
          },
        },
        {
          label: "No",
          // onClick: () => alert("Click No"),
        },
      ],
    });
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
  // http://localhost:5050/
  return (
    <div className="post-container">
      <div className="postImage">
        <img src={postObj.image === "null" ? tipImage : `${postObj.image}`} alt="tip" />
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
