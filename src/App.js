import Sidebar from "./Components/Sidebar/Sidebar";
import Topbar from "./Components/topbar/Topbar";
import Home from "./Pages/home/Home";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PostList from "./Pages/postList/PostList";
import Post from "./Pages/post/Post";
import NewPost from "./Pages/newPost/NewPost";
import Login from "./Pages/login/Login";
import { AuthContext } from "./context/authContext/AuthContext";
import { useContext } from "react";
import Logout from "./Pages/logout/Logout";
import LandingText from "./Pages/landingText/LandingText";
import AboutItem from "./Pages/aboutItem/AboutItem";
import ServiceList from "./Pages/serviceList/ServiceList";
import Service from "./Pages/service/Service";
import NewService from "./Pages/newService/NewService";
import PersonnelList from "./Pages/personnelList/PersonnelList";
import Personnel from "./Pages/personnel/Personnel";
import NewPersonnel from "./Pages/newPersonnel/NewPersonnel";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route
            exact
            path="/"
            element={!user ? <Navigate to="/login" /> : <Home />}
          />

          {user && (
            <>
              <Route exact path="/posts" element={<PostList />} />
              <Route exact path="/post/:postId" element={<Post />} />
              <Route exact path="/newpost" element={<NewPost />} />
              <Route exact path="/services" element={<ServiceList />} />
              <Route exact path="/service/:serviceId" element={<Service />} />
              <Route exact path="/newservice" element={<NewService />} />
              <Route exact path="/personnels" element={<PersonnelList />} />
              <Route exact path="/personnel/:personnelId" element={<Personnel />} />
              <Route exact path="/newpersonnel" element={<NewPersonnel />} />
              <Route exact path="/landing/:landingId" element={<LandingText />} />
              <Route exact path="/about/:aboutId" element={<AboutItem />} />
              <Route exact path="/logout" element={<Logout />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
