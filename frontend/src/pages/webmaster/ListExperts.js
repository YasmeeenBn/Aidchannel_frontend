import {
  enableExpertOfMonth,
  disabledExpertOfMonth,
  getExpert,
} from "apis/userApi";
import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import Flag from "react-world-flags";
import { getCountryByCode } from "../../apis/countryApi";
import { deleteExpert, getAllExpertsByCountry } from "apis/userApi";
import MtableExpert from "../../components/aidchannel/webmaster/MtableExpert";
import TableExpert from "components/aidchannel/webmaster/TableExpert";

const ListExperts = () => {
  const history = useHistory();
  const { codeCountry, idExpert } = useParams();
  const [country, setCountry] = useState();
  const [experts, setExperts] = useState([]);

  const getDataFromApi = useCallback(async () => {
    const country = await getCountryByCode(codeCountry);
    setCountry(country);
    const expert = await getAllExpertsByCountry();
    setExperts(expert?.reverse());
  }, []);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  const deleteExp = async (expert) => {
    if (window.confirm(`Are you sure you wish to delete ${expert.name} ?`)) {
      try {
        await deleteExpert(expert._id);
        const newExpertsList = experts.filter(function(item) {
          if (item["_id"] === expert?._id) return false;
          return true;
        });
        setExperts(newExpertsList);
      } catch (error) {
        console.log(error);
      }
    }
  };

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
            Experts
          </h1>
          <hr />
          <button
            onClick={() =>
              // history.push(`/web-master/add-webmaster/${codeCountry}`)
              history.push(`/web-master/add-Expert/${codeCountry}`)
            }
            className="btn btn-primary ml-3 mt-2 mb-3 shadow-none border-none"
          >
            Add
          </button>
          <TableExpert />
          {/* <MtableExpert deleteRow={deleteExp} />*/}
        </>
      )}
    </div>
  );
};

export default ListExperts;
