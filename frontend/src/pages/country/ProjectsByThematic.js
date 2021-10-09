import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  getAllProjectsOfMonthByThematic,
  getAllProjectsByThematic,

} from "../../apis/projectApi";
import { useInfiniteQuery } from "react-query";
import useIntersectionObserver from "../../helpers/useIntersectionObserver";
import InputSearch from "../../components/aidchannel/general/InputSearch";
import ProjectCard from "../../components/aidchannel/project/ProjectCard";

import PublicFooter from "../../components/layout/footer/PublicFooter";
import CountryHeader from "components/layout/header/CountryHeader";
import { database } from "faker/locale/ar";

const ProjectsByThematic = () => {
//   const [projects, setProjects] = useState();
//   const { id, codeCountry } = useParams();
//  const [searchText, setSearchText] = useState("");
//   const getDataFromApi = useCallback(async () => {
//     const proj = await getAllProjectsByThematic(id, codeCountry);
//     console.log(proj.length)
//     setProjects(proj);
//   }, [id, codeCountry]);
//   useEffect(() => {
//     getDataFromApi();
//   }, [id, codeCountry, getDataFromApi]);
const [searchText, setSearchText] = useState("");
  const [limit] = useState(9);
  const { id, codeCountry } = useParams();
  const loadMoreButtonRef = useRef();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery([searchText, limit, codeCountry, id], getAllProjectsByThematic, {
    getNextPageParam: (lastPage, pages) => {
      
      if(lastPage.data.length === limit) return parseInt(lastPage.page) + 1;
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
      <CountryHeader />
      {/* <div style={{ minHeight: "100vh" }}>
        <div className="container my-5">
          <InputSearch
            setSearchText={setSearchText}
            searchText={searchText}
            placeholder={`Search for projects`}
          />
          <div className="row">
            {projects?.map((project, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4 my-4">
                <ProjectCard project={project} key={index} />
              </div>
            ))}
          </div>
        </div> */}
      <div style={{ minHeight: "100vh" }}>
        <div className="container my-5">
        <InputSearch
          setSearchText={setSearchText}
          searchText={searchText}
          placeholder={`Search for projects`}
        />
        <div className="row">
        {/* {console.log(data)}; */}
          {
          data?.pages.map((group, i) => (
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
      </div>
      <PublicFooter />
    </>
  );
};

export default ProjectsByThematic;
