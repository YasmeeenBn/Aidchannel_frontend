import { getProject2 } from "apis/projectApi";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import Flag from "react-world-flags";
import { acceptProject } from "../../apis/projectApi";
import EditProjectSA from "components/aidchannel/superadmin/EditProjectSA";
const EditProject = () => {
  const [project, setProject] = useState();

  const { codeCountry, idProject } = useParams();
  const history = useHistory();

  const getDataFromApi = useCallback(async () => {
    const project = await getProject2(idProject);
    setProject(project);
  }, [idProject]);
  const accept = async (projectId) => {
    await acceptProject(projectId);
    history.push(`/web-master/validationProjects/projectsNv/${codeCountry}`);
  };
  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);
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
        Edit Project
      </h1>
      <hr />
      <EditProjectSA />
    </div>
  );
};

export default EditProject;
