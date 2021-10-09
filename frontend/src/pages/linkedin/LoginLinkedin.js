import LoginFormLinkedin from "components/linkedin/loginFormLinkedin/LoginFormLinkedin";
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/aidchannel/authentication/LoginForm";
import SideImage from "../../components/aidchannel/authentication/SideImage";
import PublicHeaderLink from "../../components/linkedin/PublicHeaderLink/PublicHeaderLink";

const LoginLinkedin = () => {
  return (
    <>
      <PublicHeaderLink />
      <div className="container">
        <div className="row">
          <div
            className="col-12 col-md-7 col-lg-6 mx-auto my-3 p-5"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            <LoginFormLinkedin />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginLinkedin;
