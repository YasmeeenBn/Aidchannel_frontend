import React from "react";
import sideBarWebMasterData from "../../../helpers/sideBarWebMasterData";
import SideBar from "../../aidchannel/general/SideBar";

const WebMasterLayout = (props) => {
  return (
    <div>
      <SideBar sideBarItems={sideBarWebMasterData} />
      <div className="col-11 mt-5 ml-5">{props.children}</div>
    </div>
  );
};

export default WebMasterLayout;
