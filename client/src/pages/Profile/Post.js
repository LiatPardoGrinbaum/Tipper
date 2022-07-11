import { Link } from "react-router-dom";

export const Post = ({ postObj }) => {
  return (
    <div className="post-container">
      <div className="postImage">
        <img src={"http://localhost:5050/" + postObj.image} height="200" alt="tip" />
      </div>
      <div className="postTitle">
        <h3>{postObj.title}</h3>
        <Link
          to={{
            pathname: `/posts/${postObj._id}`,
            state: postObj,
          }}>
          Read more
        </Link>
      </div>

      <p>{postObj.category}</p>
      <p>
        Created by: {postObj.ownerName}, at {new Date(postObj.createdAt).toDateString()}
      </p>
    </div>
  );
};
