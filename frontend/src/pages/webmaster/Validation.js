import React from "react";
import Flag from "react-world-flags";
import { useParams, Link } from "react-router-dom";
import YoutubeValidation from "./YoutubeValidation";
import TwitterValidation from "./TwitterValidation";
import TweetsValidés from "./TweetsValidés";
import YoutubeValidés from "./YoutubeValides";
import ValidationArticles from "./ValidationArticles";
import ArticlesValides from "./ArticlesValides";


const Validation = (props) => {
  const { codeCountry, multimedia } = useParams();

  return (
    <div>
      <div className="container">
        <>
          <h1>
            <Flag
              code={codeCountry}
              height="70"
              width="70"
              style={{ marginRight: "2px" }}
              className="flag"
            />{" "}
            Validation
          </h1>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link
                to={`/web-master/validation/youtube/${codeCountry}`}
                className={`nav-link ${multimedia === "youtube" && "active"}`}
              >
                Youtube
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/web-master/validation/twitter/${codeCountry}`}
                className={`nav-link ${multimedia === "twitter" && "active"}`}
              >
                Twitter
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to={`/web-master/validation/articles/${codeCountry}`}
                className={`nav-link ${multimedia === "articles" && "active"}`}
              >
                Articles
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/web-master/validation/TweetsAccepted/${codeCountry}`}
                className={`nav-link ${multimedia === "TweetsAccepted" &&
                  "active"}`}
              >
                Valid Tweets
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/web-master/validation/YoutubesAccepted/${codeCountry}`}
                className={`nav-link ${multimedia === "YoutubesAccepted" &&
                  "active"}`}
              >
                Valid Videos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/web-master/validation/ArticlesAccepted/${codeCountry}`}
                className={`nav-link ${multimedia === "ArticlesAccepted" &&
                  "active"}`}
              >
               Valid Articles
              </Link>
            </li>
          </ul>
        </>

        {multimedia === "twitter" && <TwitterValidation />}
        {multimedia === "youtube" && <YoutubeValidation />}
        {multimedia === "articles" && <ValidationArticles />}
        {multimedia == "TweetsAccepted" && <TweetsValidés />}
        {multimedia == "YoutubesAccepted" && <YoutubeValidés />}
        {multimedia == "ArticlesAccepted" && <ArticlesValides />}
      </div>
    </div>
  );
};

export default Validation;
