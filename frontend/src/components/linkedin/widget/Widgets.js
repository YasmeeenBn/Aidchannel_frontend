import React from "react";
import { useHistory } from "react-router";
import InfoIcon from "@material-ui/icons/Info";
import "./Widgets.css";

function Widgets() {
  const history = useHistory();
  const newsArticle = (heading, url) => (
    <div onClick={() => history.push(url)} className="widgets__article">
      <div className="ml-2">
        <p>{heading}</p>
      </div>
    </div>
  );

  return (
    <div className="widgets">
      <div className="widgets__header">
        <h2>Actions</h2>
        <InfoIcon />
      </div>
      {newsArticle("My DAP Network", "/linkedin/mydbanetwork")}
      {newsArticle("My Projects", "/linkedin/myprojects")}
      {newsArticle("My Logical Frameworks")}
      {/* {newsArticle("My Ressources")} */}
    </div>
  );
}

export default Widgets;
