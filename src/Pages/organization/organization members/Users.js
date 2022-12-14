import React from "react";
import { useParams } from "react-router-dom";
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
import useFetch from "../../../lib/components/Hooks/Requests/useFetch";
import LoaderComponent from "../../../lib/components/LoaderComponent/Loader";
import FetchError from "../../../lib/components/Hooks/FetchError";
import usePaginator from "../../../lib/components/Hooks/PaginatorTemplate";
import { Orgs } from "../../../lib/components/Endpoints/Endpoints";

const Members = () => {

    const { id } = useParams()

    const { hooksContent } = CustomHook();
  
    // Pagination
    const { pageNumber, PaginatorTemplate } = usePaginator();
  
    // Get requests
    const {data, isLoading, error, handleSearchInput} = useFetch(`${Orgs.getOrgsAdmins}/?organizationId=${id}&page=${pageNumber}`);

    return (
      <Layout>
        <main className={styles.main}>
          <Search styles={styles} hooksContent={hooksContent} handleSearchInput={handleSearchInput} />
          <br/>
          { isLoading && <LoaderComponent />}
          { error && <FetchError error={error.message}/>}
          {
            data && 
              <div>
                <TableContainer className={styles.table_container} component={Paper}>
                  <Table sx={{ minWidth: 650, fontWeight: "bold" }} aria-label="simple table">
                      <TableHead className={styles.thead}>
                        <TableRow>
                            <TableCell className={styles.thead_cell}>Name</TableCell>
                            <TableCell className={styles.thead_cell} align="left">Email</TableCell>
                            <TableCell className={styles.thead_cell} align="left">Position</TableCell>
                            <TableCell className={styles.thead_cell} align="left">Role</TableCell>
                            <TableCell className={styles.thead_cell} align="left">Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {data?.data?.map((member, index) => (
                          <TableRow
                          key={index}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 },  backgroundColor: index % 2 === 0 ? "#F3F3F6" : "#fff" }}
                          >
                          <TableCell 
                            component="th"
                            scope="row">
                              {member?.name}
                          </TableCell>
                          <TableCell align="left"><a href={`mailto:${member?.email}`} style={{ color: "blue" }}>{member?.email}</a></TableCell>
                          <TableCell align="left">{member?.position}</TableCell>
                          <TableCell align="left">{member?.role}</TableCell>
                          <TableCell align="left">
                              <span 
                                className={
                                member?.status === "ACTIVE"
                                  ? styles.status_active
                                  : member?.status === "EXPIRED"
                                  ? styles.status_expired
                                  : member?.status === "INACTIVE"
                                  ? styles.status_expired
                                  : ""
                              }>{member?.status?.toLowerCase()}</span>
                          </TableCell>
                          </TableRow>
                      ))}
                      </TableBody>
                  </Table>
                </TableContainer>
                <PaginatorTemplate totalDocs={data?.data?.length} limit={data?.limit} page={data?.page} totalPages={data?.totalPages} />
              </div>
          }
        </main>
      </Layout>
    );
};

export default Members;