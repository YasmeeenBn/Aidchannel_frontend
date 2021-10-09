import React, { useState, useEffect } from "react";

import { Link, useParams, useHistory } from "react-router-dom";
import "./PublicFooter.css";


import { getThematiques } from "../../../apis/thematiqueApi";

import { getDonorsApi, getImplementersApi } from "apis/organizationApi";
const PublicFooter = () => {
  const [thematics, setThematics] = useState([]);
  const [donors, setDonors] = useState([]);
  const [implementers, setImplementers] = useState([]);
  const { codeCountry } = useParams();

  const history = useHistory();
  useEffect(() => {
    getDataFromApi();
  }, [codeCountry]);

  const getDataFromApi = async () => {
    const thematic = await getThematiques();
    setThematics(thematic);
    const donor = await getDonorsApi(codeCountry);
    setDonors(donor);
    const implementer = await getImplementersApi(codeCountry);
    setImplementers(implementer);
  };
  return (
    <div className="public-footer">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-2 "></div>
          <div className="col-md-4">
            <ul className="list">
              <li
                className="mb-4"
                style={{ fontSize: "20px", color: "#f9b934" }}
              >
                By Thematics
              </li>

              {thematics?.map((thematic, index) => (
                <li key={index}>
                  <Link
                    className="items"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                    to={`/projectsbyThematic/${thematic._id}/${codeCountry}`}
                  >
                    {thematic.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-md-3">
            <ul className="list">
              <li
                className="mb-4"
                style={{ fontSize: "20px", color: "#f9b934" }}
              >
                By Donors
              </li>

              {donors?.map((donor, index) => (
                <li key={index}>
                  <Link
                    className="items"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                    to={`/projectsByDonors/${donor._id}/${codeCountry}`}
                  >
                    {donor.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-md-3">
            <ul className="list">
              <li
                className="mb-4"
                style={{ fontSize: "20px", color: "#f9b934" }}
              >
                By Implementers
              </li>

              {implementers?.map((implementer, index) => (
                <li key={index}>
                  <Link
                    className="items"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                    to={`/projectsByImplementers/${implementer._id}/${codeCountry}`}
                  >
                    {implementer.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicFooter;
