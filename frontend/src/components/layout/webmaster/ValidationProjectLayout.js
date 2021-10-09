// import React, { useState } from "react";
// import sideBarWebMasterData from "../../../helpers/sideBarWebMasterData";
// import SideBar from "../../aidchannel/general/SideBar";
// import Flag from "react-world-flags";
// import { useParams, Link } from "react-router-dom";

// const ValidationProjectLayout = (props) => {
//   const { codeCountry } = useParams();
//   const [active, setActive] = useState("twitter");
//   return (
//     <div>
//       <SideBar sideBarItems={sideBarWebMasterData} />
//       <div className="col-11 mt-5 ml-5">
//         <div className="container">
//           <>
//             <h1>
//               <Flag
//                 code={codeCountry}
//                 height="70"
//                 width="70"
//                 style={{ marginRight: "2px" }}
//                 className="flag"
//               />{" "}
//               Validation projects
//             </h1>
//             <ul className="nav nav-tabs">
//               <li className="nav-item">
//                 <Link
//                   onClick={() => setActive("projectsNv")}
//                   to={`/web-master/validationProjects/projectsNv/${codeCountry}`}
//                   className={`nav-link ${active === "projectsNv" && "active"}`}
//                 >
//                   Projects Scrapped
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link
//                   onClick={() => setActive("projectsV")}
//                   to={`/web-master/validationProjects/projectsV/${codeCountry}`}
//                   className={`nav-link ${active === "projectsV" && "active"}`}
//                 >
//                   Valid Projects
//                 </Link>
//               </li>
//             </ul>
//           </>
//         </div>
//         {props.children}
//       </div>
//     </div>
//   );
// };

// export default ValidationProjectLayout;
