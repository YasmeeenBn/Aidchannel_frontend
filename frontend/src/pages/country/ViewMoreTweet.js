import React, { useState, useRef, useEffect, useCallback } from "react";
import { useInfiniteQuery } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import InputSearch from "../../components/aidchannel/general/InputSearch";
import PublicHeader from "../../components/layout/header/PublicHeader";
import PublicFooter from "../../components/layout/footer/PublicFooter";

import { gettweetsScrolling } from "../../apis/twitterApi";
import Post from "../../components/aidchannel/tweets/Post";
import useIntersectionObserver from "../../helpers/useIntersectionObserver";
import CountryHeader from "components/layout/header/CountryHeader";

const ViewMoreTweet = () => {
  const [searchText, setSearchText] = useState("");
  const [limit] = useState(9);
  const loadMoreButtonRef = useRef();
  const history = useHistory();
  const { codeCountry } = useParams();

  const [test, setTest] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [searchText, codeCountry, limit, test],
    gettweetsScrolling,
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
          More
          <span className="sub-heading"> Tweets </span>
        </h1>
        <InputSearch
          setSearchText={setSearchText}
          searchText={searchText}
          placeholder={`Search for Tweets`}
        />

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

export default ViewMoreTweet;
