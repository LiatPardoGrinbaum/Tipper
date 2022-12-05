import { NavLink } from "react-router-dom";
// import welcomeImg from "../../assets/welcomepage.jpg";
import { useContext } from "react";
import { MyContext } from "../../context/MyContext";
import { Main } from "../../components/Main/Main";

import Signup from "../signup/Signup";

const Homepage = () => {
  const { loggedUser } = useContext(MyContext);
  return (
    <div className={loggedUser ? "mainPage" : "homepage"}>
      {!loggedUser && (
        <div className="welcome">
          <div className="left-welcome">
            <h1>Welcome to </h1>
            <h1>Tipper </h1>
            <h3> Want to get some new ideas?</h3>
            <h3> Need some tips for any ocassion?</h3>
            <h3>Want to share your own tips?</h3>
            <h3>
              <span style={{ color: "  rgb(12, 153, 185)" }}>Sign up</span> and share your tips with us!{" "}
              <i className="fa-solid fa-angles-right fa-sm" style={{ color: "  rgb(12, 153, 185)" }}></i>
            </h3>
            <h4>
              Already a member? <NavLink to="/login">Sign in</NavLink>
              <br></br>
            </h4>
            <h5 style={{ color: "gray" }}>
              For example, log in with: <br></br>
              <span>email:</span>
              <span style={{ color: "orange" }}>pola@gmail.com </span>
              <span> password:</span>
              <span style={{ color: "orange" }}>12341234</span>
            </h5>
          </div>
          <div className="right-welcome">
            <Signup />
          </div>
          {/*   <div className="right-welcome"></div> */}
        </div>
      )}
      {/*    <div className="main-welcome"></div> */}
      {loggedUser && <Main />}
    </div>
  );
};

export default Homepage;
