import React from "react";
import InputRadio from "../general/InputRadio";
import InputSearch from "../general/InputSearch";
import "./SearchWithStatus.css";

const SearchWithStatus = ({
  setSearchText,
  searchStatus,
  setSearchStatus,
  searchText,
}) => {
  return (
    <div>
      <InputSearch
        setSearchText={setSearchText}
        searchText={searchText}
        placeholder="Search for the project"
      />
      <div className="row w-md-50 w-xs-100 mt-2 shadow-radio p-2">
        <div className="col-6 col-md-3">
          <InputRadio
            label="Completed"
            value="completed"
            checked={searchStatus}
            setter={setSearchStatus}
          />
        </div>
        <div className="col-6 col-md-3">
          <InputRadio
            label="Cancelled"
            value="cancelled"
            checked={searchStatus}
            setter={setSearchStatus}
          />
        </div>
        <div className="col-6 col-md-3">
          <InputRadio
            label="Identification"
            value="identification"
            checked={searchStatus}
            setter={setSearchStatus}
          />
        </div>
        <div className="col-6 col-md-3">
          <InputRadio
            label="Ongoing"
            value="ongoing"
            checked={searchStatus}
            setter={setSearchStatus}
          />
        </div>
        <div className="col-6 col-md-3">
          <InputRadio
            label="Approved"
            value="approved"
            checked={searchStatus}
            setter={setSearchStatus}
          />
        </div>
        <div className="col-6 col-md-3">
          <InputRadio
            label="Lending"
            value="lending"
            checked={searchStatus}
            setter={setSearchStatus}
          />
        </div>
        <div className="col-6 col-md-3">
          <InputRadio
            label="Closed"
            value="closed"
            checked={searchStatus}
            setter={setSearchStatus}
          />
        </div>
        <div className="col-6 col-md-3">
          <InputRadio
            label="Suspended"
            value="suspended"
            checked={searchStatus}
            setter={setSearchStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchWithStatus;
