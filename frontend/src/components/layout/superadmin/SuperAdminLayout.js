import sideBarSuperAdminData from "helpers/sideBarSuperAdminData";
import React from "react";
import SideBarAdmin from "../../aidchannel/general/SideBarAdmin";

const SuperAdminLayout = (props) => {
  return (
    <div>
      <SideBarAdmin sideBarItems={sideBarSuperAdminData} />
      <div className="col-11 mt-5 ml-5">{props.children}</div>
    </div>
  );
};

export default SuperAdminLayout;
