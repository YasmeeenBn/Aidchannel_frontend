import TableOrganizationsAdmin from "components/aidchannel/superadmin/TableOrganizationsAdmin";
import TableOrganization from "components/aidchannel/webmaster/TableOrganization";
import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import TableWebmaster from "../../components/aidchannel/superadmin/TableWebmaster";

const ListOrganizationsAdmin = () => {
  const [webmaster, setWebmaster] = useState([]);
  const history = useHistory();

  return (
    <div className="container">
      <>
        <h1>Organizations</h1>
        <hr />
        <button
          onClick={() => history.push(`/super-admin/add-organization`)}
          className="btn btn-primary ml-3 mt-2 mb-3 shadow-none border-none"
        >
          Add
        </button>

        <TableOrganizationsAdmin />
      </>
    </div>
  );
};

export default ListOrganizationsAdmin;
