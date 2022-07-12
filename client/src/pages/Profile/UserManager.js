import { useState, useContext, useEffect } from "react";
import API from "../../api/user.api";
import { Link } from "react-router-dom";
import { MyContext } from "../../context/MyContext";

export const UserManager = () => {
  return (
    <div className="createPost-container">
      <Link to="/">
        <button className="btn">Create a new post</button>
      </Link>
      <button className="btn">Update your account</button>
    </div>
  );
};
