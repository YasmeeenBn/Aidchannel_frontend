import React from "react";


import "./ArticleCard.css";

const ArticleCard = ({ article }) => {
  return (
    <div >
      {article && (
        < >
          <h2 className="font-bold text-2xl mb-2">{article?.article_title}</h2>
          <a href={article?.article_url} target="_blank">
            Click to See more Details
          </a>
        </>
      )}
    </div>
  );
};
export default ArticleCard;
