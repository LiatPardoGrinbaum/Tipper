import { useContext, useEffect, useState } from "react";
import API from "../../api/user.api";
import { MyContext } from "../../context/MyContext";
import { Link } from "react-router-dom";

const Signup = () => {
  const { loggedUser, setLoggedUser, setToken, setSpinner, updatedMode, setUpdatedMode } = useContext(MyContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (updatedMode) {
      setName(loggedUser.name);
      setEmail(loggedUser.email);
    }
  }, []);

  const onHandleSumbit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    if (!updatedMode) {
      const newUser = {
        name,
        email,
        password,
        confirmPass,
      };
      try {
        const { data } = await API.post("/users/register", newUser);
        setEmail("");
        setName("");
        setPassword("");
        setConfirmPass("");
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("user", JSON.stringify(data.savedUser));
        setLoggedUser(data.savedUser);
        setToken(data.token);
        setSpinner(false);
      } catch (err) {
        console.log(err);
        setError(err.response.data);
      }
    } else {
      const updatedUser = {
        name,
        email,
      };
      try {
        const { data } = await API.patch("/users/me", updatedUser, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        });
        setLoggedUser(data);
        localStorage.setItem("user", JSON.stringify(data));

        window.location.replace("/profile");
        setUpdatedMode(false);
      } catch (err) {
        console.log(err);
        setError(err.response.data);
      }
    }
  };
  // if (loggedUser) {
  //   console.log(loggedUser);
  //   return <Redirect to="/" />;
  // }
  console.log("updatedMode", updatedMode);
  return (
    <div className="signup-container">
      <h1>{updatedMode ? "Update my details" : "Sign Up"}</h1>
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
        {!updatedMode && (
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        )}
        {!updatedMode && (
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm password"
            value={confirmPass}
            onChange={(e) => {
              setConfirmPass(e.target.value);
            }}
          />
        )}
        <button className="login-btn">{updatedMode ? "Update" : "Create new account"}</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {updatedMode && (
        <Link to="/profile">
          <p className="backtoPosts">Back</p>
        </Link>
      )}
    </div>
  );
};

export default Signup;
