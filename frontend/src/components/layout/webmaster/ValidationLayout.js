// import React, { useState } from "react";
// import sideBarWebMasterData from "../../../helpers/sideBarWebMasterData";
// import SideBar from "../../aidchannel/general/SideBar";
// import Flag from "react-world-flags";
// import { useParams, Link } from "react-router-dom";

// const ValidationLayout = (props) => {
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
//               Validation
//             </h1>
//             <ul className="nav nav-tabs">
//               <li className="nav-item">
//                 <Link
//                   onClick={() => setActive("twitter")}
//                   to={`/web-master/validation/twitter/${codeCountry}`}
//                   className={`nav-link ${active === "twitter" && "active"}`}
//                 >
//                   Twitter
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link
//                   to={`/web-master/validation/youtube/${codeCountry}`}
//                   onClick={() => setActive("youtube")}
//                   className={`nav-link ${active === "youtube" && "active"}`}
//                 >
//                   Youtube
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link
//                   to={`/web-master/validation/articles/${codeCountry}`}
//                   onClick={() => setActive("articles")}
//                   className={`nav-link ${active === "articles" && "active"}`}
//                 >
//                   Articles
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

// export default ValidationLayout;
