import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  getOneProjectOfMonthByCountryApi,
  getProjectsOfMonthApi,
} from "../../apis/projectApi";
import YoutubeVideo from "../../components/aidchannel/youtubeVideos/YoutubeVideo";
import Tweets from "../../components/aidchannel/tweets/Tweets";
import CardInfo from "../../components/aidchannel/general/CardInfo";
import CardInfo2 from "../../components/aidchannel/general/CardInfo2";
import CountryHeader from "../../components/layout/header/CountryHeader";
import PublicFooter from "../../components/layout/footer/PublicFooter";
import {
  getAcceptedVideosByCountryLimit,
  getVideosByCountry,
} from "../../apis/youtubeApi";
import { useHistory } from "react-router-dom";
import {
  getAcceptedTweetsByCountry,
  getAllTweetsByCountryPagination,
} from "apis/twitterApi";
import useIntersectionObserver from "../../helpers/useIntersectionObserver";
import { useInfiniteQuery } from "react-query";
import Post from "../../components/aidchannel/tweets/Post";
import {
  getArticleAcceptedByCountry,
  getArticlesByCountry,
} from "apis/articleApi";
import ArticleCard from "components/aidchannel/articles/ArticleCard";
const HomeCountry = (props) => {
  const [project, setProject] = useState();
  const [article, setArticles] = useState();
  const [expert, setExpert] = useState();
  const [tweets, setTweets] = useState();
  const [videos, setVideos] = useState();
  const history = useHistory();
  const [limit] = useState(4);
  const loadMoreButtonRef = useRef();
  const { codeCountry } = useParams();

  const getDataFromApi = useCallback(async () => {
    const proj = await getOneProjectOfMonthByCountryApi(codeCountry);
    setProject(proj);
    const videos = await getAcceptedVideosByCountryLimit(codeCountry, 4);
    setVideos(videos);
    const article = await getArticleAcceptedByCountry(codeCountry, 3, 1);
    setArticles(article);
    const tweets = await getAcceptedTweetsByCountry(codeCountry, 4);
    setTweets(tweets);
  }, [codeCountry]);

  useEffect(() => {
    getDataFromApi();
  }, [codeCountry, getDataFromApi]);

  return (
    <>
      <CountryHeader />
      <div className="container" style={{ minHeight: "100vh" }}>
        {project && (
          <>
            <h1 className="heading_background  mt-5 mb-5 pb-3 pt-3">
              Project<span className="sub-heading"> of the month</span>
            </h1>
            <CardInfo
              data={project}
              url={`/country/${codeCountry}/projectOfMonthDetails`}
              index={0}
            />
          </>
        )}

        {expert && (
          <>
            <h1 className="heading_background  mt-5 mb-5 pb-3 pt-3">
              Expert<span className="sub-heading"> of the month</span>
            </h1>
            <div className="col-6">
              <button
                onClick={() =>
                  history.push(
                    `/country/${codeCountry}/view-more-expert-article`
                  )
                }
                className="btn btn-view-more"
                style={{ marginTop: "10px" }}
              >
                More Experts
              </button>
            </div>
          </>
        )}
        {videos && (
          <>
            {" "}
            <h1 className="heading_background  mt-5 mb-5 pb-3 pt-3">
              Youtube<span className="sub-heading"> Videos</span>
            </h1>
            <div className="row">
              {videos?.map((video, index) => (
                <div key={index} className="col-12  col-md-6 pb-sm-5 ">
                  <YoutubeVideo key={index} url={video?.video_url} />
                </div>
              ))}
            </div>
            <div className="row">
              <div className="col-6 mt-1">
                <button
                  onClick={() =>
                    history.push(`/country/${codeCountry}/view-more-youtube`)
                  }
                  type="button"
                  className="btn btn-view-more"
                  style={{ marginTop: "10px", marginLeft: "30px" }}
                >
                  More Videos
                </button>{" "}
              </div>
            </div>
          </>
        )}
        {tweets && (
          <>
            <h1 className="container heading_background  mt-5 mb-5 pb-3 pt-3">
              Tweets<span className="sub-heading"> </span>
            </h1>
            <div className="row">
              {tweets?.map((tweet, index) => (
                <div
                  key={index}
                  className="col-12  p-2 col-lg-5 mx-auto mt-3 border"
                >
                  <a
                    style={{ textDecoration: "none" }}
                    href={`https://twitter.com/${tweet?.twitter_username}/status/${tweet?.tweet_id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Post
                      displayName={tweet?.name}
                      username={tweet?.twitter_username}
                      verified={true}
                      text={tweet?.body}
                      avatar={tweet?.avatar_id}
                      image={tweet?.photos?.length > 0 && tweet.photos[0]}
                    />
                  </a>
                </div>
              ))}
            </div>
            <div className="row">
              <div className="col-6">
                <button
                  onClick={() =>
                    history.push(`/country/${codeCountry}/view-more-tweet`)
                  }
                  type="button"
                  className="btn btn-view-more"
                  style={{ marginTop: "20px", marginLeft: "30px" }}
                >
                  More Tweets
                </button>
              </div>
            </div>
          </>
        )}
        {article && (
          <>
            <h1 className="container heading_background  mt-5 mb-5 pb-3 pt-3">
              Articles <span className="sub-heading"> Related</span>
            </h1>
            <div className="row">
              {article?.map((article, index) => (
                <div key={index} className="col-12  p-2  mt-3 border">
                  <ArticleCard article={article} key={index} />
                </div>
              ))}
            </div>
            <div className="row">
              <div className="col-6 my-2">
                <button
                  onClick={() =>
                    history.push(`/country/${codeCountry}/view-more-article`)
                  }
                  type="button "
                  className="btn btn-view-more "
                  style={{ marginTop: "10px" }}
                >
                  More Articles
                </button>{" "}
              </div>
            </div>
          </>
        )}
      </div>
      <PublicFooter />
    </>
  );
};

export default HomeCountry;
