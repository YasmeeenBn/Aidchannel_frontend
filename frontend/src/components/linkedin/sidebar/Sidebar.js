import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./Sidebar.css";
import { Avatar } from "@material-ui/core";
import urlImageAdapter from "helpers/urlImageAdapter";
import { getLastPostApi } from "apis/postApi";
import { getOneUser } from "apis/userApi";
import { getNumberProfiles } from "apis/viewApi";
function Sidebar() {
  const history = useHistory();
  const [lastPost, setLastPost] = useState();
   const { idProfile } = useParams();
    const [myAccount, setMyAccount] = useState();
    const [numberviews, setnumberviews] = useState();
   const [user, setUser] = useState();
  const recentItem = (topic) => (
    <div className="sidebar__recentItem">
      <span className="sidebar__hash">#</span>
      <p>{topic}</p>
    </div>
  );
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const getDataFromApi = useCallback(async () => {
    const post = await getLastPostApi(userInfo?.user?._id);
    setLastPost(post);
   
   
    const numberviews = await getNumberProfiles(userInfo?.user?._id);
    setnumberviews(numberviews);
  }, []);

  useEffect(() => {
    getDataFromApi();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          src="https://audreytips.com/wp-content/uploads/2017/08/comment-trouver-des-clients-avec-linkedin-11.jpg"
          alt="background-banner"
        />
        <Avatar
          src={urlImageAdapter(userInfo?.user?.image_url)}
          className="sidebar__avatar"
        ></Avatar>
        <h2
          onClick={() =>
            history.push(`/linkedin/profil/${userInfo?.user?._id}`)
          }
        >
          {userInfo?.user?.fullname}
        </h2>
        <h4>{userInfo?.user?.job_title}</h4>
      </div>
      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>Who viewed you</p>
          <p className="sidebar__statNumber">{numberviews}</p>
        </div>
        <div className="sidebar__stat">
          <p>Views on post</p>
          <p className="sidebar__statNumber">{lastPost?.views?.length}</p>
        </div>
      </div>
      <div className="sidebar__bottom">
        <p>Recent</p>
        {recentItem("USAID")}
        {recentItem("ZIG")}
        {recentItem("who")}
        {recentItem("WORLD BANK")}
      </div>
    </div>
  );
}

export default Sidebar;
