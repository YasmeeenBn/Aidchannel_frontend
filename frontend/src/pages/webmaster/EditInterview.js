import React from "react";
import { useParams } from "react-router-dom";
import Flag from "react-world-flags";
import InterviewForm from "../../components/aidchannel/webmaster/InterviewForm";

const EditInterview = () => {
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
        Edit Interview
      </h1>
      <hr />
      <InterviewForm />
    </div>
  );
};

export default EditInterview;
