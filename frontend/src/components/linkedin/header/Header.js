import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ChatIcon from "@material-ui/icons/Chat";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import NotificationsIcon from "@material-ui/icons/Notifications";
import HeaderOption from "./HeaderOption.js";
import { useHistory, Link } from "react-router-dom";
//import { auth } from "./firebase.js";
//import { logout } from "./features/userSlice";
import "./Header.css";
import axios from "axios";
import { axiosClient } from "apis/index.js";

function Header() {
  const history = useHistory();
  const onProfilClick = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BACKEND}user/logout`);
      delete axiosClient.defaults.headers.common["Authorization"];
      localStorage.removeItem("userInfo");
      history.push("/linkdin/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="header d-block d-md-flex px-3 px-md-0 px-lg-5">
      <div className="header__left d-none d-md-flex">
        <img src="/assets/linkLogo.png" alt="Linkedin Logo" />
        <div className="header__search my-auto h-75 ">
          <SearchIcon />
          <input placeholder="Search" className="" type="text"></input>
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <Link to="/linkdin" style={{ textDecoration: "none" }}>
            <HeaderOption Icon={HomeIcon} title="Home" />
          </Link>
        </div>
        <div className="col-2">
          <Link to="/linkedin/network" style={{ textDecoration: "none" }}>
            <HeaderOption Icon={SupervisorAccountIcon} title="Network" />
          </Link>
        </div>
        {/* <div className="col-2">
          <HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
        </div> */}
        <div className="col-2">
          <HeaderOption Icon={ChatIcon} title="Messaging" />
        </div>
        <div className="col-2">
          <HeaderOption Icon={NotificationsIcon} title="Notifications" />
        </div>
        <div className="col-2">
          <HeaderOption avatar={true} title="You" onClick={onProfilClick} />
        </div>
      </div>
    </div>
  );
}

export default Header;
