// import { useState, useContext, useEffect } from "react";
// import API from "../../api/user.api";
import { Link } from "react-router-dom";
// import { MyContext } from "../../context/MyContext";

export const UserManager = () => {
  return (
    <div className="user-manager">
      <Link to="/user/update">
        <button className="btn">Update my account</button>
      </Link>
      <button className="btn" style={{ color: "rgb(223, 82, 82)" }}>
        Delete my account
      </button>
    </div>
  );
};
