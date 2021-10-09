import { getProject2 } from "apis/projectApi";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import Flag from "react-world-flags";
import AddProjectForm from "../../components/aidchannel/webmaster/ProjectForm";
import { acceptProject } from "../../apis/projectApi";
import ReactJson from "react-json-view";
import { Row, FormGroup, FormLabel, Col } from "react-bootstrap";
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

      <AddProjectForm />

      {!project?.validation && (
        <button
          onClick={() => accept(project?._id)}
          className="btn btn-success w-100 h-25 my-2 shadow-none"
        >
          Accept Project
        </button>
      )}
      {project && (
        <div className="container my-5 box-shadow-card-info p-4">
          <FormLabel className="label__form">Informations Related </FormLabel>{" "}
          <ReactJson src={project?.raw_data_org} />{" "}
        </div>
      )}
    </div>
  );
};

export default EditProject;
