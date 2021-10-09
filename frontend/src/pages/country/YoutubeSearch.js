import React, { useState, useRef, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router";
import useIntersectionObserver from "../../helpers/useIntersectionObserver";
import InputSearch from "../../components/aidchannel/general/InputSearch";
import PublicFooter from "../../components/layout/footer/PublicFooter";
import YoutubeVideo from "../../components/aidchannel/youtubeVideos/YoutubeVideo";
import CountryHeader from "../../components/layout/header/CountryHeader";
import { getVideosbyChannelName } from "apis/youtubeApi";

const YoutubeSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [limit] = useState(9);

  const { codeCountry, search_text } = useParams();

  const loadMoreButtonRef = useRef();

  useEffect(() => {
    setSearchText(search_text);
  }, [search_text]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [searchText, limit, codeCountry],
    getVideosbyChannelName,
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
          Videos of 
          <span className="sub-heading"> {searchText} </span>
        </h1>

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

export default YoutubeSearch;
