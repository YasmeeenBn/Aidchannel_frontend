import React from "react";
import "./InputOption.css";

function InputOption({ Icon, title, color, onLike, disableLike }) {
  return (
    <div className="InputOption">
      {!disableLike ? (
        <div className="row" onClick={onLike} disabled={disableLike}>
          <div className="col-3">
            {" "}
            <Icon style={{ color: color }} />
          </div>
          <div className="col-3">
            <p className="icon__title mt-1" style={{ color: color }}>
              {title}
            </p>
          </div>
        </div>
      ) : (
        <div
          className="spinner-border spinner-border-sm mb-2"
          style={{ color: "#0e76a8" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
}

export default InputOption;
