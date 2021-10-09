import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./CardInfo.css";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router-dom";
import parse from "html-react-parser";
import urlImageAdapter from "helpers/urlImageAdapter";

const CardInfo = ({ data, index, url }) => {
  const history = useHistory();
  const { codeCountry } = useParams();

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 700px)",
  });

  return (
    <div className="container my-5 box-shadow-card-info p-4">
      {data && (
        <>
          {isDesktopOrLaptop ? (
            index % 2 === 0 ? (
              <>
                <div className="row ">
                  <div className="col-md-4 col-sm-12">
                    <img
                      className="project-month-img"
                      alt="project of the month"
                      src={urlImageAdapter(data?.image_url)}
                    />
                  </div>
                  <div className="col-md-8  col-sm-12">
                    <h1 className="title-project-month">{data?.name}</h1>
                    <p className="project-details text-justify">
                      {parse(data?.description?.substring(0, 400) + " ....")}
                    </p>
                    {url && (
                      <Link to={url}>
                        <button className="btn-view-more">More Details</button>
                      </Link>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="row ">
                  <div className="col-8">
                    <h1 className="title-project-month">{data?.name}</h1>
                    <p className="project-details text-justify">
                      {parse(data?.description?.substring(0, 400) + " ....")}
                    </p>
                    <div className="row">
                      {/* <div className="col-6">
                        <button
                          onClick={() =>
                            history.push(
                              `/country/${codeCountry}/learn-more-article`
                            )
                          }
                          type="button"
                          className="btn btn-view-more"
                        >
                          More Details
                        </button>{" "}
                      </div> */}
                      <div className="col-12 mt-2">
                        {url && (
                          <Link to={url}>
                            <button className="btn-view-more">
                              More Details
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>{" "}
                  </div>
                  <div className="col-4">
                    <img
                      className="project-month-img"
                      alt="project of the month"
                      src={urlImageAdapter(data?.image_url)}
                    />
                  </div>
                </div>
              </>
            )
          ) : (
            <>
              <div className="row">
                <div className="col-12">
                  <h1 className="title-project-month">{data?.name}</h1>
                </div>
                <div className="col-12 mt-3">
                  <img
                    className="project-month-img"
                    alt="project of the month"
                    src={urlImageAdapter(data?.image_url)}
                  />
                </div>
                <div className="col-12 mt-4">
                  <p className="project-details text-justify">
                    {parse(data?.description?.substring(0, 400) + " ....")}
                  </p>
                </div>
                <div className="col-12 mt-2">
                  {url && (
                    <Link to={url}>
                      <button className="btn-view-more">More Details</button>
                    </Link>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CardInfo;
