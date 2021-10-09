import {
  disableCountryApi,
  enableCountryAPi,
  getDisabledCountries,
  getEnabledCountries,
} from "apis/countryApi";
import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
// import ListCountryDisabled from "./ListCountryDisabled";
import Select from "react-select";

const ListCountryDisabled = (props) => {
  const [selectedEnableCountry, setSelectedEnableCountry] = useState(null);
  const [selectedDisableCountry, setSelectedDisableCountry] = useState(null);
  const [optionsEnabledcountries, setOptionsEnabledcountries] = useState();
  const [optionsDisabledcountries, setOptionsDisabledcountries] = useState();
  const [refresh, setRefresh] = useState(false);

  const getDataFromApi = useCallback(async () => {
    const enabledCountries = await getEnabledCountries();
    setOptionsDisabledcountries(
      enabledCountries
        ?.map((country) => {
          return {
            value: country._id,
            label: country.name,
          };
        })
        .sort((country1, country2) =>
          country1?.label?.localeCompare(country2?.label)
        )
    );
    const disabledCountries = await getDisabledCountries();
    setOptionsEnabledcountries(
      disabledCountries
        ?.map((country) => {
          return {
            value: country._id,
            label: country.name,
          };
        })
        .sort((country1, country2) =>
          country1?.label?.localeCompare(country2?.label)
        )
    );
  }, []);
  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi, refresh]);

  const handleChangeEnableCountry = (selected) => {
    setSelectedEnableCountry(selected);
  };
  const handleChangeDisableCountry = (selected) => {
    setSelectedDisableCountry(selected);
  };

  const enableCountry = async () => {
    await enableCountryAPi(selectedEnableCountry?.value);
    setSelectedEnableCountry(null);
    setRefresh(!refresh);
  };
  const disableCountry = async () => {
    await disableCountryApi(selectedDisableCountry?.value);
    setRefresh(!refresh);
    setSelectedDisableCountry(null);
  };
  return (
    <div>
      <div className="container">
        <>
          <h1>Countries</h1>
        </>
        <div className="row mt-5">
          <div className="col-12 col-md-8 mb-3">
            <Select
              placeholder="Choice Country"
              value={selectedEnableCountry}
              onChange={handleChangeEnableCountry}
              options={optionsEnabledcountries}
            />
          </div>
          <div className="col-12 col-md-4">
            <button
              className="btn btn-success shadow-none"
              onClick={enableCountry}
            >
              Enable
            </button>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12 col-md-8 mb-3">
            <Select
              placeholder="Choice Country"
              value={selectedDisableCountry}
              onChange={handleChangeDisableCountry}
              options={optionsDisabledcountries}
            />
          </div>
          <div className="col-12 col-md-4">
            <button
              className="btn btn-danger shadow-none"
              onClick={disableCountry}
            >
              Disable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCountryDisabled;
