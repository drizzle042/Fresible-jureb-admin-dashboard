import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

const BiAnnually = ({ data, styles, PaginatorTemplate }) => {
  return (
    <div>
      <TableContainer className={styles.table_container} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className={styles.thead}>
            <TableRow>
              <TableCell className={styles.thead_cell}>Client</TableCell>
              <TableCell className={styles.thead_cell} align="left">
                Email Address
              </TableCell>
              <TableCell className={styles.thead_cell} align="left">
                Join Date
              </TableCell>
              <TableCell className={styles.thead_cell} align="left">
                Contact Person
              </TableCell>
              <TableCell className={styles.thead_cell} align="left">
                Status
              </TableCell>
              <TableCell className={styles.thead_cell} align="left">
                Members
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.map((user, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  className={styles.client_cell}
                  component="th"
                  scope="row"
                >
                  <Link to={`/organizations/${user?.id}`}>{user?.name}</Link>
                </TableCell>
                <TableCell align="left">{user?.owner?.email}</TableCell>
                <TableCell align="left">
                  {new Date(user?.joinDate).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell className={styles.creator_cell} align="left">
                  {user?.owner?.lastName} {user?.owner?.firstName}
                </TableCell>
                <TableCell align="left">
                  <span
                    className={
                      user?.status === "ACTIVE"
                        ? styles.status_active
                        : user?.status === "EXPIRED"
                        ? styles.status_expired
                        : ""
                    }
                  >
                    {String(user?.status).toLowerCase()}
                  </span>
                </TableCell>
                <TableCell align="left">{Number(user?.membersCount) > 1? user?.membersCount + " users": user?.membersCount + " user"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginatorTemplate totalDocs={data?.totalDocs} limit={data?.limit} page={data?.page} totalPages={data?.totalPages} />
    </div>
  );
};

export default BiAnnually;
