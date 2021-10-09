import EditGraphTechnicalDetails from "components/aidchannel/webmaster/EditGraphTechnicalDetails";
import React from "react";
import { useParams } from "react-router-dom";
import Flag from "react-world-flags";

const EditTechnicalDetails = () => {
  const { codeCountry } = useParams();
  return (
    <div className="container">
      <>
        <h1>
          <Flag
            code={codeCountry}
            height="70"
            width="70"
            style={{ marginRight: "2px" }}
            className="flag"
          />
          Edit Technical Details
        </h1>
        <hr />
        <EditGraphTechnicalDetails />
      </>
    </div>
  );
};

export default EditTechnicalDetails;
