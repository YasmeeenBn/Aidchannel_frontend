import React from "react";
import { Link, useParams } from "react-router-dom";
import Flag from "react-world-flags";
import AddTechnicalDetails from "components/aidchannel/webmaster/AddTechnicalDetails";
import TechnicalDetailsCanvas from "components/aidchannel/webmaster/TechnicalDetailsCanvas";
import ListProjects from "./ListProjects";
import ListProjectsValides from "./ListProjectsValides";
import MoreDetailsProject from "./MoreDetailsProject";
const TechnicalDetails = () => {
  const { codeCountry, idProject, multimedia } = useParams();
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
          Technical Details
        </h1>
        {/* <hr /> */}

        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link
              to={`/web-master/technicaldetails/${codeCountry}/${idProject}/graph`}
              className={`nav-link ${multimedia === "graph" && "active"}`}
            >
              Graph
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={`/web-master/technicaldetails/${codeCountry}/${idProject}/details`}
              className={`nav-link ${multimedia === "details" && "active"}`}
            >
              More details
            </Link>
          </li>
        </ul>

        {multimedia === "graph" && <TechnicalDetailsCanvas />}
        {multimedia === "details" && <MoreDetailsProject />}

        {/*<AddTechnicalDetails />*/}
        {/* <TechnicalDetailsCanvas /> */}
      </>
    </div>
  );
};

export default TechnicalDetails;
