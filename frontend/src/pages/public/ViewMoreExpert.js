import React, { useState, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import useIntersectionObserver from "../../helpers/useIntersectionObserver";
import InputSearch from "../../components/aidchannel/general/InputSearch";
import PublicHeader from "../../components/layout/header/PublicHeader";
import { getExpertsofMonthScrolling } from "../../apis/userApi";
import PublicFooter from "../../components/layout/footer/PublicFooter";
import ExpertCard from "../../components/aidchannel/expert/ExpertCard";
import PublicFooterHomepage from "components/layout/footer/PublicFooterHomepage";

const ViewMoreExpert = () => {
  const [searchText, setSearchText] = useState("");
  const [limit] = useState(9);

  const loadMoreButtonRef = useRef();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery([searchText, limit], getExpertsofMonthScrolling, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.length === limit) return parseInt(lastPage.page) + 1;
      return false;
    },
  });

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <>
      <PublicHeader />
      <div className="container">
        <h1 className="heading my-4">
          Experts
          <span className="sub-heading"> of the month </span>
        </h1>
        <InputSearch
          setSearchText={setSearchText}
          searchText={searchText}
          placeholder={`Search for experts`}
        />
        <div className="row">
          {data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((expert, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4 my-4">
                  <ExpertCard expert={expert} key={index} />
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
      <PublicFooterHomepage />
    </>
  );
};

export default ViewMoreExpert;
