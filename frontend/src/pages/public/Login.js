import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/aidchannel/authentication/LoginForm";
import SideImage from "../../components/aidchannel/authentication/SideImage";
import PublicHeader from "../../components/layout/header/PublicHeader";

const Login = () => {
  return (
    <>
      <PublicHeader />
      <div className="container">
        <div className="row mt-5">
          <div className="col-12 col-lg-6 ">
            <div className="row mt-5">
              <div className="col-12 text-center">
                <h1 className="login-title">Sign in</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-center">
                <h1 className="login-sub-title">
                  Don’t have an account?
                  <span className="login-sub-title-purple">
                    {"   "}
                    <Link
                      className="text-decoration-none"
                      style={{ color: "#3f51b5" }}
                      to="/signup"
                    >
                      Sign up
                    </Link>
                  </span>
                </h1>
              </div>
            </div>
            <div className="row my-5">
              <div className="col-12 col-md-9 col-lg-12  m-auto">
                <LoginForm />
              </div>
            </div>
          </div>
          <div className="col-6 d-none d-lg-block m-auto text-center">
            <SideImage pageName="login" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
