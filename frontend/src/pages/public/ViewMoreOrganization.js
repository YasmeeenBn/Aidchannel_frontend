import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import {
  getDonorsOfMonthScrolling,
  getImplementersOfMonthScrolling,
} from "../../apis/organizationApi";
import useIntersectionObserver from "../../helpers/useIntersectionObserver";
import InputSearch from "../../components/aidchannel/general/InputSearch";
import PublicHeader from "../../components/layout/header/PublicHeader";
import OrganizationCard from "../../components/aidchannel/organization/OrganizationCard";
import PublicFooter from "../../components/layout/footer/PublicFooter";
import PublicFooterHomepage from "components/layout/footer/PublicFooterHomepage";

const ViewMoreOrganization = () => {
  const [searchText, setSearchText] = useState("");
  const [limit] = useState(9);

  const { organization } = useParams();
  const loadMoreButtonRef = useRef();

  const chooseOrganizationApi = ({ pageParam = 1, queryKey }) => {
    if (organization === "donors")
      return getDonorsOfMonthScrolling({ pageParam: 1, queryKey });
    else if (organization === "implementers")
      return getImplementersOfMonthScrolling({ pageParam: 1, queryKey });
    return null;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery([searchText, limit], chooseOrganizationApi, {
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
          {organization.charAt(0).toUpperCase() + organization.slice(1)}
          <span className="sub-heading"> of the month </span>
        </h1>
        <InputSearch
          setSearchText={setSearchText}
          searchText={searchText}
          placeholder={`Search for ${organization}`}
        />
        <div className="row">
          {data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((organization, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4 my-4">
                  <OrganizationCard organization={organization} key={index} />
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

export default ViewMoreOrganization;
