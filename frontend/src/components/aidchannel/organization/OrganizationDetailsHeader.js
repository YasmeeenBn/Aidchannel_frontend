import React from "react";

const OrganizationDetailsHeader = ({ organization }) => {
  return (
    <div
      className="mt-5 border-bottom"
      style={{ borderColor: "#2d3748", fontSize: "14px" }}
    >
      <div className="row pb-4">
        <div className="col-12 col-sm-6 my-auto">
          <h1
            style={{
              color: "#3f51b5",
              fontSize: "23.9888px",
              lineHeight: "32.0011px",
              fontWeight: "bold",
            }}
          >
            {organization.name}
          </h1>
          <h3
            style={{
              color: "#718096",
              fontSize: "16px",
              lineHeight: "28px",
            }}
          >
            Organization size: {organization.organization_size}
          </h3>
        </div>
        <div className="col-sm-3"></div>
        <div className="col-12 col-sm-3 justify-content-end">
          <img
            alt="logo organization"
            src={organization.logo}
            className="w-75"
          />
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetailsHeader;
