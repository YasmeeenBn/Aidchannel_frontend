import React from "react";
import { useParams, Link } from "react-router-dom";
import Flag from "react-world-flags";
import ListCountryDisabled from "./ListCountryDisabled";

const ListCountryEnabled = (props) => {
  const { codeCountry, multimedia } = useParams();

  return (
    <div>
      <div className="container">
        <>
          <h1>
            <Flag
              code={codeCountry}
              height="70"
              width="70"
              style={{ marginRight: "2px" }}
              className="flag"
            />{" "}
            Countries
          </h1>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link
                to={`/super-admin/countries/ListCountryEnabled/${codeCountry}`}
                className={`nav-link ${multimedia === "CountryEnabled" &&
                  "active"}`}
              >
                Countries Enabled
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/super-admin/countries/ListCountryDisabled/${codeCountry}`}
                className={`nav-link ${multimedia === "CountryDisabled" &&
                  "active"}`}
              >
                Countries Disabled
              </Link>
            </li>
          </ul>
        </>

        {multimedia === "CountryEnabled" && <ListCountryDisabled />}
        {multimedia === "CountryDisabled" && <ListCountryDisabled />}
      </div>
    </div>
  );
};

export default ListCountryEnabled;
