import { Link } from "react-router-dom";

export const Post = ({ postObj }) => {
  const onHandleDelete = () => {};
  const onHandleUpdate = () => {};
  return (
    <div className="post-container">
      <div className="postImage">
        <img src={"http://localhost:5050/" + postObj.image} height="180" alt="tip" />
      </div>

      <div className="postTitle">
        <h3>{postObj.title}</h3>
      </div>
      <div>
        <div className="createdBy">
          <p>
            Created by: {postObj.ownerName}, at {new Date(postObj.createdAt).toDateString()}
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
          <div className="post-buttons">
            <button className="btn" onClick={onHandleUpdate}>
              update
            </button>
            <button className="btn" onClick={onHandleDelete}>
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
