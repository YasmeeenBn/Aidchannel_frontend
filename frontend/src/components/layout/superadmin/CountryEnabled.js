import React, { useState } from "react";
import sideBarWebMasterData from "../../../helpers/sideBarWebMasterData";
import SideBar from "../../aidchannel/general/SideBar";
import Flag from "react-world-flags";
import { useParams, Link } from "react-router-dom";

const CountryEnabled = (props) => {
  const { codeCountry } = useParams();
  const [active, setActive] = useState("CountryEnabled");
  return (
    <div>
      <SideBar sideBarItems={sideBarWebMasterData} />
      <div className="col-11 mt-5 ml-5">
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
                  onClick={() => setActive("CountryEnabled")}
                  to={`/super-admin/countries/ListCountryEnabled/${codeCountry}`}
                  className={`nav-link ${active === "CountryEnabled" &&
                    "active"}`}
                >
                  Countries Enabled
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={() => setActive("CountryDisabled")}
                  to={`/super-admin/countries/ListCountryDisabled/${codeCountry}`}
                  className={`nav-link ${active === "CountryDisabled" &&
                    "active"}`}
                >
                  Countries Disabled
                </Link>
              </li>
            </ul>
          </>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default CountryEnabled;
