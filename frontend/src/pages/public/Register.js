import React from "react";
import RegistrationForm from "../../components/aidchannel/authentication/RegistrationForm";
import SideImage from "../../components/aidchannel/authentication/SideImage";
import PublicHeader from "../../components/layout/header/PublicHeader";

const Register = () => {
  return (
    <>
      <PublicHeader />
      <div className="container">
        <div className="row mt-4">
          <div className="col-6 d-none d-lg-block m-auto text-center">
            <SideImage pageName="signup" />
          </div>
          <div className="col-12 col-lg-6 ">
            <div className="row m-3">
              <div className="col-12 m-auto">
                <RegistrationForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
