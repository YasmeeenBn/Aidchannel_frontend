import PublicFooterHomepage from "components/layout/footer/PublicFooterHomepage";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getOrganization } from "../../apis/organizationApi";
import { getProjectByFunder } from "../../apis/projectApi";
import OrganizationDetailsBody from "../../components/aidchannel/organization/OrganizationDetailsBody";
import OrganizationDetailsHeader from "../../components/aidchannel/organization/OrganizationDetailsHeader";
import ProjectCard from "../../components/aidchannel/project/ProjectCard";
import PublicFooter from "../../components/layout/footer/PublicFooter";
import PublicHeader from "../../components/layout/header/PublicHeader";

const OrganizationDetails = () => {
  const [organization, setOrganization] = useState();
  const [organizationProjects, setOrganizationProjects] = useState();

  const { organizationId } = useParams();

  const getDataFromApi = useCallback(async () => {
    const org = await getOrganization(organizationId);
    setOrganization(org);
    const projects = await getProjectByFunder(
      "60c7344a1fabf71db04496db",
      12,
      1
    );
    setOrganizationProjects(projects?.data);
  }, [organizationId]);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  return (
    <>
      <PublicHeader />
      {organization && organizationProjects && (
        <div className="container">
          <OrganizationDetailsHeader organization={organization} />
          <OrganizationDetailsBody organization={organization} />
          <h1 className="heading mt-5">
            Last<span className="sub-heading"> Projects</span>
          </h1>
          <div className="row">
            {organizationProjects?.map((project, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4 my-4">
                <ProjectCard project={project} key={index} />
              </div>
            ))}
          </div>
        </div>
      )}
      <PublicFooterHomepage />
    </>
  );
};

export default OrganizationDetails;
