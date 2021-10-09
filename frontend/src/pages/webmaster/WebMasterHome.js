import { getNumberArticlesByCountry } from "apis/articleApi";
import { getNumberTweetsByCountry } from "apis/twitterApi";
import { getNumberExperts } from "apis/userApi";
import { getNumberVideosByCountry } from "apis/youtubeApi";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Flag from "react-world-flags";
import { getNumberOrganizationsByCountry } from "../../apis/organizationApi";
import {
  getNumberProjectsByCountry,
  getNumberProjectsByCountryNULL,
} from "../../apis/projectApi";
import CounterDatavisualization from "../../components/aidchannel/general/CounterDatavisualization";

const WebMasterHome = () => {
  const { codeCountry } = useParams();
  const [numberProjects, setNumberProjects] = useState();
  const [numberOrganizations, setNumberOrganizations] = useState();
  const [numberVideos, setNumberVideos] = useState();
  const [numberTweets, setNumberTweets] = useState();
  const [numberArticles, setnumberArticles] = useState();
  const [numberExperts, setnumberExperts] = useState();
  const getDataFromApi = useCallback(async () => {
    const numberProj = await getNumberProjectsByCountry(codeCountry);
    setNumberProjects(numberProj);

    const numberOrg = await getNumberOrganizationsByCountry(codeCountry);
    setNumberOrganizations(numberOrg);
    const numberVideos = await getNumberVideosByCountry(codeCountry);
    setNumberVideos(numberVideos);
    const numberTweets = await getNumberTweetsByCountry(codeCountry);
    setNumberTweets(numberTweets);
    const numberArticles = await getNumberArticlesByCountry(codeCountry);
    setnumberArticles(numberArticles);
    const numberExperts = await getNumberExperts();
    setnumberExperts(numberExperts);
  }, [codeCountry]);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  return (
    <div className="container">
      <h1>
        <Flag
          code={codeCountry}
          height="70"
          width="70"
          style={{ marginRight: "2px" }}
          className="flag"
        />{" "}
        Dashboard
      </h1>
      <hr />
      <div className="row mt-5">
        <div className="col-12 col-sm-6 col-md-4 mt-3">
          <CounterDatavisualization
            value={"0" + numberProjects}
            route={`/web-master/projects/${codeCountry}`}
            title="Projects"
            bgColor="#0069d9"
            textColor="white"
            duration="1"
          />
        </div>
        <div className="col-12 col-sm-6 col-md-4 mt-3">
          <CounterDatavisualization
            value={"0" + numberOrganizations}
            route={`/web-master/organizations/${codeCountry}`}
            title="Local organizations "
            bgColor="#0069d9"
            textColor="white"
            duration="1"
          />
        </div>
        <div className="col-12 col-sm-6 col-md-4 mt-3">
          <CounterDatavisualization
            value={"0" + numberVideos}
            route={`/web-master/validation/youtube/${codeCountry}`}
            title="Youtube videos"
            bgColor="#0069d9"
            textColor="white"
            duration="1"
          />
        </div>
        <div className="col-12 col-sm-6 col-md-4 mt-3">
          <CounterDatavisualization
            value={"0" + numberTweets}
            route={`/web-master/validation/twitter/${codeCountry}`}
            title="Tweets"
            bgColor="#0069d9"
            textColor="white"
            duration="1"
          />
        </div>
        <div className="col-12 col-sm-6 col-md-4 mt-3">
          <CounterDatavisualization
            value={"0" + numberArticles}
            route={`/web-master/validation/articles/${codeCountry}`}
            title="Articles"
            bgColor="#0069d9"
            textColor="white"
            duration="1"
          />
        </div>
        <div className="col-12 col-sm-6 col-md-4 mt-3">
          <CounterDatavisualization
            value={"0" + numberExperts}
            route={`/web-master/experts/${codeCountry}`}
            title="Experts"
            bgColor="#0069d9"
            textColor="white"
            duration="1"
          />
        </div>
      </div>
    </div>
  );
};

export default WebMasterHome;
