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

const TabBody = ({ styles, data, type }) => {

  let notifications = data?.data
  // eslint-disable-next-line
  switch (type){
    case 1: notifications=notifications.filter(i => i?.scheduled !== true); break;
    case 2: notifications=notifications.filter(i => i?.scheduled === true); break;
  }
  const { PaginatorTemplate } = usePaginator()
  return (
    <div>
      <TableContainer className={styles.table_container} component={Paper}>
        <Table sx={{ minWidth: 650 }} style={{ tableLayout: 'fixed' }} aria-label="simple table">
          <TableHead className={styles.thead}>
            <TableRow>
              <TableCell className={styles.thead_cell}  style={{ width: '25%' }}>Message</TableCell>
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
          {notifications &&
          <TableBody>
            {notifications?.map((notification, index) => (
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
      {data && <PaginatorTemplate totalDocs={notifications?.length} limit={data?.limit} page={data?.page} totalPages={data?.totalPages} />}
    </div>
  );
};

export default TabBody;
