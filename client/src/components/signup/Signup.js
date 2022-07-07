import "../login/login.css";

import { useContext, useState } from "react";
import API from "../../api/user.api";
import { Redirect } from "react-router-dom";
import { MyContext } from "../../context/MyContext";

const Signup = () => {
  const { loggedUser, setLoggedUser, setToken, setSpinner } = useContext(MyContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  //!need to add password confirmation validation
  //!
  const onHandleSumbit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    const newUser = {
      name,
      email,
      password,
    };
    try {
      const { data } = await API.post("/users/register", newUser);
      setEmail("");
      setName("");
      setPassword("");
      setConfirmPass("");
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("user", JSON.stringify(data.savedUser));
      setLoggedUser(data.user);
      setToken(data.token);
      setSpinner(false);
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };
  if (loggedUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-container">
      <h1>Sign Up</h1>
      <hr></hr>
      <form onSubmit={onHandleSumbit}>
        <input
          type="text"
          id="name"
          placeholder="Full name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="password"
          id="confirm-password"
          placeholder="Confirm password"
          value={confirmPass}
          onChange={(e) => {
            setConfirmPass(e.target.value);
          }}
        />
        <button className="login-btn">Create new account</button>
      </form>
    </div>
  );
};

export default Signup;
