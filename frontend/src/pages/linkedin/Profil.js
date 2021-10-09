import React from "react";
import ProfilHeader from "components/linkedin/profilHeader/ProfilHeader";
import Header from "components/linkedin/header/Header";
import Widgets from "components/linkedin/widget/Widgets";

const Profil = () => {
  
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8">
            <ProfilHeader />
          </div>
          <div className="col-12 col-md-4  mt-4">
            <Widgets />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profil;
