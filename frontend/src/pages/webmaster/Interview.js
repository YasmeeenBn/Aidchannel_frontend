import TableInterview from "components/aidchannel/webmaster/TableInterview";
import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import Flag from "react-world-flags";
import { getCountryByCode } from "../../apis/countryApi";
import {
  // deleteInterviewApi,
  //   deleteInterview,
  getAllInterviewByCountry,
} from "../../apis/interviewApi";
import MTableInterview from "../../components/aidchannel/webmaster/MTableInterview";

const Interview = () => {
  const history = useHistory();
  const { codeCountry } = useParams();
  const [country, setCountry] = useState();
  const [interview, setInterview] = useState([]);

  const getDataFromApi = useCallback(async () => {
    const country = await getCountryByCode(codeCountry);
    setCountry(country);
    const interviews = await getAllInterviewByCountry(codeCountry);
    setInterview(interviews?.reverse());
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
            Old interviews
          </h1>
          <hr />

          {/*<MTableInterview data={interview} />*/}
          <TableInterview />
        </>
      )}
    </div>
  );
};

export default Interview;
