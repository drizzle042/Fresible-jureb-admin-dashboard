import React from "react";
import Search from "./components/Search";
import styles from "./styles/styles.module.css";
import Layout from "../../Layout/Layout";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import CustomHook from "./useCustomHook/CustomHook";
import useFetch from "../../../lib/components/Hooks/useFetch";
import LoaderComponent from "../../../lib/components/LoaderComponent/Loader";
import FetchError from "../../../lib/components/Hooks/FetchError";
import usePaginator from "../../../lib/components/Hooks/PaginatorTemplate";

const SubsByLocation = () => {
    const { hooksContent } = CustomHook();
  
    // Pagination
    const { pageNumber, PaginatorTemplate } = usePaginator();
  
    // Get requests
    const {data, isLoading, error} = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/organizations/by-location?page=${pageNumber}`);

    return (
      <Layout>
        <main className={styles.main}>
          <section>
            <Search styles={styles} hooksContent={hooksContent} />
          </section> 
          <br/>
          <br/>
          <TableContainer className={styles.table_container} component={Paper}>
            <Table sx={{ minWidth: 650, fontWeight: "bold" }} aria-label="simple table">
                <TableHead className={styles.thead}>
                  <TableRow>
                      <TableCell className={styles.thead_cell}>Client</TableCell>
                      <TableCell className={styles.thead_cell} align="left">Address</TableCell>
                      <TableCell className={styles.thead_cell} align="left">Join Date</TableCell>
                      <TableCell className={styles.thead_cell} align="left">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                { isLoading && <LoaderComponent />}
                <TableRow>{ error && <FetchError error={error}/>}</TableRow>
                {data?.data?.map((subscriber, index) => (
                    <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 },  backgroundColor: index % 2 === 0 ? "#F3F3F6" : "#fff" }}
                    >
                    <TableCell 
                      className={styles.client_cell}
                      component="th"
                      scope="row">
                        {subscriber?.name}
                    </TableCell>
                    <TableCell align="left">{subscriber?.address?.houseNo} {subscriber?.address?.street} {subscriber?.address?.city} {subscriber?.address?.lga}, {subscriber?.address?.state}, {subscriber?.address?.country}</TableCell>
                    <TableCell align="left">{new Date(subscriber?.joinDate)?.toLocaleDateString("en-GB")}</TableCell>
                    <TableCell align="left">
                        <span
                          className={
                          subscriber?.status === "ACTIVE"
                            ? styles.status_active
                            : subscriber?.status === "EXPIRED"
                            ? styles.status_expired
                            : subscriber?.status === "INACTIVE"
                            ? styles.status_expired
                            : ""
                        }>{subscriber?.status?.toLowerCase()}</span>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
          </TableContainer>
          <PaginatorTemplate totalDocs={data?.data?.length} limit={data?.limit} page={data?.page} totalPages={data?.totalPages} />
        </main>
      </Layout>
    );
};

export default SubsByLocation;