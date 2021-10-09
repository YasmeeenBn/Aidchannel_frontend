import React from "react";
import SimpleMap from "./SimpleMap";

const ExpertContact = ({ expert }) => {
  return (
    <>
      <div className="container mt-5  ">
        <div className="row">
          <div className="col-12 col-sm-6 ">
            <h1 className="bold-title1 ">Contact the expert</h1>
            <h4 className="secondary-title1">{expert.fullname}</h4>
            <ul className="list-unstyled">
              <li style={{ marginTop: "50px" }}>
                <img
                  style={{ width: "34px" }}
                  alt="yellow icon"
                  src="/assets/icons/contact-icon-phone.png"
                />{" "}
                <span className="ml-4">Phone</span>
              </li>
              <li style={{ marginTop: "20px" }}>
                <img
                  style={{ width: "34px" }}
                  alt="yellow icon"
                  src="/assets/icons/contact-icon-mail.png"
                />{" "}
                <span className="ml-4">{expert.email}</span>
              </li>
              <li style={{ marginTop: "20px" }}>
                <img
                  style={{ width: "34px" }}
                  alt="yellow icon"
                  src="/assets/icons/contact-icon-pin.png"
                />{" "}
                <span className="ml-4">Address</span>
              </li>
            </ul>
          </div>

          <div className="col-12 col-sm-6">
            <SimpleMap />
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpertContact;
