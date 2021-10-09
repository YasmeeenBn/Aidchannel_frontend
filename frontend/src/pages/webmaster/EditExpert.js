import ExpertForm from "components/aidchannel/webmaster/ExpertForm";
import React from "react";
import { useParams } from "react-router-dom";
import Flag from "react-world-flags";

const EditExpert = () => {
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
        Edit Expert
      </h1>
      <hr />
      <ExpertForm />
    </div>
  );
};

export default EditExpert;
