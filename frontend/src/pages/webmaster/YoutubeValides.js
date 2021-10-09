import React, { useState, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getVideoAccepted } from "../../apis/youtubeApi";
import YoutubeVideo from "../../components/aidchannel/youtubeVideos/YoutubeVideo";
import useIntersectionObserver from "../../helpers/useIntersectionObserver";

const YoutubeValidés = () => {
  const [limit] = useState(16);
  const { codeCountry } = useParams();
  const loadMoreButtonRef = useRef();
  const [test, setTest] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery([codeCountry, limit, "ValidYoutube"], getVideoAccepted, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.length === limit) return parseInt(lastPage.page) + 1;
      return false;
    },
  });

  console.log(data, "data");

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <>
      <div className="row ml-5 mt-4 d-md-flex">
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
    </>
  );
};

export default YoutubeValidés;
