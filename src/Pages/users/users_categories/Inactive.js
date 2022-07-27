import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button } from "@mui/material";
import usePaginator from "../../../lib/components/Hooks/PaginatorTemplate";

const Inactive = ({ data, styles }) => {
  
  const inactiveAdministrators = data?.data?.filter(i => i.status === "INACTIVE");
  const { PaginatorTemplate } = usePaginator()
  return (
    <div>
      <TableContainer className={styles.table_container} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className={styles.thead}>
            <TableRow>
              <TableCell className={styles.thead_cell}>
                Name
              </TableCell>
              <TableCell className={styles.thead_cell} align="left">
                Email
              </TableCell>
              <TableCell className={styles.thead_cell} align="left">
                Status
              </TableCell>

              <TableCell className={styles.thead_cell} align="left">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inactiveAdministrators?.map((user, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <span className={styles.cell_message}>{user?.lastName} {user?.firstName}</span>
                </TableCell>
                <TableCell align="left">{user?.email}</TableCell>
                <TableCell align="left">
                  <span
                    className={
                      user?.status === "ACTIVE"
                        ? styles.status_active
                        : user?.status === "INACTIVE"
                        ? styles.status_inactive
                        : ""
                    }
                  >
                    {String(user?.status).toLowerCase()}
                  </span>
                </TableCell>

                <TableCell align="left">
                  <span>
                    <Button>
                      <DeleteForeverIcon />
                    </Button>
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data && <PaginatorTemplate totalDocs={inactiveAdministrators?.length} limit={data?.limit} page={data?.page} totalPages={data?.totalPages} />}
    </div>
  );
};

export default Inactive;
