import React, { useState, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import InputSearch from "../../components/aidchannel/general/InputSearch";
import PublicHeader from "../../components/layout/header/PublicHeader";
import PublicFooter from "../../components/layout/footer/PublicFooter";
import { getAllTweetsByCountryPagination } from "../../apis/twitterApi";
import useIntersectionObserver from "../../helpers/useIntersectionObserver";

import CardInfo from "../../components/aidchannel/general/CardInfo";

const ViewMoreExpertArticle = () => {
  const [searchText, setSearchText] = useState("");
  const { codeCountry } = useParams();
  const [limit] = useState(9);
  const loadMoreButtonRef = useRef();
  const [test, setTest] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [codeCountry, limit, test],
    getAllTweetsByCountryPagination,
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

  const article = [
    {
      name: "PARTNERSHIPS AND PROJECTS",
      description:
        "PARTNERSHIPS AND PROJECTS Family Planning: Partnerships Partnerships The U.S. Agency for International Development (USAID) works with a wide range of public and private partners to accelerate development  and ensure we are using resources efficiently. USAID’s partnerships promote ...",
      image_url:
        "https://assets.maccarianagency.com/the-front/photos/coworking/place3.jpg",
    },
  ];

  return (
    <>
      <PublicHeader />
      <div className="container">
        <h1 className="heading my-4">
          More
          <span className="sub-heading"> Experts's Articles </span>
        </h1>
        <InputSearch
          setSearchText={setSearchText}
          searchText={searchText}
          placeholder={`Search for expert's articles`}
        />
        <div className="row">
          {article.map((item, index) => (
            <CardInfo key={index} data={item} index={index} />
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

export default ViewMoreExpertArticle;
