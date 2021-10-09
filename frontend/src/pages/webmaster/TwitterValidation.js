import React, { useState, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  acceptTweet,
  getAllTweetsByCountryPagination,
  refuseTweet,
} from "../../apis/twitterApi";

import Post from "../../components/aidchannel/tweets/Post";
import useIntersectionObserver from "../../helpers/useIntersectionObserver";

const TwitterValidation = () => {
  const [limit] = useState(16);
  const { codeCountry } = useParams();
  const loadMoreButtonRef = useRef();
  const [test, setTest] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [codeCountry, limit, test],
    getAllTweetsByCountryPagination,
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

  const acceptTwitterTweet = async (tweetId) => {
    await acceptTweet(tweetId);
    setTest(!test);
  };
  const refuseTwitterTweet = async (tweetId) => {
    await refuseTweet(tweetId);
    setTest(!test);
  };

  return (
    <>
      <div className="row ml-5 mt-4">
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.map(
              (tweet, index) =>
                tweet.twitter_username &&
                tweet.tweet_id && (
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
                    <div className="mt-3">
                      <button
                        onClick={() => acceptTwitterTweet(tweet?._id)}
                        className="btn btn-success shadow-none mr-4"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => refuseTwitterTweet(tweet?._id)}
                        className="btn btn-danger shadow-none"
                      >
                        Refuse
                      </button>
                    </div>
                  </div>
                )
            )}
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
    </>
  );
};

export default TwitterValidation;
