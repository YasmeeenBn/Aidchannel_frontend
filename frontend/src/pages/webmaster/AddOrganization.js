import React from "react";
import { useParams } from "react-router-dom";
import Flag from "react-world-flags";
import OrganizationForm from "../../components/aidchannel/webmaster/OrganizationForm";

const AddOrganization = () => {
  const { codeCountry } = useParams();
  return (
    <div className="container">
      <h1>
        <Flag
          code={codeCountry}
          height="70"
          width="70"
          style={{ marginRight: "2px" }}
          className="flag"
        />{" "}
        Add Local organizations office
      </h1>
      <hr />
      <OrganizationForm />
    </div>
  );
};

export default AddOrganization;
