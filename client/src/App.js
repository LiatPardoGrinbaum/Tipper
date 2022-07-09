import "./styles/App.css";

// import GetCreate from "./components/getCreate";
import Navbar from "./components/navbar/navbar";
import Login from "./pages/login/login";
import Signup from "./pages/signup/Signup";
import Homepage from "./pages/Homepage/Homepage";
import Category from "./components/Category/Category";
import Profile from "./pages/Profile/Profile";
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
            <Route path="/posts/category/:id" component={Category} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </div>
      </BrowserRouter>
      {/*   <login/> */}
      {/*  <GetCreate /> */}
    </div>
  );
}

export default App;
