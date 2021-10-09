import React from "react";
import "./SideImage.css";

const SideImage = ({ pageName }) => {
  return (
    <div
      className={pageName === "login" ? "side-img-login" : "side-img-signup"}
    >
      <h1 className="mb-3" style={{ color: "#3f51b5", fontFamily: "Lato" }}>
        The aid{" "}
        <span style={{ color: "#6c757d", fontFamily: "Lato" }}>CHANNEL</span>
      </h1>
      <img
        className=""
        style={{ width: "40vw" }}
        alt="side"
        src="assets/icons/side-image.svg"
      />
    </div>
  );
};

export default SideImage;
