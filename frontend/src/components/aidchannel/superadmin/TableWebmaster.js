import React from "react";
import MaterialTable from "material-table";
import { FcCalendar } from "react-icons/fc";
import { useHistory, useParams } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import urlImageAdapter from "helpers/urlImageAdapter";
import { deleteExpert } from "apis/userApi";

const TableWebmaster = () => {
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
        title="List of WebMasters"
        columns={[
          {
            field: "image_url",
            title: "Profil",
            render: (rowData) => (
              <img
                className="img-fluid"
                src={urlImageAdapter(rowData?.image_url)}
                style={{
                  verticalAlign: "middle",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              />
            ),
            cellStyle: {
              width: "15%",
              textAlign: "center",
            },
          },
          {
            title: "Full Name",
            field: "fullname",
            cellStyle: {
              width: "25%",

              textAlign: "center",
            },
          },
          {
            title: "Email",
            field: "email",
            cellStyle: {
              width: "25%",

              textAlign: "center",
            },
          },
          {
            title: "Country",
            field: "country.name",
            cellStyle: {
              width: "25%",
              textAlign: "center",
            },
          },
        
        ]}
        data={(query) =>
          new Promise((resolve, reject) => {
            let url = `${process.env.REACT_APP_BACKEND}user/getwebmastersbypagination?`;
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
            tooltip: "Edit WebMaster",
            onClick: (event, webMaster) => {
              history.push(
                `/super-admin/edit-webmaster/${webMaster?._id}`
              );
            },
          },
       
          {
            icon: () => (
              <button className="btn btn-danger border-none shadow-none">
                Delete
              </button>
            ),
            onClick: async (event, user) => {
              if (
                window.confirm(
                  `Are you sure you wish to delete ${user.fullname} ?`
                )
              ) {
                try {
                  await deleteExpert(user?._id);
                  reloadTableData();
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

export default TableWebmaster;
