import React, { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

function ContextProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState(null);
  const [token, setToken] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [myPosts, setMyPosts] = useState([]);
  const [render, setRender] = useState(false);

  const values = {
    loggedUser,
    setLoggedUser,
    token,
    setToken,
    spinner,
    setSpinner,
    myPosts,
    setMyPosts,
    render,
    setRender,
  };

  useEffect(() => {
    const isUserLoggedIn = JSON.parse(localStorage.getItem("user"));
    if (isUserLoggedIn) setLoggedUser(isUserLoggedIn);
  }, []);

  return <MyContext.Provider value={values}>{children}</MyContext.Provider>;
}

export default ContextProvider;
