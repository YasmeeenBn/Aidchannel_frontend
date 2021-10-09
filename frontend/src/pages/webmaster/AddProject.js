import React from 'react'
import { useParams } from "react-router-dom";
import Flag from "react-world-flags";
import AddProjectForm from '../../components/aidchannel/webmaster/ProjectForm';
const AddProject = () => {
  const { codeCountry } = useParams();
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
        Add Project
      </h1>
      <hr />
      <AddProjectForm />
    </div>
  );
};

export default AddProject
