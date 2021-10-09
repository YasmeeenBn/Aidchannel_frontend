import React from "react";
import "./CardInfo.css";
import { Link } from "react-router-dom";
import urlImageAdapter from "helpers/urlImageAdapter";

const CardSmall = ({ data, index, codeCountry, projectId }) => {
  return (
    <>
      <div className="mb-5 box-shadow-card-info p-2">
        <Link
          to={
            data?.name === "overview"
              ? `/projectdetails/${projectId}/more`
              : `/web-master/interview-details/${codeCountry}/${data?._id}`
          }
        >
          <div>
            <img
              className="project-month-img"
              alt="project of the month"
              src={urlImageAdapter(data?.interviewImage)}
              style={{ height: "300px" }}
            />
          </div>
        </Link>
      </div>
    </>
  );
};

export default CardSmall;
