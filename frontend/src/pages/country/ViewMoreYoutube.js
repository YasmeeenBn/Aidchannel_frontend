import React, { useState, useRef, useEffect, useCallback } from "react";
import { useInfiniteQuery } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import   "../../components/aidchannel/general/InputSearch.css";
import PublicHeader from "../../components/layout/header/PublicHeader";
import PublicFooter from "../../components/layout/footer/PublicFooter";
import { getAllTweetsByCountryPagination } from "../../apis/twitterApi";
import useIntersectionObserver from "../../helpers/useIntersectionObserver";
import YoutubeVideo from "../../components/aidchannel/youtubeVideos/YoutubeVideo";
import {
  getAllVideosByCountryPagination,
  getVideoAccepted,
  getVideosByCountry,
  getVideosScrolling,
} from "../../apis/youtubeApi";
import InputSearch from "../../components/aidchannel/general/InputSearch";
import CountryHeader from "components/layout/header/CountryHeader";
const ViewMoreYoutube = () => {
  const [searchText, setSearchText] = useState("");
  const { codeCountry } = useParams();

  const [limit] = useState(9);
  const loadMoreButtonRef = useRef();
  const [test, setTest] = useState(false);

  const {

    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [searchText, codeCountry,limit, test],
    getVideosScrolling,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.data.length === limit) return parseInt(lastPage.page) + 1;
        return false;
      },
    }
  );
  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });



  return (
    <>
      <CountryHeader />
      <div className="container">
        <h1 className="heading my-4">
          More Youtube
          <span className="sub-heading"> Videos </span>
        </h1>
        <InputSearch
          setSearchText={setSearchText}
          searchText={searchText}
          placeholder={`Search for videos`}
        />
        <div className="row">
          {data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((video, index) => (
                <div key={index} className="mt-0 border p-3 m-2">
                  <YoutubeVideo url={video?.video_url} />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        <div style={{ marginTop: "20px" }}>
          <button
            ref={loadMoreButtonRef}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more ...."
              : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
          </button>
        </div>
      </div>
      <PublicFooter />
    </>
  );
};

export default ViewMoreYoutube;
