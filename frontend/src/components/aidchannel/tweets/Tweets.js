import React from "react";
import { Tweet } from "react-twitter-widgets";
import "./Tweets.css";

const Tweets = (props) => {
  return (
    <>
      <Tweet tweetId={props.id} />
    </>
  );
};

export default Tweets;
