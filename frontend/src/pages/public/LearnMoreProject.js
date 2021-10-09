import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CountryHeader from "../../components/layout/header/CountryHeader";
import { getProject2 } from "../../apis/projectApi";
import PublicHeader from "../../components/layout/header/PublicHeader";
import PublicFooter from "../../components/layout/footer/PublicFooter";
import ProjectDetailHeader from "../../components/aidchannel/project/ProjectDetailHeader";
import ProjectDetailSide from "../../components/aidchannel/project/ProjectDetailSide";
import PublicFooterHomepage from "components/layout/footer/PublicFooterHomepage";

const LearnMoreProject = () => {
  const { project_id, multimedia } = useParams();

  const [project, setProject] = useState({});

  const history = useHistory();

  const getDataFromApi = useCallback(async () => {
    const project = await getProject2(project_id);
    setProject(project);
  }, [project_id]);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  return (
    <>
      <div>
        <CountryHeader />

        <ProjectDetailHeader project={project} />
        <div className="container my-5">
          <ProjectDetailSide project={project} />
        </div>

        <div className="container my-5">
          <button
            onClick={() => history.push(`/projectdetails/${project_id}/more`)}
            type="button"
            className="btn btn-view-more"
          >
            Show More Details
          </button>
        </div>

        <PublicFooterHomepage />
      </div>
    </>
  );
};

export default LearnMoreProject;
