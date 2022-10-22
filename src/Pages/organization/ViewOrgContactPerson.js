import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, IconButton,MenuItem, Select, TextField, InputAdornment} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Layout from "../Layout/Layout";
import styles from "./styles/styles.module.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import useFetch from "../../lib/components/Hooks/Requests/useFetch";
import LoaderComponent from "../../lib/components/LoaderComponent/Loader";
import FetchError from "../../lib/components/Hooks/FetchError";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Users } from "../../lib/components/Endpoints/Endpoints";

const ViewOrgContactPerson = () => {

  const [filter, setFilter] = useState({
    text: "",
    period:"",
    status:"ACTIVE"
  })

  const { id } = useParams();
  const { data, isLoading, error } = useFetch(`${Users.getUser}/?id=${id}`)

  const navigate = useNavigate();

  function form(title, value){
    return (
      <div>
        <div className="ruby space-top2">
          <span style={{color:'#6C6B80'}}>{title}:</span>
          <span className="space-left2 bold">{value}</span>
        </div>
      </div>
    )
  }

  function viewCard(){
    return (
      <div>
        <div>
          <section style={{ marginTop: 24 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4} lg={5}>
                <div className={[styles.payment_info,'padding2'].join(' ')}>
                    <div style={{fontWeight: "500,",fontSize: "24px",lineHeight: "28px",marginTop:'15px'}}>{data?.data?.lastName} {data?.data?.firstName}</div>
                    <div>
                      <div className="ruby space-top2">
                        <span style={{color:'#6C6B80'}}>Phone number:</span>
                        <span className="space-left2 bold" style={{color: "blue"}}><a href={`tel:${data?.data?.phone}`}>{data?.data?.phone}</a></span>
                      </div>
                      <div className="ruby space-top2">
                        <span style={{color:'#6C6B80'}}>Email:</span>
                        <span className="space-left2 bold" style={{color: "blue"}}><a href={`mailto:${data?.data?.email}`}>{data?.data?.email}</a></span>
                      </div>
                      {form('Organizations', data?.data?.organizations?.length)}
                    </div>
                </div>
              </Grid>
            </Grid>
          </section>
        
        </div>
      </div>
    )
  }

  function viewBusiness(){
    return (
      <div >
      <div className={styles.filters}>
       
      <div className={styles.search_bar}>
        <TextField
          className={styles.input}
          fullWidth
          size="small"
          placeholder="Enter Text Here..."
          value={filter?.text}
          onChange={(e)=> setFilter({
            ...filter, 
            text: e.target.value
          })}
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
            value={filter?.status}
            onChange={(e)=> setFilter({
              ...filter, status: e.target.value
            })}
            displayEmpty
          >
            <MenuItem disabled value="">
              Status
            </MenuItem>
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="EXPIRED">Expired</MenuItem>
            <MenuItem value="INACTIVE">Inactive</MenuItem>
          </Select>
        </div>
      </div>
      <div style={{ marginTop: 24 }}>
        <TableContainer className={styles.table_container} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className={styles.thead}>
              <TableRow>
                <TableCell className={styles.thead_cell} align="left">
                 Business Name
                </TableCell>
                <TableCell className={styles.thead_cell} align="left">
                 Email Address
                </TableCell>
                <TableCell className={styles.thead_cell} align="left">
                  Join Date
                </TableCell>
                <TableCell className={styles.thead_cell} align="left">
                  Position
                </TableCell>
                <TableCell className={styles.thead_cell} align="left">
                  Status
                </TableCell>
                <TableCell className={styles.thead_cell}>
                  Users
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data?.organizations?.map((d, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    className={styles.client_cell}
                    component="th"
                    scope="row"
                  >
                    {d?.name}
                  </TableCell>
                  <TableCell align="left">
                    {d?.email}
                  </TableCell>
                  <TableCell align="left">
                    {new Date(d?.profile?.createdAt).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell align="left">{d?.profile?.role?.toLowerCase().split("_").join(" ")}</TableCell>
                  <TableCell align="left">
                  <span
                    className={
                      d?.profile?.status === "ACTIVE"
                        ? styles.status_active
                        : d?.status === "EXPIRED"
                        ? styles.status_expired
                        : d?.status === "INACTIVE"
                        ? styles.status_expired
                        : ""
                    }
                  >
                    {String(d?.profile?.status).toLowerCase()}
                  </span>
                  </TableCell>
                  <TableCell align="left">{d?.users}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      </div>
    )
  }

  return (
    <Layout>
      <main className={styles.main}>
        <IconButton onClick={() => navigate(-1)}>
          <KeyboardBackspaceIcon />
        </IconButton>
        {isLoading && <LoaderComponent />}
        {error && <FetchError error={error.message}/>}
        {
          data && 
          <>
            {viewCard()}
            <section style={{ marginTop: 24 }}>
                {viewBusiness()}
            </section>
          </>
        }
      </main>
    </Layout>
  );
};

export default ViewOrgContactPerson;
