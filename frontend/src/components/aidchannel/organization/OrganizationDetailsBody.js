import React, { useState, useEffect, useCallback } from "react";
import Flag from "react-world-flags";
import parse from "html-react-parser";
import "./OrganizationDetailsBody.css";

const OrganizationDetailsBody = ({ organization }) => {
  const [allCountries, setAllCountries] = useState([]);
  const [displedCountries, setDispledCountries] = useState([]);
  const [isAllCountries, setIsAllCountries] = useState(false);
  const [countriesLengthInf6, setCsountriesLengthInf6] = useState(false);

  const setData = useCallback(() => {
    if (organization?.countries_with_offices?.length <= 16) {
      setIsAllCountries(true);
      setCsountriesLengthInf6(true);
    }
    setAllCountries(
      organization.countries_with_offices?.sort(function(a, b) {
        return a.name.localeCompare(b.name);
      })
    );
    const dispCountries = organization?.countries_with_offices
      ?.sort(function(a, b) {
        return a.name.localeCompare(b.name);
      })
      ?.filter((country, index) => index < 16);
    setDispledCountries(dispCountries);
  }, [organization]);

  useEffect(() => {
    setData();
  }, [setData]);

  return (
    <div className="mt-5">
      {organization ? (
        <>
          <div className="row">
            <div className="col-12 col-md-8">
              <h1 className="section-title  mb-5">Description</h1>
              <span className="text-justify">
                {parse(String(organization.description))}
              </span>
            </div>
            <div className="col-12 col-md-4">
              <div className="col-12 ">
                <h1 className="section-title mb-5">Organization types</h1>
                <ul className="list-unstyled">
                  {organization.organization_types?.map((type, index) => {
                    return (
                      <li key={index}>
                        <img
                          style={{ width: "34px" }}
                          alt="yellow icon"
                          src="/assets/icons/yellow.svg"
                        />{" "}
                        <span className="ml-4">{type.name}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="col-12 ">
                <h1 className="section-title my-5">Countries with offices</h1>
                <div className="container">
                  <div className="row">
                    {isAllCountries
                      ? allCountries?.map((country, index) => (
                          <div className="my-2 col-6" key={index}>
                            {" "}
                            <Flag
                              code={country.code}
                              height="30"
                              width="30"
                              style={{ marginRight: "2px" }}
                              className="flag"
                            />
                            <span className="font-weight-bold">
                              {country.name}
                            </span>
                          </div>
                        ))
                      : displedCountries?.map((country, index) => (
                          <div className="my-2 col-6" key={index}>
                            {" "}
                            <Flag
                              code={country.code}
                              height="30"
                              width="30"
                              style={{ marginRight: "2px" }}
                              className="flag"
                            />
                            <span className="font-weight-bold">
                              {country.name}
                            </span>
                          </div>
                        ))}
                  </div>
                  {!countriesLengthInf6 && (
                    <button
                      className="btn-view-more mt-3"
                      onClick={() => setIsAllCountries(!isAllCountries)}
                    >
                      {!isAllCountries ? "Show more" : "Show less"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default OrganizationDetailsBody;
