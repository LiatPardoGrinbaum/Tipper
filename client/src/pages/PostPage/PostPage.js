import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const PostPage = (props) => {
  const [postObj, setPostObj] = useState({});

  useEffect(() => {
    console.log(props);
    const post = props.location.state;
    setPostObj(post);
  });
  return (
    <div className="post-page-container">
      <button onClick={() => props.history.goBack()}>Back</button>
      <h1>Post Page</h1>
      <p>{postObj.title}</p>
    </div>
  );
};

export default PostPage;
