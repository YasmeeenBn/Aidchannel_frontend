import React, { useState, useEffect } from "react";
import "./InputSearch.css";

const InputSearch = ({ setSearchText, searchText, placeholder }) => {
  const [tempText, settempText] = useState("");
  useEffect(() => {
    settempText(searchText);
  },[]);
  return (
    <form
      className="form-inline my-2 my-lg-0 w-100 h-100"
      onSubmit={(e) => {
        e.preventDefault();
        setSearchText(tempText);
      }}
    >
      <div className="form-group has-search  w-md-50 w-xs-100">
        <span className="fa fa-search form-control-feedback"></span>
        <input
          onChange={(e) => settempText(e.target.value)}
          value={tempText}
          type="text"
          className="form-control input-search "
          placeholder={placeholder}
          style={{
            width: "100%",
            border: "none",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        />
      </div>
    </form>
  );
};

export default InputSearch;
