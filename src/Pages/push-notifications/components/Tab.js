import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";


const Tab = ({ styles, data }) => {

    return (
      <div>
        {data &&
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
            <TableBody>
              {data?.data?.map((notification, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                  <span className={styles.cell_message}>
                      {notification?.title}
                  </span>
                  </TableCell>
                  <TableCell align="left">
                  <span
                      className={
                      notification?.status === "SENT"
                          ? styles.status_sent
                          : notification?.status === "SCHEDULED"
                          ? styles.status_scheduled
                          : ""
                      }
                  >
                      {String(notification.status).toLocaleLowerCase()}
                  </span>
                  </TableCell>
                  <TableCell align="left">
                    {new Date(notification?.createdAt).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell align="left">{
                    /* Delivery types is an array so it is output this way */
                    notification?.deliveryTypes.map((i, index, arr) => (
                      arr.length - 1 === index ? 
                      i.replace("_", " ").toLocaleLowerCase() :
                      i.replace("_", " ").toLocaleLowerCase() + ", "
                    ))}</TableCell>
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
        </TableContainer>}
      </div>
    );
  };
 
export default Tab;