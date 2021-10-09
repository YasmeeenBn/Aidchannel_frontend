import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import parse from "html-react-parser";
import "./OrganizationForm.css";

import { getOneInterview } from "apis/interviewApi";
import urlImageAdapter from "helpers/urlImageAdapter";

const Details = () => {
  const { idInterview } = useParams();
  const [interview, setInterview] = useState();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 700px)",
  });
  const getDataFromApi = useCallback(async () => {
    const interview = await getOneInterview(idInterview);
    setInterview(interview);
    console.log(interview);
  }, []);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  const index = 1;

  return (
    <div className="container">
      <div className="row pb-5">
        <div className="container my-5 box-shadow-card-info p-4">
          {interview && (
            <>
              <div className="row">
                <div className="col-12 mt-3">
                  <img
                    className="rounded mx-auto d-block"
                  //  width="75%"
                    alt="project of the month"
                    src={`${process.env.REACT_APP_BACKEND}${interview?.interviewImage}`}
                  />
                </div>
                <div className="col-12 mt-4">
                  <p className="project-details text-justify">
                    {parse(interview?.interview)}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
