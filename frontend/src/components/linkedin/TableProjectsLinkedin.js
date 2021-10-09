import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { FcCalendar } from "react-icons/fc";
import { CgDetailsMore } from "react-icons/cg";
import { BiShow } from "react-icons/bi";
import { useHistory, useParams } from "react-router-dom";

import axios from "axios";
import urlImageAdapter from "helpers/urlImageAdapter";
import { deleteProject } from "apis/projectApi";

const TableProjectsLinkedin = () => {
  const tableRef = React.createRef();
  const history = useHistory();
  const { codeCountry } = useParams();

  const reloadTableData = () => {
    tableRef.current.onQueryChange();
  };

  return (
    <div className="mt-4">
      <MaterialTable
        tableRef={tableRef}
        title="List of Projects"
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
            cellStyle: {
              width: "40%",
              textAlign: "center",
            },
          },
          {
            title: "Thematique",
            field: "thematique.name",
            cellStyle: {
              width: "20%",
              textAlign: "center",
            },
          },
          {
            title: "Total Cost",
            field: "total_cost",
            type: "numeric",
            cellStyle: {
              width: "15%",
              textAlign: "center",
            },
          },
        ]}
        data={(query) =>
          new Promise((resolve, reject) => {
            let url = `${process.env.REACT_APP_BACKEND}project/AddedByExpertPagination?`;
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
            onClick: () => tableRef.current && tableRef.current.onQueryChange(),
          },
          {
            icon: () => <FaRegEdit size={30} color="#ffc107" />,
            tooltip: "Edit Project",
            onClick: (event, project) => {
              history.push(
                `/web-master/edit-project/${codeCountry}/${project?._id}`
              );
            },
          },

          {
            icon: () => <BiShow size={30} />,
            tooltip: "Show in Browser",
            onClick: (event, project) => {
              window.open(
                `${process.env.REACT_APP_FRONT}projectdetails/${project._id}`,
                "_blank"
              );
            },
          },

          {
            icon: () => <AiFillDelete size={30} color="red" />,
            tooltip: "Delete Project",
            onClick: async (event, project) => {
              if (
                window.confirm(
                  `Are you sure you wish to delete ${project.name} ?`
                )
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

export default TableProjectsLinkedin;
