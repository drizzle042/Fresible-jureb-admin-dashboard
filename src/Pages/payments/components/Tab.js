import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { moneyFormat } from "../../../lib/components/Helper/formatCurrency";

const Tab = ({ data, styles }) => {

  return (
    <div>
      <TableContainer className={styles.table_container} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className={styles.thead}>
            <TableRow>
              <TableCell className={styles.thead_cell}>Client</TableCell>
              <TableCell className={styles.thead_cell} align="left">
                Payment Id
              </TableCell>
              <TableCell className={styles.thead_cell} align="left">
                Payment Date
              </TableCell>
              <TableCell className={styles.thead_cell} align="left">
                Amount Paid
              </TableCell>
              <TableCell className={styles.thead_cell} align="left">
                Plan
              </TableCell>
              <TableCell className={styles.thead_cell} align="left">
                Period
              </TableCell>
            </TableRow>
          </TableHead>
          {data &&
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
                    <Link to={`/organizations/${user?.organizationId}`}>{user?.organizationMeta?.name}</Link>
                  </TableCell>
                  <TableCell align="left">{user?.paymentId}</TableCell>
                  <TableCell align="left">
                    {new Date(user?.paidAt).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell align="left">
                    {moneyFormat(user?.amountPaid)}
                  </TableCell>
                  <TableCell align="left">{String(user?.subscriptionMeta?.planName).toLowerCase()}</TableCell>
                  <TableCell align="left">{String(user?.subscriptionMeta?.billingInterval).toLowerCase()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          }
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tab;
