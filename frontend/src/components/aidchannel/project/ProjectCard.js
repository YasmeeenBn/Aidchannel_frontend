import React from "react";
import Flag from "react-world-flags";
import "./ProjectCard.css";
import { Link } from "react-router-dom";
import urlImageAdapter from "helpers/urlImageAdapter";
import logo from '../../../assets/images/logo.png'; 
const ProjectCard = ({ project }) => {
  const image = urlImageAdapter(project.image_url)?urlImageAdapter(project.image_url):logo
  const profile = urlImageAdapter(project.image_url)?urlImageAdapter(project.image_url):logo
  return (
    <>
      {project && (
        <div className="card card-container-project h-100">
          <img
            className="card-img-top img-top-project"
            src={image}
            alt="Card cap"
          />
          <div className="card-body">
            <div className="row">
              <div className="col-sm-12">
                {" "}
                <h1 className="card-text mt-2 text-purple-project-card ">
                  {project.total_cost}
                </h1>
              </div>
              <div className="col-sm-12">
                <h1 className="card-text mt-3 title-project-card">
                  {project.name}
                </h1>
              </div>
              <div className="col-sm-12 mt-3">
                <h1 className="card-text sub-title-project">
                  {project.thematique?.name}
                </h1>
              </div>
            </div>
          </div>
          <div className="row my-2 mx-3">
            <div className="col-sm-6">
              <img
                className="rounded-circle  avatar-img-project"
                alt="profile"
                src={profile}
                data-holder-rendered="true"
              />
            </div>
            <div className="col-sm-6 m-auto">
              <h1 className="card-text status-project-card">
                {project.status?.name}
              </h1>
            </div>
            <div className="col-sm-12">
              <Link to={`/projectdetails/${project._id}`}>
                <h1 className="card-text mt-2 text-purple-project-card  text-right ">
                  <span className="mr-2">Learn more</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                    />
                  </svg>
                </h1>
              </Link>
            </div>
            <div className="col-12  my-auto ">
              <Flag
                className="m-auto"
                code={project?.country?.code}
                height="20  "
                style={{ marginRight: "5px" }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
