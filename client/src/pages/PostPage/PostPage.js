import { useEffect, useState } from "react";
import tipImage from "../../assets/Tip.jpg";
import { Link } from "react-router-dom";

const PostPage = (props) => {
  const [postObj, setPostObj] = useState({});

  const port = process.env.PORT || "http://localhost:5050";

  useEffect(() => {
    console.log(props);
    const post = props.location.state;
    setPostObj(post);
  });
  return (
    <div className="post-page-container">
      <p className="backtoPosts" onClick={() => props.history.goBack()}>
        Back
      </p>
      <div className="post-page-inner">
        <h2>{postObj.title}</h2>

        <img src={postObj.image === "null" ? tipImage : `${port}/images/${postObj.image}`} alt="tip" />

        <div className="post-desc">
          <p>{postObj.description}</p>
        </div>
        <div className="createdBy">
          <p>
            Published by: {postObj.ownerName}, {new Date(postObj.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="updatedAt">Updated at: {new Date(postObj.updatedAt).toLocaleString()}</div>
        <div>
          <p style={{ textAlign: "left" }}>
            <i className="fa fa-tags"></i>{" "}
            <Link className="cat-Link" to={`/posts/category/${postObj.category}`}>
              {" "}
              {postObj.category}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
