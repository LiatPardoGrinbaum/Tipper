import "./App.css";
// import GetCreate from "./components/getCreate";
import Navbar from "./components/navbar/navbar";
import Login from "./components/login/login";
import Signup from "./components/signup/Signup";
import Homepage from "./components/Homepage/Homepage";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <div className="main-container">
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Signup} />
            {/*  <Route path="/profile" component={Profile} /> */}
          </Switch>
        </div>
      </BrowserRouter>
      {/*   <login/> */}
      {/*  <GetCreate /> */}
    </div>
  );
}

export default App;
