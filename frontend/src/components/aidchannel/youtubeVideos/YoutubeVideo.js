import React from "react";
import "./YoutubeVideo.css";

const YoutubeVideo = (props) => {
  function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  }
  return (
    <>
      <iframe
        width="100%"
        height="250px"
        src={`https://www.youtube.com/embed/${getId(props?.url)}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </>
  );
};

export default YoutubeVideo;
