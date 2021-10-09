import { getArticlesAccepted } from "apis/articleApi";
import React, { useState, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";

import ArticleCard from "components/aidchannel/articles/ArticleCard";
import useIntersectionObserver from "../../helpers/useIntersectionObserver";

const ArticlesValides = () => {
  const [limit] = useState(4);
  const { codeCountry } = useParams();
  const loadMoreButtonRef = useRef();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery([codeCountry, limit,"articlesValides"], getArticlesAccepted, {
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
      <div className="row mt-4 ">
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.map((article, index) => (
              <div key={index} className="mt-0 border p-3 m-2 w-100">
                <ArticleCard article={article} key={index} />
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

export default ArticlesValides;
