import React from "react";
import { useHistory } from "react-router";
import { Avatar } from "@material-ui/core";
import urlImageAdapter from "helpers/urlImageAdapter";
import "./Comment.css";

const Comment = ({ user, content }) => {
  const history = useHistory();
  return (
    <div className="row my-2">
      <div className="col-2 col-sm-1">
        <Avatar src={urlImageAdapter(user?.image_url)}></Avatar>
      </div>
      <div className="col-9 col-sm-10 ml-3 p-2 comment_body">
        <span
          onClick={() => history.push(`/linkedin/profil/${user?._id}`)}
          className="fullname_comment"
        >
          {user?.fullname}
        </span>
        <span className="job_title_comment">{user?.job_title}</span>
        <div className="comment_content mt-2">{content}</div>
      </div>
    </div>
  );
};

export default Comment;
