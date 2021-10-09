import React, { useState } from "react";
import sideBarWebMasterData from "../../../helpers/sideBarWebMasterData";
import SideBar from "../../aidchannel/general/SideBar";
import Flag from "react-world-flags";
import { useParams, Link } from "react-router-dom";

const TechnicalDetailsLayout = (props) => {
  const { codeCountry, idProject } = useParams();
  const [active, setActive] = useState("twitter");
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
              Technical Details
            </h1>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <Link
                  onClick={() => setActive("graph")}
                  to={`/web-master/technicaldetails/${codeCountry}/${idProject}`}
                  className={`nav-link ${active === "graph" && "active"}`}
                >
                  Graph
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={() => setActive("details")}
                  to={`/web-master/moredetailsproject/${codeCountry}/${idProject}`}
                  className={`nav-link ${active === "details" && "active"}`}
                >
                  More Details
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

export default TechnicalDetailsLayout;
