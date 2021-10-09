import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  enableExpertOfMonth,
  disabledExpertOfMonth,
  getExpert,
  getAllExpertsByCountry,
} from "apis/userApi";
import { Link, useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  Typography,
  TablePagination,
  TableFooter,
  Checkbox,
} from "@material-ui/core";
import { getCountryByCode } from "apis/countryApi";

const useStyles = makeStyles((theme) => ({
  table: {
    // minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "10px 10px",
    // maxWidth: 950,
  },
  tableHeaderCell: {
    width: "25%",
    fontWeight: "bold",
    backgroundColor: "black",
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  name: {
    fontWeight: "bold",
    color: theme.palette.secondary.dark,
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
}));

const MTableExpert = ({ deleteRow }) => {
  const [checked, setChecked] = useState(false);
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { codeCountry, idExpert } = useParams();
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
  }, [getDataFromApi, checked]);

  const history = useHistory();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangeCheckbox = async (expert) => {
    if (expert.expert_of_month === true) {
      await disabledExpertOfMonth(expert._id);
    } else {
      await enableExpertOfMonth(expert._id);
    }
    setChecked(!checked);
  };
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              className={classes.tableHeaderCell}
              style={{ width: "25%" }}
            >
              FullName
            </TableCell>
            <TableCell
              className={classes.tableHeaderCell}
              style={{ width: "15%" }}
            >
              Email
            </TableCell>
            <TableCell
              className={classes.tableHeaderCell}
              style={{ width: "10%" }}
            >
              Phone
            </TableCell>
            <TableCell
              className={classes.tableHeaderCell}
              style={{ width: "10%" }}
            >
              Expert of the month
            </TableCell>
            <TableCell
              className={classes.tableHeaderCell}
              style={{ width: "15%" }}
            >
              {" "}
              Expert's Article
            </TableCell>{" "}
            <TableCell
              className={classes.tableHeaderCell}
              style={{ width: "10%" }}
            >
              {" "}
              Delete
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {experts
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            ?.map((row) => (
              <TableRow key={row.name}>
                <TableCell>
                  <Grid container>
                    <Grid item lg={2}>
                      <Avatar
                        alt={row.name}
                        src={row.logo}
                        className={classes.avatar}
                      />
                    </Grid>
                    <Grid item lg={10}>
                      <Typography className={classes.name}>
                        {row.fullname}
                      </Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Typography color="primary" variant="subtitle2">
                    {row?.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="body2">
                    {row?.phone}
                  </Typography>
                </TableCell>
                <TableCell>
                  <button
                    className={
                      row?.expert_of_month === true
                        ? "btn btn-success shadow-none"
                        : "btn btn-primary shadow-none"
                    }
                    onClick={() => handleChangeCheckbox(row)}
                  >
                    {row?.expert_of_month === true ? "Yes" : "No"}
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() =>
                      history.push(
                        `/web-master/add-expert-article/${codeCountry}/${row._id}`
                      )
                    }
                    className="btn btn-warning  mt-3  shadow-none"
                  >
                    Add / Edit Article
                  </button>
                </TableCell>{" "}
                <TableCell>
                  <button
                    className="btn btn-danger shadow-none"
                    onClick={() => deleteRow(row)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            count={experts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default MTableExpert;
