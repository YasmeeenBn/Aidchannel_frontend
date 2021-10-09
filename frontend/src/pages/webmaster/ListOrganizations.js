import TableOrganization from "components/aidchannel/webmaster/TableOrganization";
import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import Flag from "react-world-flags";
import { getCountryByCode } from "../../apis/countryApi";
import {
  deleteOrganization,
  getAllOrganizationsByCountry,
} from "../../apis/organizationApi";
import MTableOrganization from "../../components/aidchannel/webmaster/MTableOrganization";

const ListOrganizations = () => {
  const history = useHistory();
  const { codeCountry } = useParams();
  const [country, setCountry] = useState();
  const [organizations, setOrganizations] = useState([]);

  const getDataFromApi = useCallback(async () => {
    const country = await getCountryByCode(codeCountry);
    setCountry(country);
    const subOrganization = await getAllOrganizationsByCountry(codeCountry);
    setOrganizations(subOrganization?.reverse());
  }, [codeCountry]);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi, codeCountry]);

  const deleteSubOrg = async (org) => {
    if (window.confirm(`Are you sure you wish to delete ${org.name} ?`)) {
      try {
        await deleteOrganization(org._id);
        const newOrganizationList = organizations.filter(function(item) {
          if (item["_id"] === org?._id) return false;
          return true;
        });
        setOrganizations(newOrganizationList);
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
            Local organizations office
          </h1>
          <hr />
          <button
            onClick={() =>
              history.push(`/web-master/add-organization/${codeCountry}`)
            }
            className="btn btn-primary ml-3 mt-2 mb-3 shadow-none border-none"
            
          >
            Add
          </button>
          {/*   <MTableOrganization data={organizations} deleteRow={deleteSubOrg} />*/}
          <TableOrganization />
        </>
      )}
    </div>
  );
};

export default ListOrganizations;
