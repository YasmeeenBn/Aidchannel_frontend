import React, { useState, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import useIntersectionObserver from "../../helpers/useIntersectionObserver";
import { getProjectByStatus } from "../../apis/projectApi";
import ProjectCard from "../../components/aidchannel/project/ProjectCard";
import PublicFooter from "../../components/layout/footer/PublicFooter";
import PublicHeader from "../../components/layout/header/PublicHeader";
import SearchWithStatus from "../../components/aidchannel/project/SearchWithStatus";

export default function ProjectSearch(props) {
  const [searchText, setSearchText] = useState("");
  const [limit] = useState(9);
  const [searchStatus, setSearchStatus] = useState("");

  const loadMoreButtonRef = React.useRef();

  const { search_text } = useParams();

  useEffect(() => {
    setSearchText(search_text);
  }, [search_text]);
  //Definition of useInfiniteQuery of react-query library
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery([searchText, limit, searchStatus], getProjectByStatus, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.length === limit) return parseInt(lastPage.page) + 1;
      return false;
    },
  });

  // observer to check if we have reached the button at the end of the page
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
          Projects with keyword
          <span className="sub-heading"> {searchText} </span>
        </h1>
        <SearchWithStatus
          setSearchText={setSearchText}
          searchText={searchText}
          searchStatus={searchStatus}
          setSearchStatus={setSearchStatus}
        />
        <div className="row">
          {data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((project, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4 my-4">
                  <ProjectCard project={project} key={index} />
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
}
