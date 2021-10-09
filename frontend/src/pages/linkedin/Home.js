import Feed from "components/linkedin/feed/Feed";
import Header from "components/linkedin/header/Header";
import Sidebar from "components/linkedin/sidebar/Sidebar";
import Widgets from "components/linkedin/widget/Widgets";
import React from "react";

const Home = () => {
  return (
    <div className="app">
      <Header />
      <div className="app__body">
        <div className="row">
          <div className="col-12 col-md-3">
            <Sidebar />
          </div>
          <div className="col-12 col-md-6 d-none d-md-block">
            <Feed />
          </div>
          <div className="col-12 col-md-3 d-none d-md-block">
            <Widgets />
          </div>
          <div className="col-12 col-md-6 d-block d-md-none">
            {" "}
            <Widgets />
          </div>
          <div className="col-12 col-md-3 d-block d-md-none">
            <Feed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
