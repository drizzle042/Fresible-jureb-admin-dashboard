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
import usePaginator from "../../../../lib/components/Hooks/PaginatorTemplate";

const Sent = ({ styles, data }) => {

  const sentNotifications = data?.data?.filter(i => i.scheduled !== true);
  const { PaginatorTemplate } = usePaginator()
  return (
    <div>
      <TableContainer className={styles.table_container} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className={styles.thead}>
            <TableRow>
              <TableCell className={styles.thead_cell}>Message</TableCell>
              <TableCell className={styles.thead_cell} align="left">
                Status
              </TableCell>
              <TableCell className={styles.thead_cell} align="left">
                Date
              </TableCell>
              <TableCell className={styles.thead_cell} align="left">
                Type
              </TableCell>
              <TableCell className={styles.thead_cell} align="left">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          {sentNotifications &&
          <TableBody>
            {sentNotifications?.map((notification, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <span className={styles.cell_message}>
                    {notification?.message}
                  </span>
                </TableCell>
                <TableCell align="left">
                  <span
                    className={
                      !notification?.scheduled
                        ? styles.status_sent
                        : notification?.scheduled
                        ? styles.status_scheduled
                        : ""
                    }
                  >
                    {notification.scheduled?"Scheduled":"Sent"}
                  </span>
                </TableCell>
                <TableCell align="left">
                  {new Date(notification?.createdAt).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell align="left">{notification?.deliveryType}</TableCell>
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
          }
        </Table>
      </TableContainer>
      {data && <PaginatorTemplate totalDocs={sentNotifications?.length} limit={data?.limit} page={data?.page} totalPages={data?.totalPages} />}
    </div>
  );
};

export default Sent;
