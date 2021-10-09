import React from "react";
import "./ExpertDetailHeader.css";
const ExpertDetailHeader = ({ expert }) => {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-sm-6 justify-content-end">
            <h1
              style={{
                color: "#FFD700",
                fontSize: "23.9888px",
                lineHeight: "32.0011px",
                fontWeight: "bold",
              }}
            >
              {expert.fullname}
            </h1>
            <h1 className="title">Who is this expert?</h1>
            <h4 className="text-justify">
              Our sign up is dead simple. We only require your basic company
              information and what type of data storage you want. Our sign up is
              dead simple. We only require your basic company information and
              what type of data storage you want.We only require your basic
              company information and what type of data storage you want. Our
              sign up is dead simple. We only require your basic company
              information and what type of data storage you want.
            </h4>
          </div>
          <div className="col-6">
            <img
              className="rounded-circle img-top"
              src={expert.image_url}
              alt="Card cap"
            />
            <h1 className="title">What’s up with the work this expert do ?</h1>
            <h4 className="text-justify1">
              We support bulk uploading via SQL, integrations with most data
              storage products, or you can use our API. Simply select where
              you'd like to transfer your data and we'll being the process of
              migrating it instantly.
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpertDetailHeader;
