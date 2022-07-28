import { InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import downloadImg from "../assets/images/download.png";
import { invoices } from "../../../lib/static/data";
import usePaginator from "../../../lib/components/Hooks/PaginatorTemplate";

const OrganizationInvoices = ({ styles, hooksContent }) => {
  const { filterData } = hooksContent;
  const { PaginatorTemplate } = usePaginator();
  return (
    <div className={styles.org_invoices}>
      <h4>Invoices</h4>
      <div className={styles.filters}>
        <div className={styles.search_bar}>
          <TextField
            className={styles.input}
            fullWidth
            size="small"
            placeholder="Enter Text Here..."
            value={hooksContent?.title}
            onChange={hooksContent?.handleChange(filterData.title)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon className={styles.searchIcon} />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={styles.select_bar}>
          <Select
            className={styles.input}
            fullWidth
            size="small"
            value={hooksContent?.status}
            onChange={hooksContent?.handleChange(filterData.status)}
            displayEmpty
          >
            <MenuItem disabled value="">
              Status
            </MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="expired">Expired</MenuItem>
          </Select>
        </div>
        <div className={styles.viewUsers}>
          <Link to="/organizations">View Users</Link>
        </div>
        <div className={styles.input}></div>
      </div>
      <div style={{ marginTop: 24 }}>
        <TableContainer className={styles.table_container} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className={styles.thead}>
              <TableRow>
                <TableCell className={styles.thead_cell} align="left">
                  Invoice Number
                </TableCell>
                <TableCell className={styles.thead_cell} align="left">
                  BIlling Date
                </TableCell>
                <TableCell className={styles.thead_cell} align="left">
                  Status
                </TableCell>
                <TableCell className={styles.thead_cell} align="left">
                  Plan
                </TableCell>
                <TableCell className={styles.thead_cell} align="left">
                  Period
                </TableCell>
                <TableCell className={styles.thead_cell}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices?.map((invoice, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    className={styles.client_cell}
                    component="th"
                    scope="row"
                  >
                    {invoice?.number}
                  </TableCell>
                  <TableCell align="left">
                    {new Date(invoice?.date).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell align="left">
                    <span
                      className={
                        invoice?.status === "Paid"
                          ? styles.status_paid
                          : invoice?.status === "Expired"
                          ? styles.status_expired
                          : ""
                      }
                    >
                      {invoice?.status}
                    </span>
                  </TableCell>
                  <TableCell align="left">{invoice?.plan}</TableCell>
                  <TableCell align="left">{invoice?.period}</TableCell>
                  <TableCell className={styles.client_cell} align="left">
                    <button className={styles.download_invoice}>
                      Download <img src={downloadImg} alt="download invoice" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <PaginatorTemplate />
      </div>
    </div>
  );
};

export default OrganizationInvoices;
