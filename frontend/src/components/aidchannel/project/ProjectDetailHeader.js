import urlImageAdapter from "helpers/urlImageAdapter";
import React from "react";

import "./ProjectDetailHeader.css";
const ProjectDetailHeader = ({ project }) => {
  return (
    <>
      {project && (
        <div
          className="header-wraper"
          style={{
            backgroundImage: "url(" + urlImageAdapter(project.image_url) + ")",
          }}
        >
          <div className="main-info">
            <h1>{project.name}</h1>

            <div>
              {project.image_url && (
                <img
                  className="rounded-circle  avatar-img "
                  alt="profile"
                  src={urlImageAdapter(project.image_url)}
                  data-holder-rendered="true"
                />
              )}

              <h1 className=" sub-title">
                Thematic of the project is {project.thematique?.name}
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ProjectDetailHeader;
