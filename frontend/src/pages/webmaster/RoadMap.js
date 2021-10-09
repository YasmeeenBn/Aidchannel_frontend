import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import Flag from "react-world-flags";
import { getCountryByCode } from "../../apis/countryApi";
import MtableExpert from "../../components/aidchannel/webmaster/MtableExpert";

const RoadMap = () => {
  const history = useHistory();
  const { codeCountry, idExpert } = useParams();
  const [country, setCountry] = useState();

  const getDataFromApi = useCallback(async () => {
    const country = await getCountryByCode(codeCountry);
    setCountry(country);
  }, []);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  return (
    <div className="container">
      {country && (
        <>
          <h1>
            <Flag
              code={codeCountry}
              height="70"
              width="70"
              style={{ marginRight: "2px" }}
              className="flag"
            />{" "}
            Road Map
          </h1>
          <hr />
        </>
      )}
    </div>
  );
};

export default RoadMap;
