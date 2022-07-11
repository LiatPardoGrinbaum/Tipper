import { useEffect, useState } from "react";

const PostPage = (props) => {
  const [postObj, setPostObj] = useState({});

  useEffect(() => {
    const post = props.location.state;
    setPostObj(post);
  });
  return (
    <div className="post-page-container">
      <h1>Post Page</h1>
      <p>{postObj.title}</p>
    </div>
  );
};

export default PostPage;
