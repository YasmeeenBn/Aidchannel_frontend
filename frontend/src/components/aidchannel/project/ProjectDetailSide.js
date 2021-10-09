import React from "react";
import "./ProjectDetailSide.css";
import parse from "html-react-parser";
import { NO_DATA_AVALAIBLE } from "helpers/constants";
import urlImageAdapter from "helpers/urlImageAdapter";
import {
  FcMoneyTransfer,
  FcBullish,
  FcGlobe,
  FcRightUp,
  FcRightDown,
} from "react-icons/fc";

const ProjectDetailSide = ({ project }) => {
  return (
    <>
      {project && (
        <div className="row">
          <div className="col-12 col-md-8 ">
            <p className="project-details text-justify">
              {parse(String(project?.description ? project?.description : ""))}
            </p>
            {project.image_url && (
              <img
                className="footer-img"
                alt="profile"
                src={urlImageAdapter(project.image_url)}
              />
            )}
            <p className="project-details text-justify">
              {parse(String(project?.objectives ? project?.objectives : ""))}
            </p>
          </div>
          <div className="col-12 col-md-3 ml-md-5 ">
            <div className="side-card">
              <h1
                className="section-title mb-4"
                style={{
                  color: "#3f51b5",
                  fontSize: "23.9888px",
                  lineHeight: "32.0011px",
                  fontWeight: "bold",
                }}
              >
                Budget
              </h1>
              <ul className="list-unstyled">
                <li>
                  <FcMoneyTransfer size={25} />
                  <span className="ml-4">
                    {" "}
                    {project.total_cost
                      ? project.total_cost
                      : NO_DATA_AVALAIBLE}
                  </span>
                </li>
              </ul>
              <h1
                className="section-title mb-4"
                style={{
                  color: "#3f51b5",
                  fontSize: "23.9888px",
                  lineHeight: "32.0011px",
                  fontWeight: "bold",
                }}
                className="bold-title"
              >
                Status
              </h1>
              <ul className="list-unstyled">
                <li>
                  <FcBullish size={25} />
                  <span className="ml-4">
                    {" "}
                    {project?.status?.name
                      ? project?.status?.name
                      : NO_DATA_AVALAIBLE}
                  </span>
                </li>
              </ul>
              <h1
                className="bold-title"
                className="section-title mb-4"
                style={{
                  color: "#3f51b5",
                  fontSize: "23.9888px",
                  lineHeight: "32.0011px",
                  fontWeight: "bold",
                }}
                className="bold-title"
              >
                Actual Start
              </h1>
              <ul className="list-unstyled">
                <li>
                  <FcRightUp size={25} />

                  <span className="ml-4">
                    {" "}
                    {project?.actual_start
                      ? project?.actual_start?.split("T")[0]
                      : NO_DATA_AVALAIBLE}
                  </span>
                </li>
              </ul>
              <h1
                className="bold-title"
                className="section-title mb-4"
                style={{
                  color: "#3f51b5",
                  fontSize: "23.9888px",
                  lineHeight: "32.0011px",
                  fontWeight: "bold",
                }}
                className="bold-title"
              >
                Actual end
              </h1>{" "}
              <ul className="list-unstyled">
                <li>
                  <FcRightDown size={25} />

                  <span className="ml-4">
                    {" "}
                    {project?.actual_end
                      ? project?.actual_end?.split("T")[0]
                      : NO_DATA_AVALAIBLE}
                  </span>
                </li>
              </ul>
              <h1
                className="bold-title"
                className="section-title mb-4"
                style={{
                  color: "#3f51b5",
                  fontSize: "23.9888px",
                  lineHeight: "32.0011px",
                  fontWeight: "bold",
                }}
                className="bold-title"
              >
                Country
              </h1>{" "}
              <ul className="list-unstyled">
                <li>
                  <FcGlobe size={25} />

                  <span className="ml-4">
                    {" "}
                    {project?.country?.name
                      ? project?.country?.name
                      : NO_DATA_AVALAIBLE}
                  </span>
                </li>
              </ul>
            </div>
          </div>{" "}
        </div>
      )}
    </>
  );
};

export default ProjectDetailSide;
