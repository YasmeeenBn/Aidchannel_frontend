import React, { useState, useEffect, useCallback } from "react";
import "./ExpertDetailBody.css";
import ReactDOM from "react-dom";
import "./ExpertDetailHeader.css";
import { CgWorkAlt } from "react-icons/cg";
import SimpleMap from "./SimpleMap";
import CardInfoExpert from "../general/CardInfoExpert";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getExpertArticleByIdExpert } from "../../../../src/apis/ExpertArticleApi";
import urlImageAdapter from "helpers/urlImageAdapter";

const ExpertDetailBody = ({ expert }) => {
  // const { expert_id } = useParams();

  // const [article, setArticle] = useState({});

  // const getDataFromApi = useCallback(async () => {
  //   const article = await getExpertArticleByIdExpert(expert_id);
  //   setArticle(article);
  // }, [article]);

  // useEffect(() => {
  //   getDataFromApi();
  // }, [getDataFromApi]);

  return (
    <>
      {expert && (
        <div className="mt-5">
          <div className="row">
            <div className="col-12 col-sm-6 justify-content-end">
              <h5
                style={{
                  color: "#3f51b5",
                  fontSize: "30px",
                  lineHeight: "150px",
                  fontWeight: "bold",
                }}
              >
                {expert?.fullname}
              </h5>
            </div>

            <img
              className="rounded-circle img-top"
              src={urlImageAdapter(expert?.image_url)}
              alt="Card cap"
            />
          </div>
          <div className="my-1 box-shadow-card-info p-1 row">
            <div className=" col-12 col-sm-6 ">
              <ul className="list-unstyled">
                <li
                  style={{
                    marginTop: "50px",
                  }}
                >
                  <img
                    style={{
                      width: "34px",
                    }}
                    alt="yellow icon"
                    src="/assets/icons/contact-icon-phone.png"
                  />{" "}
                  <span className="ml-4">{expert?.phone}</span>
                </li>
                <li
                  style={{
                    marginTop: "20px",
                  }}
                >
                  <img
                    style={{
                      width: "34px",
                    }}
                    alt="yellow icon"
                    src="/assets/icons/contact-icon-mail.png"
                  />{" "}
                  <span className="ml-4">{expert?.email}</span>
                </li>
                <li
                  style={{
                    marginTop: "20px",
                  }}
                >
                  <CgWorkAlt color="yellow" size="35" />
                  <span className="ml-4">{expert?.job_title}</span>
                </li>
              </ul>
            </div>{" "}
            <div className="col-12 col-sm-6 ">
              <ul className="list-unstyled">
                <li
                  style={{
                    marginTop: "50px",
                  }}
                >
                  <img
                    style={{
                      width: "34px",
                    }}
                    alt="yellow icon"
                    src="/assets/icons/contact-icon-pin.png"
                  />{" "}
                  <span className="ml-4">{`${expert?.country?.name}, ${expert?.adress}`}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpertDetailBody;
