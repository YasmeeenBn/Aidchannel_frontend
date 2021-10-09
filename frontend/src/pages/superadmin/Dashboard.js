import { getNumberArticlesByCountry } from "apis/articleApi";
import { getNumberTweetsByCountry } from "apis/twitterApi";
import { getNumberVideosByCountry } from "apis/youtubeApi";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Flag from "react-world-flags";
import { getNumberOrganizationsByCountry } from "../../apis/organizationApi";
import {
  getNumberProjects,
  getNumberProjectsByCountry,
  getNumberProjectsByCountryNULL,
} from "../../apis/projectApi";
import CounterDatavisualization from "../../components/aidchannel/general/CounterDatavisualization";

import Select from "react-select";
import { getDisabledCountries, getEnabledCountries } from "apis/countryApi";

const Dashboard = () => {
  const [numberProjects, setNumberProjects] = useState();
  const [numberallprojects, setnumberallprojects] = useState();
  const [numberProjectsNull, setNumberProjectsNull] = useState();
  const [numberOrganizations, setNumberOrganizations] = useState();
  const [numberVideos, setNumberVideos] = useState();
  const [numberTweets, setNumberTweets] = useState();
  const [numberArticles, setnumberArticles] = useState();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [optionsCountries, setOptionsCountries] = useState();
  const [display, setDisplay] = useState(true);

  const getDataFromApi = useCallback(async () => {
    //  const numberallprojects = getNumberProjects();
    //  setnumberallprojects(numberallprojects);
    setDisplay(false);
    const numberProj = await getNumberProjectsByCountry(selectedCountry?.value);
    setNumberProjects(numberProj);
    const numberProjNull = await getNumberProjectsByCountryNULL(
      selectedCountry?.value
    );
    setNumberProjectsNull(numberProjNull);
    const numberOrg = await getNumberOrganizationsByCountry(
      selectedCountry?.value
    );
    setNumberOrganizations(numberOrg);
   
    const numberVideos = await getNumberVideosByCountry(selectedCountry?.value);
    setNumberVideos(numberVideos);
    const numberTweets = await getNumberTweetsByCountry(selectedCountry?.value);
    setNumberTweets(numberTweets);
    const numberArticles = await getNumberArticlesByCountry(
      selectedCountry?.value
    );
    setnumberArticles(numberArticles);
    
    const enableCountries = await getEnabledCountries();
    setOptionsCountries(
      enableCountries
        ?.map((country) => {
          return {
            value: country.code,
            label: country.name,
          };
        })
        .sort((country1, country2) =>
          country1?.label?.localeCompare(country2?.label)
        )
    );
    setDisplay(true);
  }, [selectedCountry]);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi, selectedCountry]);

  const handleChangeCountry = (selected) => {
    setSelectedCountry(selected);
  };

  return (
    <div className="container">
      <h1> SuperAdmin's Dashboard</h1>

      <hr />
      
      
      
      
      
      {/* <div className="row mt-5">
        <div className="col-12 col-sm-6 col-md-4 mt-3">
          <CounterDatavisualization
            value={"0" + numberallprojects}
            //route={`/web-master/projects/${codeCountry}`}
            title="Projects"
            bgColor="#0069d9"
            textColor="white"
            duration="1"
          />
        </div>
        
        <div className="col-12 col-sm-6 col-md-4 mt-3">
          <CounterDatavisualization
            value={"0" + numberOrganizations}
            // route={`/web-master/organizations/${codeCountry}`}
            title="Sub organizations"
            bgColor="#0069d9"
            textColor="white"
            duration="1"
          />
        </div>
        <div className="col-12 col-sm-6 col-md-4 mt-3">
          <CounterDatavisualization
            value={"0" + numberVideos}
            //   route={`/web-master/validation/youtube/${codeCountry}`}
            title="Youtube videos"
            bgColor="#0069d9"
            textColor="white"
            duration="1"
          />
        </div>
        <div className="col-12 col-sm-6 col-md-4 mt-3">
          <CounterDatavisualization
            value={"0" + numberTweets}
            // route={`/web-master/validation/twitter/${codeCountry}`}
            title="Tweets"
            bgColor="#0069d9"
            textColor="white"
            duration="1"
          />
        </div>
        <div className="col-12 col-sm-6 col-md-4 mt-3">
          <CounterDatavisualization
            value={"0" + numberArticles}
            // route={`/web-master/validation/articles/${codeCountry}`}
            title="Articles"
            bgColor="#0069d9"
            textColor="white"
            duration="1"
          />
        </div>
        <div className="col-12 col-sm-6 col-md-4 mt-3">
          <CounterDatavisualization
            value={"0" + numberProjectsNull}
            // route={`/web-master/projects/${codeCountry}`}
            title="Projects Country NULL"
            bgColor="#0069d9"
            textColor="white"
            duration="1"
          />
        </div>
      </div> */}

      <div className="row">
        <div className="col-12 col-md-4">
          <Select
            placeholder="Choose Country"
            value={selectedCountry}
            onChange={handleChangeCountry}
            options={optionsCountries}
          />
        </div>
      </div>
      {display && selectedCountry && (
        <div className="row mt-5">
          <div className="col-12 col-sm-6 col-md-4 mt-3">
            <CounterDatavisualization
              value={"0" + numberProjects}
              //route={`/web-master/projects/${codeCountry}`}
              title="Projects"
              bgColor="#0069d9"
              textColor="white"
              duration="1"
            />
          </div>
          <div className="col-12 col-sm-6 col-md-4 mt-3">
            <CounterDatavisualization
              value={"0" + numberOrganizations}
              // route={`/web-master/organizations/${codeCountry}`}
              title="Sub organizations"
              bgColor="#0069d9"
              textColor="white"
              duration="1"
            />
          </div>
          <div className="col-12 col-sm-6 col-md-4 mt-3">
            <CounterDatavisualization
              value={"0" + numberVideos}
              //   route={`/web-master/validation/youtube/${codeCountry}`}
              title="Youtube videos"
              bgColor="#0069d9"
              textColor="white"
              duration="1"
            />
          </div>
          <div className="col-12 col-sm-6 col-md-4 mt-3">
            <CounterDatavisualization
              value={"0" + numberTweets}
              // route={`/web-master/validation/twitter/${codeCountry}`}
              title="Tweets"
              bgColor="#0069d9"
              textColor="white"
              duration="1"
            />
          </div>
          <div className="col-12 col-sm-6 col-md-4 mt-3">
            <CounterDatavisualization
              value={"0" + numberArticles}
              // route={`/web-master/validation/articles/${codeCountry}`}
              title="Articles"
              bgColor="#0069d9"
              textColor="white"
              duration="1"
            />
          </div>
          <div className="col-12 col-sm-6 col-md-4 mt-3">
            <CounterDatavisualization
              value={"0" + numberProjectsNull}
              // route={`/web-master/projects/${codeCountry}`}
              title="Projects Country NULL"
              bgColor="#0069d9"
              textColor="white"
              duration="1"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
