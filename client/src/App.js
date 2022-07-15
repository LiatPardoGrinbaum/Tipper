import "./styles/App.css";

// import GetCreate from "./components/getCreate";
import Navbar from "./components/navbar/navbar";
import Login from "./pages/login/login";
import Signup from "./pages/signup/Signup";
import Homepage from "./pages/Homepage/Homepage";
import Category from "./components/Category/Category"; //should move to pages folder
import Profile from "./pages/Profile/Profile";
import PostPage from "./pages/PostPage/PostPage";
import UpdatePost from "./pages/UpdatePage/UpdatePost";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UpdateUser from "./pages/UpdateUser/UpdateUser";

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
            <Route path="/posts/:id" component={PostPage} />
            <Route path="/update/post" component={UpdatePost} />
            <Route path="/allcategories" component={Category} />

            <Route path="/user/update" component={UpdateUser} />
            {/*    <Route path="/update/user" component={UpdateUser} /> */}
          </Switch>
        </div>
      </BrowserRouter>
      {/*   <login/> */}
      {/*  <GetCreate /> */}
    </div>
  );
}

export default App;
