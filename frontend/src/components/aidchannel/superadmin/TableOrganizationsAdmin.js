import React from "react";
import MaterialTable from "material-table";
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";

import axios from "axios";
import urlImageAdapter from "helpers/urlImageAdapter";
import { deleteOrganization } from "apis/organizationApi";

const TableOrganizationsAdmin = () => {
  const orgTableRef = React.createRef();
  const history = useHistory();
  const { codeCountry } = useParams();

  const reloadTableData = () => {
    orgTableRef.current.onQueryChange();
  };

  return (
    <div>
      <MaterialTable
        tableRef={orgTableRef}
        title="List of organizations"
        columns={[
          {
            field: "logo",
            title: "Logo",
            render: (rowData) => (
              <img
                className="img-fluid"
                src={urlImageAdapter(rowData?.logo)}
                style={{
                  verticalAlign: "middle",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              />
            ),
            cellStyle: {
              width: "10%",
              textAlign: "center",
            },
          },
          {
            title: "Name",
            field: "name",
            cellStyle: {
              width: "40%",
              textAlign: "center",
            },
          },
          {
            title: "Country",
            field: "country.name",
            cellStyle: {
              width: "20%",
              textAlign: "center",
            },
          },
          {
            title: "Organization size",
            field: "organization_size",
            cellStyle: {
              width: "20%",
              textAlign: "center",
            },
          },
        ]}
        data={(query) =>
          new Promise((resolve, reject) => {
            let url = `${process.env.REACT_APP_BACKEND}organization/getAllOrganizationsByPagination?`;
            url += "limit=" + query.pageSize;
            url += "&page=" + (query.page + 1);
            axios
              .post(url, {
                searchText: query.search,
              })
              .then((result) => {
                resolve({
                  data: result.data.data,
                  page: result.data.page - 1,
                  totalCount: result.data.totalCount,
                });
              });
          })
        }
        options={{
          filtering: false,
          search: true,
          sorting: false,
          headerStyle: {
            backgroundColor: "#0069d9",
            textAlign: "center",
            color: "white",
          },
          actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: "refresh",
            tooltip: "Refresh Data",
            isFreeAction: true,
            onClick: () =>
              orgTableRef.current && orgTableRef.current.onQueryChange(),
          },
          {
            icon: () => <FaRegEdit size={30} color="#ffc107" />,
            tooltip: "Edit Organization",
            onClick: (event, organization) => {
              history.push(
                `/super-admin/edit-organization/${organization?._id}`
              );
            },
          },
          {
            icon: () => <AiFillDelete size={30} color="red" />,
            tooltip: "Delete Organization",
            onClick: async (event, organization) => {
              if (
                window.confirm(
                  `Are you sure you wish to delete ${organization.name} ?`
                )
              ) {
                try {
                  await deleteOrganization(organization._id);
                  reloadTableData();
                } catch (error) {
                  console.log(error);
                }
              }
            },
          },
        ]}
      />
    </div>
  );
};

export default TableOrganizationsAdmin;
