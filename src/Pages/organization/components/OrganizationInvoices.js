import React, {useState, useEffect} from "react";
import { MenuItem, Select, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
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

  const [searchUrl, setSearchUrl] = useState({
    dateFrom: "",
    dateTo: "",
    plan: "",
    period: "",
  });

  const [plan, setPlan] = useState("");

  function handleSelectPlan(e){
    setPlan(e?.target?.value);
    setSearchUrl({
      ...searchUrl,
      plan: e?.target?.value,
    });
  };
  
  const [period, setPeriod] = useState("");

  function handleSelectPeriod(e){
    setPeriod(e?.target?.value);
    setSearchUrl({
      ...searchUrl,
      period: e?.target?.value,
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
        <div className={styles.date_bar}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Date From"
              inputFormat="MM/dd/yyyy"
              value={hooksContent.dateFrom}
              onChange={(e) => {
                hooksContent.setDateFrom(e);
                setSearchUrl({
                  ...searchUrl,
                  dateFrom: e,
                });
              }}
              renderInput={(params) => (
                <TextField
                  className={styles.input}
                  fullWidth
                  size="small"
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </div>
        <div className={styles.date_bar}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Date To"
              inputFormat="MM/dd/yyyy"
              value={hooksContent.dateTo}
              onChange={(e) => {
                hooksContent.setDateTo(e);
                setSearchUrl({
                  ...searchUrl,
                  dateTo: e,
                });
              }}
              renderInput={(params) => (
                <TextField
                  className={styles.input}
                  fullWidth
                  size="small"
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </div>
        <div className={styles.select_bar}>
          <Select
            className={styles.input}
            fullWidth
            size="small"
            value={plan}
            onChange={handleSelectPlan}
            displayEmpty
          >
            <MenuItem disabled value="">
              Plan
            </MenuItem>
            <MenuItem value="simple start">Simple Start</MenuItem>
            <MenuItem value="standard">Standard</MenuItem>
            <MenuItem value="premium">Premium</MenuItem>
          </Select>
        </div>
        <div className={styles.select_bar}>
          <Select
            className={styles.input}
            fullWidth
            size="small"
            value={period}
            onChange={handleSelectPeriod}
            displayEmpty
          >
            <MenuItem disabled value="">
              Period
            </MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="quarterly">Quarterly</MenuItem>
            <MenuItem value="biannually">Bi-Annually</MenuItem>
            <MenuItem value="annually">Annually</MenuItem>
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
                  <Link to={`/organizations/pdf/${clientID}`}>
                    <button className={styles.download_invoice}>
                      Download <img src={downloadImg} alt="download invoice" />
                    </button>
                    </Link>
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
