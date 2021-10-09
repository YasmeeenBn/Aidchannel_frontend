import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getExpertArticleByIdExpert } from "../../apis/ExpertArticleApi";
import { getExpertDetails } from "../../../src/apis/userApi";
import PublicFooter from "../../components/layout/footer/PublicFooter";
import CardInfoExpert from "../../components/aidchannel/general/CardInfoExpert";
import ExpertDetailBody from "../../components/aidchannel/expert/ExpertDetailBody";
import PublicHeader from "components/layout/header/PublicHeader";
import PublicFooterHomepage from "components/layout/footer/PublicFooterHomepage";

const LearnMoreExpert = () => {
  const { expert_id } = useParams();

  const [expert, setExperts] = useState();
  const [article, setArticle] = useState();

  const getDataFromApi = useCallback(async () => {
    const article = await getExpertArticleByIdExpert(expert_id);
    setArticle(article);
    const expert = await getExpertDetails(expert_id);
    setExperts(expert);
  }, [expert_id]);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  return (
    <>
      <PublicHeader />
      <div className="container" style={{ minHeight: "100vh" }}>
        {expert && (
          <div className="row">
            <div className="col-12 ">
              <ExpertDetailBody expert={expert} />
            </div>
          </div>
        )}
        {article && expert && (
          <div className="container mt-5  ">
            <h1 className="heading_background  mt-5 mb-5 pb-3 pt-3">
              Expert's
              <span className="sub-heading"> Article</span>
            </h1>{" "}
            <CardInfoExpert data={article} />
          </div>
        )}
      </div>
      <PublicFooterHomepage />
    </>
  );
};

export default LearnMoreExpert;
