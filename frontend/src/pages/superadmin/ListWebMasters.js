import { getAllwebmasters } from "apis/userApi";
import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import TableWebmaster from "../../components/aidchannel/superadmin/TableWebmaster";


const ListWebMasters = () => {
  const [webmaster, setWebmaster] = useState([]);

  const history = useHistory();
  // const [codeCountry, setCountry] = useState();
  // const country = await getCountryByCode(codeCountry);


  return (
    <div className="container">
      <>
        <h1>WebMasters</h1>
        <hr />
        <button
          onClick={() => history.push(`/super-admin/add-webmaster`)}
          className="btn btn-primary ml-3 mt-2 mb-3 shadow-none border-none"
          
        >
          Add
        </button>

        <TableWebmaster />
      </>
    </div>
  );
};

export default ListWebMasters;
