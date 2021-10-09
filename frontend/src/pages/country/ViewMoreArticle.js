import React, { useState, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import InputSearch from "../../components/aidchannel/general/InputSearch";
import PublicHeader from "../../components/layout/header/PublicHeader";
import PublicFooter from "../../components/layout/footer/PublicFooter";

import useIntersectionObserver from "../../helpers/useIntersectionObserver";


import { getAllArticlesByCountryPagination, getArticlesAccepted, getarticlesScrolling } from "apis/articleApi";
import ArticleCard from "components/aidchannel/articles/ArticleCard";
import CountryHeader from "components/layout/header/CountryHeader";

const ViewMoreArticle = () => {
  const [searchText, setSearchText] = useState("");
  const { codeCountry } = useParams();
  const [limit] = useState(9);
  const loadMoreButtonRef = useRef();
  const [test, setTest] = useState(false);
 const history = useHistory();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [searchText,codeCountry, limit, test],
    getarticlesScrolling,
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
          <span className="sub-heading"> Articles </span>
        </h1>
        <InputSearch
          setSearchText={setSearchText}
          searchText={searchText}
          placeholder={`Search for Articles`}
        />
        <div className="row">
          {data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((article, index) => (
                <div key={index} className="col-12  p-2  mt-3 border">
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
      </div>
      <PublicFooter />
    </>
  );
};

export default ViewMoreArticle;
