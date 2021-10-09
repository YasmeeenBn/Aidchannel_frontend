import React from "react";
import { useParams } from "react-router-dom";
import Flag from "react-world-flags";
import OrganizationForm from "../../components/aidchannel/webmaster/OrganizationForm";

const EditOrganizationAdmin = () => {
  // const { idOrganization } = useParams();
  return (
    <div className="container">
      <h1>Edit</h1>
      <hr />
      <OrganizationForm />
    </div>
  );
};

export default EditOrganizationAdmin;
