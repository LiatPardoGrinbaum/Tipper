import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import API from "../../api/user.api";
import { Redirect } from "react-router-dom";
import { MyContext } from "../../context/MyContext";

const Login = () => {
  const { loggedUser, setLoggedUser, setToken, setSpinner } = useContext(MyContext);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const onHandleSumbit = async (e) => {
    setError("");
    e.preventDefault();
    setSpinner(true);
    try {
      const { data } = await API.post("/users/login", user);
      setUser({ email: "", password: "" });
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("user", JSON.stringify(data.user));
      setLoggedUser(data.user);
      setToken(data.token);
      setSpinner(false);
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  const onHandleLogin = (e) => {
    const userValues = { ...user };
    userValues[e.target.id] = e.target.value;
    setUser(userValues);
  };

  if (loggedUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <hr></hr>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form className="login-form" onSubmit={onHandleSumbit}>
        <input type="text" id="email" placeholder="Email" onChange={onHandleLogin} value={user.email} />
        <input type="password" id="password" placeholder="Password" onChange={onHandleLogin} value={user.password} />
        <button className="login-btn">Sign In</button>
      </form>
      <p className="sign-up-link">
        Not a member? <NavLink to="/register">Sign up</NavLink>, it's free.
      </p>
      <br></br>
      <h5 style={{ color: "gray" }}>
        For example, log in with: <br></br>
        <span>email:</span>
        <span style={{ color: "orange" }}>pola@gmail.com </span>
        <span> password:</span>
        <span style={{ color: "orange" }}>12341234</span>
      </h5>
    </div>
  );
};

export default Login;
