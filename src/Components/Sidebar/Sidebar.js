import React, { useState } from "react";
import "./Sidebar.css";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PostAddIcon from "@mui/icons-material/PostAdd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupIcon from "@mui/icons-material/Group";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../baseUrl";

const Sidebar = () => {
  const [landingId, setLandingId] = useState();
  const [aboutId, setAboutId] = useState();
  const [active, setActive] = useState("home");

  const handleClick = (item) => {
    setActive(item);
  };

  const axiosInstance = axios.create({
    baseURL: baseUrl,
  });

  const getLandingId = async () => {
    const res = await axiosInstance.get("/landing/");
    setLandingId(res.data[0]._id);
  };

  const getAboutId = async () => {
    const res = await axiosInstance.get("/about/");
    setAboutId(res.data[0]._id);
  };

  getLandingId();
  getAboutId();

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li
                className={
                  active === "home"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("home")}
              >
                <HomeIcon className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link to={`/landing/${landingId}`} className="link">
              <li
                className={
                  active === "editHome"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("editHome")}
              >
                <BorderColorIcon className="sidebarIcon" />
                Edit Home Page
              </li>
            </Link>
            <Link to={`/about/${aboutId}`} className="link">
              <li
                className={
                  active === "editAbout"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("editAbout")}
              >
                <ModeEditIcon className="sidebarIcon" />
                Edit About Page
              </li>
            </Link>
            <Link to="/posts" className="link">
              <li
                className={
                  active === "posts"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("posts")}
              >
                <NewspaperIcon className="sidebarIcon" />
                Posts
              </li>
            </Link>
            <Link to="/newpost" className="link">
              <li
                className={
                  active === "addPost"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("addPost")}
              >
                <PostAddIcon className="sidebarIcon" />
                Add Post
              </li>
            </Link>
            <Link to="/services" className="link">
              <li
                className={
                  active === "services"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("services")}
              >
                <HomeRepairServiceIcon className="sidebarIcon" />
                Services
              </li>
            </Link>
            <Link to="/newservice" className="link">
              <li
                className={
                  active === "addService"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("addService")}
              >
                <MedicalServicesIcon className="sidebarIcon" />
                Add Service
              </li>
            </Link>
            <Link to="/personnels" className="link">
              <li
                className={
                  active === "personnels"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("personnels")}
              >
                <GroupIcon className="sidebarIcon" />
                Personnels
              </li>
            </Link>
            <Link to="/newpersonnel" className="link">
              <li
                className={
                  active === "addPerson"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("addPerson")}
              >
                <PersonAddIcon className="sidebarIcon" />
                Add Personnel
              </li>
            </Link>
            <Link to="/logout" className="link">
              <li
                className={
                  active === "logout"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("logout")}
              >
                <LogoutIcon className="sidebarIcon" />
                Logout
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
