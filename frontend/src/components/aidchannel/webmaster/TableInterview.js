import React from "react";
import MaterialTable from "material-table";
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";

import axios from "axios";
import urlImageAdapter from "helpers/urlImageAdapter";
import { deleteOrganization } from "apis/organizationApi";

const TableInterview = () => {
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
        title="List of old interviews"
        columns={[
          {
            field: "interviewImage",
            title: "Image",
            render: (rowData) => (
              <img
                className="img-fluid"
                src={urlImageAdapter(rowData?.interviewImage)}
                style={{
                  verticalAlign: "middle",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              />
            ),
            cellStyle: {
              width: "30%",
              textAlign: "center",
            },
          },
          {
            title: "Project",
            field: "project.name",
            cellStyle: {
              width: "35%",
              textAlign: "center",
            },
          },
          {
            title: "Interview Type",
            field: "type_interview.name",
            cellStyle: {
              width: "35%",
              textAlign: "center",
            },
          },
        ]}
        data={(query) =>
          new Promise((resolve, reject) => {
            let url = `${process.env.REACT_APP_BACKEND}interview/ByCodeCountryPagination/${codeCountry}?`;
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
          search: false,
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
            icon: () => (
              <button className="btn btn-warning border-none shadow-none">
                Details
              </button>
            ),
            tooltip: "See Details",
            onClick: (event, interview) => {
              history.push(
                `/web-master/details-interview/${codeCountry}/${interview?._id}`
              );
            },
          },
        ]}
      />
    </div>
  );
};

export default TableInterview;
