import React, {useEffect, useRef, useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Administrators } from "../../../lib/components/Endpoints/Endpoints";

const Tab = ({ styles, data, postFunc, setEndpoint }) => {
  
  // Control useEffect's render
  const [signal, setSignal] = useState(true)
  const isMounted = useRef(true)
  useEffect(() => {
    if (isMounted.current){
      isMounted.current = false
    } else {
      postFunc("PUT")
    }
    // eslint-disable-next-line
  }, [signal])

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
          <TableBody>
            {data?.data?.map((user, index) => (
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
                            onClick={()=> {
                              setEndpoint(Administrators.deactivateAdmin + `/?id=${user?.id}`)
                              setSignal(!signal)
                            }}>
                              Deactivate
                          </Button>
                        : user?.status === "INACTIVE"
                        ? <Button 
                            variant="outlined" 
                            color="success"
                            onClick={()=> {
                              setEndpoint(Administrators.activateAdmin + `/?id=${user?.id}`)
                              setSignal(!signal)
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
    </div>
  );
};

export default Tab;
