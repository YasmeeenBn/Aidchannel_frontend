import Flag from "react-world-flags";
import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { getAllProjectsByCountry, deleteProject } from "../../apis/projectApi";
import TableProject from "components/aidchannel/webmaster/TableProject";

const ListProjects = () => {
 

  return (
    <div className="container">
      <>
        <h5></h5>
        {/* <button
          onClick={() => history.push(`/web-master/add-project/${codeCountry}`)}
          className="btn btn-primary ml-3 my-3 shadow-none border-none"
        >
          Add
        </button> */}
        <TableProject />
      </>
    </div>
  );
};

export default ListProjects;
