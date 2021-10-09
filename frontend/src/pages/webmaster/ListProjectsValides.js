import Flag from "react-world-flags";
import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import MTableProject from "../../components/aidchannel/webmaster/MTableProject";
import { getAllProjectsByCountry } from "../../apis/projectApi";

import TableProjectAccepted from "components/aidchannel/webmaster/TableProjectAccepted";

const ListProjectsValides = () => {
  const { codeCountry, multimedia } = useParams();
  const history = useHistory();
  const [projects, setprojects] = useState([]);
  const getDataFromApi = useCallback(async () => {
    const project = await getAllProjectsByCountry(codeCountry);
    setprojects(project?.reverse());
  }, [codeCountry]);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  return (
    <div className="container">
      <>
        <button
          onClick={() => history.push(`/web-master/add-project/${codeCountry}`)}
          className="btn btn-primary ml-3 my-3 shadow-none border-none"
        >
          Add
        </button>
        <TableProjectAccepted />
      </>
    </div>
  );
};

export default ListProjectsValides;
