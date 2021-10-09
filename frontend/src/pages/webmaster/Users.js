import {
  enableExpertOfMonth,
  disabledExpertOfMonth,
  getExpert,
} from "apis/userApi";
import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import Flag from "react-world-flags";
import { getCountryByCode } from "../../apis/countryApi";
import { deleteExpert, getAllExpertsByCountry } from "apis/userApi";
import MtableExpert from "../../components/aidchannel/webmaster/MtableExpert";
import TableExpert from "components/aidchannel/webmaster/TableExpert";
import ListProjects from "./ListProjects";
import ListProjectsValides from "./ListProjectsValides";
import AddUser from "./AddUser";
import ListAddedUsers from "./ListAddedUsers";
import ExpertForm from "components/aidchannel/webmaster/ExpertForm";

const Users = () => {
  const history = useHistory();
  const { codeCountry, idExpert, multimedia } = useParams();
  const [country, setCountry] = useState();
  const [experts, setExperts] = useState([]);

  const getDataFromApi = useCallback(async () => {
    const country = await getCountryByCode(codeCountry);
    setCountry(country);
    const expert = await getAllExpertsByCountry(codeCountry);
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
      <div className="container">
        <>
          <h1>
            <Flag
              code={codeCountry}
              height="70"
              width="70"
              style={{ marginRight: "2px" }}
              className="flag"
            />{" "}
            Users
          </h1>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link
                to={`/web-master/users/addUser/${codeCountry}`}
                className={`nav-link ${multimedia === "addUser" && "active"}`}
              >
                Add User
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/web-master/users/listUsers/${codeCountry}`}
                className={`nav-link ${multimedia === "listUsers" && "active"}`}
              >
                Added Users
              </Link>
            </li>
          </ul>
        </>

        {multimedia === "addUser" && <AddUser />}
        {multimedia === "listUsers" && <ListAddedUsers />}
      </div>
    </div>
  );
};

export default Users;
