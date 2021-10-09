import React, { useState, useRef, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router";
import useIntersectionObserver from "../../helpers/useIntersectionObserver";
import InputSearch from "../../components/aidchannel/general/InputSearch";
import PublicFooter from "../../components/layout/footer/PublicFooter";
import ProjectCard from "../../components/aidchannel/project/ProjectCard";
import { getProjectsKeywordCountry } from "../../apis/projectApi";
import CountryHeader from "../../components/layout/header/CountryHeader";

const ProjectsCountry = () => {
  const [searchText, setSearchText] = useState("");
  const [limit] = useState(9);

  const { codeCountry, search_text } = useParams();

  const loadMoreButtonRef = useRef();

  useEffect(() => {
    setSearchText(search_text);
  }, [search_text]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [searchText, limit, codeCountry],
    getProjectsKeywordCountry,
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
          Projects
          <span className="sub-heading"></span>
        </h1>
        <InputSearch
          setSearchText={setSearchText}
          searchText={searchText}
          placeholder={`Search for projects`}
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
};

export default ProjectsCountry;
