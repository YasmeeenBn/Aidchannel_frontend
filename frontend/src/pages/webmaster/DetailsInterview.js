import React from "react";
import { useParams } from "react-router-dom";
import Flag from "react-world-flags";
import Details from "../../components/aidchannel/webmaster/Details";

const DetailsInterview = () => {
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
        Details Interview
      </h1>

      <hr />
      <Details />
    </div>
  );
};

export default DetailsInterview;
