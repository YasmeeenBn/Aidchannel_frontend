import React from "react";
import { useParams } from "react-router-dom";
import Flag from "react-world-flags";
import OrganizationForm from "../../components/aidchannel/superadmin/OrganizationForm";

const AddOrganizationAdmin = () => {
  //   const { idOrganization } = useParams();
  return (
    <div className="container">
      <h1>Add Organization</h1>
      <hr />
      <OrganizationForm />
    </div>
  );
};

export default AddOrganizationAdmin;
