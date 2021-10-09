import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getProjectsOfMonthApi } from "../../apis/projectApi";
import { getExpertsofMonth } from "../../apis/userApi";
import {
  getDonorsOfMonth,
  getImplementersOfMonth,
} from "../../apis/organizationApi";

import ProjectCard from "../../components/aidchannel/project/ProjectCard";
import ExpertCard from "../../components/aidchannel/expert/ExpertCard";
import OrganizationCard from "../../components/aidchannel/organization/OrganizationCard";
import PublicHeader from "../../components/layout/header/PublicHeader";
import PublicFooter from "../../components/layout/footer/PublicFooter";
import PublicFooterHomepage from "components/layout/footer/PublicFooterHomepage";

const Index = () => {
  const [projects, setProjects] = useState();
  const [experts, setExperts] = useState();
  const [donors, setDonors] = useState();
  const [implementers, setImplementers] = useState();

  const history = useHistory();

  useEffect(() => {
    getDataFromApi();
  }, []);

  const getDataFromApi = async () => {
    const proj = await getProjectsOfMonthApi(3, 1);
    setProjects(proj?.data);
    const exper = await getExpertsofMonth(3, 1);
    setExperts(exper);
    const donor = await getDonorsOfMonth(3, 1, "");
    setDonors(donor?.data);
    const imple = await getImplementersOfMonth(3, 1);
    setImplementers(imple?.data);
  };

  return (
    <>
      <PublicHeader />
      <div style={{ minHeight: "100vh" }}>
        {projects && experts && donors && implementers && (
          <div className="container my-5">
            <h1 className="heading mt-5">
              Projects<span className="sub-heading"> of the month</span>
            </h1>
            <div className="row">
              {projects?.map((project, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4 my-4">
                  <ProjectCard project={project} key={index} />
                </div>
              ))}
            </div>
            <button
              onClick={() => history.push("/view-more-project-month")}
              type="button"
              className="btn btn-view-more"
            >
              View More
            </button>
            <h1 className="heading mt-5">
              Experts<span className="sub-heading"> of the month</span>
            </h1>
            <div className="row">
              {experts?.map((expert, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4 my-4">
                  <ExpertCard expert={expert} key={index} />
                </div>
              ))}
            </div>

            <button
              onClick={() => history.push("/view-more-expert-month")}
              type="button"
              className="btn btn-view-more"
            >
              View More
            </button>
            <h1 className="heading mt-5">
              Donors<span className="sub-heading"> of the month</span>
            </h1>
            <div className="row">
              {donors?.map((donor, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4 my-4">
                  <OrganizationCard organization={donor} key={index} />
                </div>
              ))}
            </div>
            <button
              onClick={() => history.push("/view-more/donors/month")}
              type="button"
              className="btn btn-view-more"
            >
              View More
            </button>
            <h1 className="heading mt-5">
              Implementers<span className="sub-heading"> of the month</span>
            </h1>
            <div className="row">
              {implementers?.map((implementer, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4 my-4">
                  <OrganizationCard organization={implementer} key={index} />
                </div>
              ))}
            </div>
            <button
              onClick={() => history.push("/view-more/implementers/month")}
              type="button"
              className="btn btn-view-more"
            >
              View More
            </button>
          </div>
        )}
      </div>
      <PublicFooterHomepage />
    </>
  );
};

export default Index;
