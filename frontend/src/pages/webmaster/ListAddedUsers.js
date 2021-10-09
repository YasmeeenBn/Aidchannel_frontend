import {
  enableExpertOfMonth,
  disabledExpertOfMonth,
  getExpert,
  deleteUser,
} from "apis/userApi";
import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";

import { getCountryByCode } from "../../apis/countryApi";
import {  getAddedUsersByWebmaster } from "apis/userApi";

import TableUser from "components/aidchannel/webmaster/TableUser";

const ListAddedUsers = () => {
  const history = useHistory();
  const { codeCountry, idUser } = useParams();
  const [country, setCountry] = useState();
  const [users, setUsers] = useState([]);

  const getDataFromApi = useCallback(async () => {
    const country = await getCountryByCode(codeCountry);
    setCountry(country);
    const user = await getAddedUsersByWebmaster();
    setUsers(user?.reverse());
  }, []);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  const deleteUserr = async (user) => {
    if (window.confirm(`Are you sure you wish to delete ${user.name} ?`)) {
      try {
        await deleteUser(user._id);
        const newUsersList = users.filter(function(item) {
          if (item["_id"] === user?._id) return false;
          return true;
        });
        setUsers(newUsersList);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container">
      <>
        <h5></h5>
        <TableUser />
      </>
    </div>
  );
};

export default ListAddedUsers;
