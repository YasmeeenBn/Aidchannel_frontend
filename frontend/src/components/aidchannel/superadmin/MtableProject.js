import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { AiFillDelete, AiFillEdit, AiOutlineProfile } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { FcCalendar } from "react-icons/fc";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import urlImageAdapter from "helpers/urlImageAdapter";
import { deleteProject } from "apis/projectApi";

const MTableProject = () => {
  const tableRef = React.createRef();
  const history = useHistory();
  const { codeCountry } = useParams();

  const reloadTableData = () => {
    tableRef.current.onQueryChange();
  };

  return (
    <div>
      <MaterialTable
        tableRef={tableRef}
        title="List of Global Projects"
        columns={[
          {
            field: "image_url",
            title: "Image",
            render: (rowData) => (
              <img
                className="img-fluid"
                src={urlImageAdapter(rowData.image_url)}
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
            render: (rowData) => {
              {
                const name = rowData?.name;
                // ? rowData
                // : "The name does not exist";
                return <p>{name}</p>;
              }
            },
            cellStyle: {
              width: "80%",
              textAlign: "center",
            },
          },
        ]}
        data={(query) =>
          new Promise((resolve, reject) => {
            let url = `${process.env.REACT_APP_BACKEND}project/getAllProjectsByCountryNull?`;
            url += "limit=" + query.pageSize;
            url += "&page=" + (query.page + 1);
            axios
              .get(url, {
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
            onClick: () => tableRef.current && tableRef.current.onQueryChange(),
          },
          {
            icon: () => <FaRegEdit size={30} color="#ffc107" />,
            tooltip: "Edit Project",
            onClick: (event, project) => {
              history.push(`/super-admin/details-project-null/${project?._id}`);
            },
          },
          {
            icon: () => (
              <button className="btn btn-danger border-none shadow-none">
                Delete
              </button>
            ),
            onClick: async (event, project) => {
              if (
                window.confirm(`Are you sure you wish to delete this project ?`)
              ) {
                try {
                  await deleteProject(project._id);
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

export default MTableProject;
