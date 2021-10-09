import React from "react";
import { Link } from "react-router-dom";
import "./PublicHeaderLink.css";

const PublicHeaderLink = () => {
  
  return (
    <div>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light backgroud-color">
          <Link to="/" className="navbar-brand">
            <div>
              <img
                style={{ width: "50px" }}
                src="/assets/linkLogo.png"
                alt="Linkedin Logo"
              />
            </div>
          </Link>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">

              <Link className="nav-link" to="/linkedin/register">
                <button className="btn btn-outline-primary shadow-none">
                  Register
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default PublicHeaderLink;
