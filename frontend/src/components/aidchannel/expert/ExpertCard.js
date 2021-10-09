import React from "react";
import "./ExpertCard.css";
import { Link } from "react-router-dom";
import urlImageAdapter from "helpers/urlImageAdapter";

const ExpertCard = ({ expert }) => {
  return (
    <div className="card card-container-expert pb-5">
      <img
        className="card-img-top img-top-expert"
        src={urlImageAdapter(expert.image_url)}
        alt="Card cap"
      />
      <div className="card-body ">
        <div className="row">
          <div className="col-sm-12">
            <h1 className="card-text mt-3 title-expert">{expert.fullname}</h1>
          </div>
          <div className="col-sm-12 mt-3">
            <h1 className="card-text sub-title-expert">{expert.email}</h1>
          </div>
        </div>
      </div>
      <div className="row mx-3">
        <div className="col-sm-12">
          <Link to={`/expert/${expert._id}`}>
            <h1 className="card-text mt-2 text-purple-expert-card text-right ">
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
      </div>
    </div>
  );
};

export default ExpertCard;
