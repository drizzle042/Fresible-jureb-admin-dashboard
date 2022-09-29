import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import usePut from "../../../lib/components/Hooks/usePut";
import useFetch from "../../../lib/components/Hooks/useFetch";
import LoaderComponent from "../../../lib/components/LoaderComponent/Loader";
import LoaderComponent2 from "../../../lib/components/LoaderComponent/LoaderSpinner";
import usePaginator from "../../../lib/components/Hooks/PaginatorTemplate";

const TabBody = ({ styles, data,type,handleSearchInput }) => {
  
  const { putFunc: deactivate, isLoading:deactiveLoading } = usePut(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/administrators/deactivate?id=`);
  const { putFunc: activate, isLoading:activeLoading } = usePut(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/administrators/activate?id=`);

  const {data:data1, handleSearchInput:handleSearchInput1} = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/administrators?status=ACTIVE`)
  const {data:data2, handleSearchInput:handleSearchInput2 } = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/administrators?status=INACTIVE`)


  let datas = data?.data;
  // eslint-disable-next-line
  switch (type){
    case 1: 
      //datas= datas?.filter(i => i.status === "ACTIVE"); 
      datas=data1?.data
      handleSearchInput=handleSearchInput1
      break;
    case 2: 
      //datas=datas?.filter(i => i.status === "INACTIVE"); 
      datas=data2?.data
      handleSearchInput=handleSearchInput2
      break;
  }
  const { PaginatorTemplate } = usePaginator()
  return (
    <div>
      <TableContainer className={styles.table_container} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className={styles.thead}>
            <TableRow>
              <TableCell className={styles.thead_cell}>
                Name
              </TableCell>
              <TableCell className={styles.thead_cell} align="left">
                Email
              </TableCell>
              <TableCell className={styles.thead_cell} align="left">
                Status
              </TableCell>

              <TableCell className={styles.thead_cell} align="left">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          {(deactiveLoading || activeLoading) && <LoaderComponent/>}
          <TableBody>
            {datas?.map((user, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <span className={styles.cell_message}>{user?.lastName} {user?.firstName}</span>
                </TableCell>
                <TableCell align="left">{user?.email}</TableCell>
                <TableCell align="left">
                  <span
                    className={
                      user?.status === "ACTIVE"
                        ? styles.status_active
                        : user?.status === "INACTIVE"
                        ? styles.status_inactive
                        : ""
                    }
                  >
                    {String(user?.status).toLowerCase()}
                  </span>
                </TableCell>

                <TableCell align="left">
                  <span>
                    {
                      user?.status === "ACTIVE"
                        ? <Button 
                            variant="outlined" 
                            color="error"
                            startIcon={(deactiveLoading && false) && <LoaderComponent2 />}
                            onClick={()=> {
                              deactivate(user?.id,handleSearchInput)
                            }}>
                              Deactivate
                          </Button>
                        : user?.status === "INACTIVE"
                        ? <Button 
                            variant="outlined" 
                            color="success"
                            startIcon={(activeLoading && false) && <LoaderComponent2 />}
                            onClick={()=> {
                              activate(user?.id,handleSearchInput)
                            }}>
                              Make active
                          </Button>
                        : ""
                    }
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data && <PaginatorTemplate totalDocs={datas?.length} limit={data?.limit} page={data?.page} totalPages={data?.totalPages} />}
    </div>
  );
};

export default TabBody;
