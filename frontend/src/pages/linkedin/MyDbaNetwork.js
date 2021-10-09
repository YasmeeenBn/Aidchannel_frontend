import Feed from "components/linkedin/feed/Feed";
import Header from "components/linkedin/header/Header";
import NetworkGraph from "components/linkedin/networkGraph/NetworkGraph";
import Sidebar from "components/linkedin/sidebar/Sidebar";
import Widgets from "components/linkedin/widget/Widgets";
import React from "react";

const MyDbaNetwork = () => {
  return (
    <div>
      <Header />
      <div className=" container my-5">
        <div className="row">
          <div className="col-12 col-md-3">
            <Sidebar />
          </div>
          <div className="col-12 col-md-6 d-none d-md-block">
            <div className="border">
              <NetworkGraph />
            </div>
          </div>
          <div className="col-12 col-md-3 d-none d-md-block">
            <Widgets />
          </div>
          <div className="col-12 col-md-6 d-block d-md-none">
            {" "}
            <Widgets />
          </div>
          <div className="col-12 col-md-3 d-block d-md-none">
            <div className="border">hh</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDbaNetwork;
