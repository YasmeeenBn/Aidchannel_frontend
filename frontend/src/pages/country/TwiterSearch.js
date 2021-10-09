import React, { useState, useRef, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router";
import useIntersectionObserver from "../../helpers/useIntersectionObserver";

import PublicFooter from "../../components/layout/footer/PublicFooter";
import YoutubeVideo from "../../components/aidchannel/youtubeVideos/YoutubeVideo";
import CountryHeader from "../../components/layout/header/CountryHeader";
import Post from "../../components/aidchannel/tweets/Post";
import { getTweetsByName } from "apis/twitterApi";

const TwiterSearch = () => {
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
    getTweetsByName,
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
         Tweets with the name
          <span className="sub-heading"> {searchText} </span>
        </h1>

        <div className="row">
          {data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((tweet, index) => (
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

export default TwiterSearch;
