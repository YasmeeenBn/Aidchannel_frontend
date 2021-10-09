import React, { useState, useEffect } from "react";
import Flag from "react-world-flags";
import { Link, useParams, useHistory } from "react-router-dom";
import "./PublicFooter.css";
import { getEnabledCountries } from "../../../apis/countryApi";

import { getDonorsApi, getImplementersApi } from "apis/organizationApi";
const PublicFooterHomepage = () => {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");

  let history = useHistory();

  useEffect(() => {
    getDataFromApi();
  }, []);

  const getDataFromApi = async () => {
    const enabeledCountries = await getEnabledCountries();
    setCountries(enabeledCountries);
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
                Countries Enabled
              </li>

              {countries?.map((country, index) => (
                <li>
                  <Link
                    to={`/country/${country.code}`}
                    className="dropdown-item"
                    className="items"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                    key={index}
                  >
                    <Flag
                      code={country.code}
                      height="12"
                      style={{ marginRight: "5px" }}
                    />{" "}
                    {country.name}
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

export default PublicFooterHomepage;
