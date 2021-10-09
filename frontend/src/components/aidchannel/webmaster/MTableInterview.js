import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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
} from "@material-ui/core";

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

const MTable = ({ data, deleteRow }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const history = useHistory();
  const { codeCountry } = useParams();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              className={classes.tableHeaderCell}
              style={{ width: "25EditOrganization%" }}
            >
              Name
            </TableCell>
            <TableCell
              className={classes.tableHeaderCell}
              style={{ width: "35%" }}
            >
              Description
            </TableCell>
            <TableCell
              className={classes.tableHeaderCell}
              style={{ width: "20%" }}
            >
              Interview Type
            </TableCell>
            <TableCell
              className={classes.tableHeaderCell}
              style={{ width: "20%" }}
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow key={row.name}>
                <TableCell>
                  <Grid container>
                    <Grid item lg={2}>
                      <Avatar
                        alt={row.name}
                        src={row.image_url}
                        className={classes.avatar}
                      />
                    </Grid>
                    <Grid item lg={10}>
                      <Typography className={classes.name}>
                        {row.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Typography color="primary" variant="subtitle2">
                    {row?.project?.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="primary" variant="subtitle2">
                    {row?.type_interview?.name}
                  </Typography>
                </TableCell>

                <TableCell>
                  <button
                    onClick={() =>
                      history.push(
                        `/web-master/details-interview/${codeCountry}/${row?._id}`
                      )
                    }
                    className="btn btn-warning m-1 shadow-none"
                  >
                    Details
                  </button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            count={data.length}
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

export default MTable;
