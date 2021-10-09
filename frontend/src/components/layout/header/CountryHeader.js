import React, { useState, useEffect, Suspense, Spinner  } from "react";
import Flag from "react-world-flags";
import { Link, useParams, useHistory } from "react-router-dom";
import "./CountryHeader.css";
import { getThematiques } from "../../../apis/thematiqueApi";

import { getDonorsApi, getImplementersApi } from "apis/organizationApi";

const CountryHeader = () => {
  const [thematics, setThematics] = useState([]);
  const [donors, setDonors] = useState([]);
  const [implementers, setImplementers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchDonor, setSearchDonor] = useState("");
  global.searchDonor =""
  const [searchImplementer, setSearchImplementer] = useState("");
  global.searchImplementer =""
  const [charging, setCharging] = useState(false);
  const { codeCountry, id } = useParams();

  const history = useHistory();

  useEffect(() => {
    setCharging(true)
    getDataFromApi();
    setCharging(false)
  }, [codeCountry]);

  const getDataFromApi = async () => {
    const thematic = await getThematiques();
    setThematics(thematic);
    const donor = await getDonorsApi(codeCountry,"");
    setDonors(donor);
    const implementer = await getImplementersApi(codeCountry,"");
    setImplementers(implementer);
  };
  console.log(donors);
  return (
    <div className="nav-border">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light backgroud-color">
          <Link to={`/country/${codeCountry}`} className="navbar-brand">
            <Flag
              code={codeCountry}
              height="40"
              style={{ marginRight: "2px" }}
              className="flag"
            />
            <img
              alt="logo"
              src="/assets/logo.png"
              width="80px"
              className="logo-country"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <Link
                  to="/"
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  By Thematics
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{height: '250px',width: '300px', overflow: 'scroll'}}>
                  {thematics?.map((thematic, index) => (
                    <Link
                      key={index}
                      to={`/projectsbyThematic/${thematic._id}/${codeCountry}`}
                      className="dropdown-item"
                    >
                      {thematic.name}
                    </Link>
                  ))}
                </div>
              </li>
              <li className="nav-item dropdown">
                <Link
                  to="/"
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  By Donors
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{height: '250px',width: '300px', overflow: 'scroll'}}>
                <input
                  onChange={async (e) => {
                    setCharging(true)
                    setSearchDonor(e.target.value)
                    global.searchDonor=e.target.value
                    const donor = await getDonorsApi(codeCountry, global.searchDonor);
                    setDonors(donor)
                    setCharging(false)
                  console.log(global.searchDonor)}}
                  value={searchDonor}
                  type="text"
                  className="form-control input-search-country"
                  placeholder="Search for Donors"
                  style={{ width: "100%" }}
                />
                {charging && <div >Charging...</div>}
                  {!charging && donors?.map((donor, index) => {
                    return (
                      <Link
                        key={index}
                        to={`/projectsByDonors/${donor._id}/${codeCountry}`}
                        className="dropdown-item"
                      >
                        {donor.name}
                      </Link>
                    );
                  })}
                </div>
                
              </li>
              <li className="nav-item dropdown">

                <Link
                  to="/"
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  By Implementers
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{height: '250px',width: '300px', overflow: 'scroll'}}>
                <input
                  onChange={async (e) => {setCharging(true)
                    setSearchImplementer(e.target.value)
                    global.searchImplementer=e.target.value
                    const Implementer = await getImplementersApi(codeCountry, global.searchImplementer);
                    setImplementers(Implementer)
                    setCharging(false)
                  console.log(global.searchImplementer)}}
                  value={searchImplementer}
                  type="text"
                  className="form-control input-search-country"
                  placeholder="Search for Implementers"
                  style={{ width: "100%" }}
                />
                {charging && <div >Charging...</div>}
                  {!charging && implementers?.map((implementer, index) => (
                    <Link
                      key={index}
                      to={`/projectsByImplementers/${implementer._id}/${codeCountry}`}
                      className="dropdown-item"
                    >
                      {implementer.name}
                    </Link>
                    
                  ))}
                </div>
              </li>
            </ul>
            <form
              onSubmit={() =>
                history.push(`/projects/${codeCountry}/${searchText}`)
              }
              className="form-inline my-2 my-lg-0  mx-2 form-search-country"
            >
              <div className="form-group has-search div-form-country">
                <span className="fa fa-search form-control-feedback"></span>
                <input
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  type="text"
                  className="form-control input-search-country"
                  placeholder="Search for the project"
                  style={{ width: "100%" }}
                />
              </div>
            </form>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <button className="btn-login">Login</button>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};
export default CountryHeader;
