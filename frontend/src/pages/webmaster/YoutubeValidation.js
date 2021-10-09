import React, { useState, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  acceptVideo,
  getAllVideosByCountryPagination,
  refuseVideo,
} from "../../apis/youtubeApi";
import YoutubeVideo from "../../components/aidchannel/youtubeVideos/YoutubeVideo";
import useIntersectionObserver from "../../helpers/useIntersectionObserver";

const YoutubeValidation = () => {
  const [limit] = useState(4);
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
    getAllVideosByCountryPagination,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.data.length === limit) return parseInt(lastPage.page) + 1;
        return false;
      },
    }
  );

  console.log(data, "data");

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  const accept = async (videoId) => {
    await acceptVideo(videoId);
    setTest(!test);
  };
  const refuse = async (videoId) => {
    await refuseVideo(videoId);
    setTest(!test);
  };

  return (
    <>
      <div className="row ml-5 mt-4 d-md-flex">
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.map((video, index) => (
              <div key={index} className="mt-0 border p-3 m-2">
                <YoutubeVideo url={video?.video_url} />
                <button
                  onClick={() => accept(video?._id)}
                  className="btn btn-success shadow-none mr-4"
                >
                  Accept
                </button>
                <button
                  onClick={() => refuse(video?._id)}
                  className="btn btn-danger shadow-none"
                >
                  Refuse
                </button>
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

export default YoutubeValidation;
