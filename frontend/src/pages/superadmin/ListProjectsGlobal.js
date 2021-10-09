import Flag from "react-world-flags";
import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  getAllProjectsByCountryNull,
  deleteProject,
} from "../../apis/projectApi";
import MTableProject from "components/aidchannel/superadmin/MtableProject";

const ListProjectsGlobal = () => {
  const { codeCountry } = useParams();
  const history = useHistory();
  const [projects, setprojects] = useState([]);
  const getDataFromApi = useCallback(async () => {
    const project = await getAllProjectsByCountryNull(codeCountry);
    setprojects(project?.reverse());
  }, [codeCountry]);
  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);
  const deletePjt = async (project) => {
    if (window.confirm(`Are you sure you wish to delete ${project.name} ?`)) {
      try {
        await deleteProject(project._id);
        const newProjectList = projects.filter(function(item) {
          if (item["_id"] === project?._id) return false;
          return true;
        });
        setprojects(newProjectList);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container">
      <>
        <h1>Projects </h1>
        <hr />

        <MTableProject />
      </>
    </div>
  );
};

export default ListProjectsGlobal;
