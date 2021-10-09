import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardInfoDetails from "../../components/aidchannel/general/CardInfoDetails";
import { Link } from "react-router-dom";
import CountryHeader from "../../components/layout/header/CountryHeader";
import PublicFooter from "../../components/layout/footer/PublicFooter";

const LearnMoreArticle = (props) => {
  const { codeCountry } = useParams();

  const article = {
    name: "WOMEN ACHIEVING THEIR DREAMS",
    description:
      "PARTNERSHIPS AND PROJECTS Family Planning: Partnerships Partnerships The U.S. Agency for International Development (USAID) works with a wide range of public and private partners to accelerate development  and ensure we are using resources efficiently. USAID’s partnerships promote PARTNERSHIPS AND PROJECTS Family Planning: Partnerships Partnerships The U.S. Agency for International Development (USAID) works with a wide range of public and private partners to accelerate development  and ensure we are using resources efficiently. USAID’s partnerships promote PARTNERSHIPS AND PROJECTS Family Planning: Partnerships Partnerships The U.S. Agency for International Development (USAID) works with a wide range of public and private partners to accelerate development  and ensure we are using resources efficiently. USAID’s partnerships promote PARTNERSHIPS AND PROJECTS Family Planning: Partnerships Partnerships The U.S. Agency for International Development (USAID) works with a wide range of public and private partners to accelerate development  and ensure we are using resources efficiently. USAID’s partnerships promote PARTNERSHIPS AND PROJECTS Family Planning: Partnerships Partnerships The U.S. Agency for International Development (USAID) works with a wide range of public and private partners to accelerate development  and ensure we are using resources efficiently. USAID’s partnerships promote ...",
    image_url:
      "https://share.america.gov/wp-content/uploads/2021/03/USAID-Women-Leaders-Climate-Crisis-49534646426_44e4a8da7c_o.jpg",
  };

  return (
    <>
      <CountryHeader />
      <div className="container">
        <h1 className="heading_background  mt-5 mb-5 pb-3 pt-3">
          Article<span className="sub-heading"> details</span>
        </h1>
        <CardInfoDetails data={article} />
      </div>
      <div className="row">
        <Link to={`/country/${codeCountry}`}>
          <button className="btn-view-more">Go Back</button>
        </Link>
      </div>
      <PublicFooter />
    </>
  );
};

export default LearnMoreArticle;
