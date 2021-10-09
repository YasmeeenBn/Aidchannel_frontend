import Flag from "react-world-flags";
import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import MTableProject from "../../components/aidchannel/webmaster/MTableProject";
import { getAllProjectsByCountry } from "../../apis/projectApi";

import TableProjectAccepted from "components/aidchannel/webmaster/TableProjectAccepted";
import TableProjectsLinkedin from "components/linkedin/TableProjectsLinkedin";

const ListOfProjectsLinkedin = () => {
 
  const history = useHistory();
  

  return (
    <div className="container">
      <>
        <button
          onClick={() => history.push(`/linkedin/add-project`)}
          className="btn btn-primary ml-3 my-3 shadow-none border-none"
         
        >
          Add
        </button>
        <TableProjectsLinkedin />
      </>
    </div>
  );
};

export default ListOfProjectsLinkedin;
