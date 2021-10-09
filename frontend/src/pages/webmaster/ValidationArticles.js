import {
  acceptArticle,
  getAllArticlesByCountryPagination,
  refuseArticle,
} from "apis/articleApi";
import ArticleCard from "components/aidchannel/articles/ArticleCard";
import React, { useState, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import useIntersectionObserver from "../../helpers/useIntersectionObserver";

const ValidationArticles = () => {
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
    [codeCountry, limit],
    getAllArticlesByCountryPagination,
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

  const accept = async (articleId) => {
    await acceptArticle(articleId);
    setTest(!test);
  };
  const refuse = async (articleId) => {
    await refuseArticle(articleId);
    setTest(!test);
  };

  return (
    <>
      <div className="row  mt-4">
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.map((article, index) => (
              <div key={index} className="mt-0 border p-3 m-2 w-100">
                <ArticleCard article={article} />
                <button
                  onClick={() => accept(article?._id)}
                  className="btn btn-success shadow-none mr-4 mt-3"
                >
                  Accept
                </button>
                <button
                  onClick={() => refuse(article?._id)}
                  className="btn btn-danger shadow-none mt-3"
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

export default ValidationArticles;
