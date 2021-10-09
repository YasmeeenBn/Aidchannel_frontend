import PojectFormLinkedin from "components/linkedin/PojectFormLinkedin";
import React from "react";
import { useParams } from "react-router-dom";
import Flag from "react-world-flags";
import Header from "components/linkedin/header/Header";
const AddProjectByExpert = () => {
  const { codeCountry } = useParams();
  return (
    <div className="container">
      <Header />
      <h1>
        <Flag
          code={codeCountry}
          height="70"
          width="70"
          style={{ marginRight: "2px" }}
          className="flag"
        />{" "}
  
      </h1>
      
      <PojectFormLinkedin />
    </div>
  );
};

export default AddProjectByExpert;
