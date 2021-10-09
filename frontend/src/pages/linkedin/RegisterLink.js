import RegistrationFormLink from "components/linkedin/registerFormLink/RegisterFormLink";
import React from "react";
import RegistrationForm from "../../components/aidchannel/authentication/RegistrationForm";
import PublicHeaderLink from "../../components/linkedin/PublicHeaderLink/PublicHeaderLink";

const RegisterLink = () => {
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
            <RegistrationFormLink />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterLink;
