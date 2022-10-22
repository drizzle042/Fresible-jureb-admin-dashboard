import React, {useRef} from "react";
import { useParams } from "react-router-dom"
import useFetch from "../../../lib/components/Hooks/Requests/useFetch";
import LoaderComponent from "../../../lib/components/LoaderComponent/Loader";
import styles from "./styles/styles.module.css";
import Layout from "../../Layout/Layout";
import FetchError from "../../../lib/components/Hooks/FetchError";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import ReactToPrint from 'react-to-print';
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Logo from "../assets/images/jureb-logo.png";
import { moneyFormat } from "../../../lib/components/Helper/formatCurrency";
import { Orgs } from "../../../lib/components/Endpoints/Endpoints";


const OrganizationInvoicespdf = () => {

  const { id } = useParams()

  const componentRef = useRef();

  const {data:invoiceData, isLoading, error} = useFetch(`${Orgs.getOrgInvoices}/?organizationId=${id}`) 

  return (
   <div>
      <Layout>
        <main className={styles.main}>
          { isLoading && <LoaderComponent />}
          { error && <FetchError error={error}/>}
          { invoiceData && 
          <div>
            <Paper sx={{ maxWidth: 650, margin: "auto" }} ref={componentRef}>
              <div style={{display: "flex", justifyContent: "center", paddingTop: "1rem"}}><img src={Logo} alt='logo'></img></div>
              <br />
              <br />
              <h1 style={{textAlign: "center"}}>Transaction Details</h1>
              <br />
              <br />
              <Table>
                {invoiceData?.data?.map((invoice, index) => (
                  <TableBody
                    key={index}>
                    <TableRow>
                      <TableCell
                        className={styles.client_cell}
                        component="th"
                        scope="row"
                      >
                        Payment ID
                      </TableCell>
                      <TableCell align="left">{invoice?.paymentId}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        className={styles.client_cell}
                        component="th"
                        scope="row"
                      >
                      Company Name
                      </TableCell>
                      <TableCell align="left">{invoice?.organizationMeta?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        className={styles.client_cell}
                        component="th"
                        scope="row"
                      >
                        Plan
                      </TableCell>
                      <TableCell align="left">{invoice?.subscriptionMeta?.planName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        className={styles.client_cell}
                        component="th"
                        scope="row"
                      >
                        Subscription Period
                      </TableCell>
                      <TableCell align="left">{invoice?.subscriptionMeta?.billingInterval}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        className={styles.client_cell}
                        component="th"
                        scope="row"
                      >
                        Transaction Date
                      </TableCell>
                      <TableCell align="left"> {new Date(invoice?.paidAt).toLocaleDateString("en-GB")}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        className={styles.client_cell}
                        component="th"
                        scope="row"
                      >
                        Amount Charged
                      </TableCell>
                      <TableCell align="left">{moneyFormat(invoice?.amountPaid)}</TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
            </Paper>
            <br />
            <div style={{display:"flex", justifyContent: "center", background:"#F3F3F6", cursor: "pointer", maxWidth: 650, margin: "auto" }}>
              <ReactToPrint
                trigger={() => (
                  <div style={{ padding: "0.6rem" }}>
                    <p style={{ textAlign: "center" }}><FileDownloadIcon sx={{color: "blue"}}/></p>
                    <p style={{ textAlign: "center", textDecoration:"underline", color:"blue" }}>Reciept.pdf</p>
                  </div>
                )}
                content={() => componentRef.current}
              />
            </div>
          </div>}
        </main>
      </Layout>
   </div>
  );
};

export default OrganizationInvoicespdf;
