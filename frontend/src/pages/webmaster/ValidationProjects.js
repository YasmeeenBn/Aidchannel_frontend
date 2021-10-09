import React from "react";
import { useParams, Link } from "react-router-dom";
import ListProjects from "./ListProjects";
import ListProjectsValides from "./ListProjectsValides";
import Flag from "react-world-flags";

const ValidationProjects = (props) => {
  const { codeCountry, multimedia } = useParams();

  return (
    <div>
      <div className="container">
        <>
          <h1>
            <Flag
              code={codeCountry}
              height="70"
              width="70"
              style={{ marginRight: "2px" }}
              className="flag"
            />{" "}
            Projects Validation
          </h1>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link
                to={`/web-master/validationProjects/projectsNv/${codeCountry}`}
                className={`nav-link ${multimedia === "projectsNv" &&
                  "active"}`}
              >
                Projects Scrapped
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/web-master/validationProjects/projectsV/${codeCountry}`}
                className={`nav-link ${multimedia === "projectsV" && "active"}`}
              >
                Valid Projects
              </Link>
            </li>
          </ul>
        </>

        {multimedia === "projectsNv" && <ListProjects />}
        {multimedia === "projectsV" && <ListProjectsValides />}
      </div>
    </div>
  );
};

export default ValidationProjects;
