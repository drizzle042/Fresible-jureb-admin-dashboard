import React, {useState, useEffect} from "react";
import { InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ImportExportIcon from '@mui/icons-material/ImportExport';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import downloadImg from "../assets/images/download.png";
import usePaginator from "../../../lib/components/Hooks/PaginatorTemplate";

const OrganizationInvoices = ({ styles, hooksContent, invoiceData, handleSearchInput, clientID }) => {
  const { filterData } = hooksContent;

  const [searchUrl, setSearchUrl] = useState({
    keyword: "",
    status: ""
  });

  const [status, setStatus] = useState("");

  function handleSelectStatus(e){
    setStatus(e?.target?.value);
    setSearchUrl({
      ...searchUrl,
      status: e?.target?.value,
    });
  };

  useEffect(() => {
    handleSearchInput(searchUrl);
    // eslint-disable-next-line
  }, [searchUrl])

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
            onInput={(e) => {
              setSearchUrl({
                ...searchUrl,
                keyword: e?.target?.value,
              });
            }}
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
            value={status}
            onChange={handleSelectStatus}
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
          <Link to={`/organizations/members/${clientID}`}>View Users</Link>
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
                  BIlling Date <ImportExportIcon />
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
              {invoiceData?.data?.map((invoice, index) => (
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
                    {new Date(invoice?.paidAt).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell align="left">
                    <span
                      className={
                        invoice?.status === "PAID"
                          ? styles.status_paid
                          : invoice?.status === "EXPIRED"
                          ? styles.status_expired
                          : ""
                      }
                    >
                      {String(invoice?.status)?.toLowerCase()}
                    </span>
                  </TableCell>
                  <TableCell align="left">{invoice?.subscriptionMeta?.planName}</TableCell>
                  <TableCell align="left">{String(invoice?.subscriptionMeta?.billingInterval)?.toLowerCase()}</TableCell>
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
        <PaginatorTemplate totalDocs={invoiceData?.data?.length} limit={invoiceData?.limit} page={invoiceData?.page} totalPages={invoiceData?.totalPages} />
      </div>
    </div>
  );
};

export default OrganizationInvoices;
