import React from "react";
import "./CardInfo.css";
import { useMediaQuery } from "react-responsive";
import parse from "html-react-parser";
import urlImageAdapter from "helpers/urlImageAdapter";

const CardInfoDetails = ({ data, index }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 700px)",
  });

  return (
    <div className="container my-5 box-shadow-card-info p-4">
      {isDesktopOrLaptop ? (
        <>
          <div className="row ">
            {/* <h1>yas</h1> */}
            <div className="col-12">
              <h1 className="title-project-month">{data?.name}</h1>
              <div className="row ">
                <div className="col-6 my-4">
                  <img
                    className="project-month-img"
                    alt=""
                    src={urlImageAdapter(data?.image_url)}
                  />
                </div>
                <div className="col-6 my-4">
                  <p className="project-details text-justify">
                    {parse(data?.description?.substring(0, 501))}
                  </p>
                </div>
                <div className="col-12 ">
                  <p className="project-details text-justify">
                    {parse(data?.description.substring(501))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="row ">
            <div className="col-12">
              <h1 className="title-project-month">{data?.name}</h1>
              <div className="col-6 my-4">
                <p className="project-details text-justify">
                  {parse(data?.description?.substring(0, 501))}
                </p>
              </div>
              <div className="col-12 ">
                <p className="project-details text-justify">
                  {parse(data?.description?.substring(501))}
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 ">
            <img
              className="project-month-img"
              alt="project of the month"
              src={urlImageAdapter(data?.image_url)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CardInfoDetails;
