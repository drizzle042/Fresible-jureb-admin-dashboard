import { Grid, IconButton,MenuItem, Select, TextField, Avatar, InputAdornment} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Layout from "../Layout/Layout";
import styles from "./styles/styles.module.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import useFetch from "../../lib/components/Hooks/useFetch";
import LoaderComponent from "../../lib/components/LoaderComponent/Loader";
import FetchError from "../../lib/components/Hooks/FetchError";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import usePaginator from "../../lib/components/Hooks/PaginatorTemplate";

const ViewOrganizationUsers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({status:"ACTIVE", period:""})
  const {PaginatorTemplate} = usePaginator()
  const { isLoading, error } = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/organizations/single?id=${id}`)
  const user={
    name:"Peter Ihaza",
    phone:"08130958234",
    email:'Peterihaza@gmail.com',
    sex:'Male',
    organization:'5',
    business:[
      { id:1, name:'Obembium Ltd',email:'Obembium@gmail.com',date:'8/12/15',position:'SuperAdmin',status:'ACTIVE',users:2 },
      { id:1, name:'Obembium Ltd',email:'Obembium@gmail.com',date:'8/12/15',position:'SuperAdmin',status:'EXPIRED',users:2 },
      { id:1, name:'Obembium Ltd',email:'Obembium@gmail.com',date:'8/12/15',position:'SuperAdmin',status:'INACTIVE',users:2 },
      { id:1, name:'Obembium Ltd',email:'Obembium@gmail.com',date:'8/12/15',position:'SuperAdmin',status:'ACTIVE',users:2 },
    ]
  }

  function form(title,value){
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
                  <Avatar
                      alt={user?.name}
                      src={"JDjD"}
                      sx={{ width: 76, height: 76 }}
                    />
                    <div style={{fontWeight: "500,",fontSize: "24px",lineHeight: "28px",marginTop:'15px'}}>{user?.name}</div>
                    <div>
                      {form('Phone number 1',user.phone)}
                      {form('Phone number 2',user.phone)}
                      {form('Email',user.email)}
                      {form('Sex',user.sex)}
                      {form('Organization',user.organization)}
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
          value={state?.text}
          onChange={(e)=>setState({...state,text:e.target.value})}
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
            value={state?.status}
            onChange={(e)=>setState({...state,status:e.target.value})}
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
              {user?.business?.map((d, index) => (
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
                    {new Date(d?.date).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell align="left">{d?.position}</TableCell>
                  <TableCell align="left">
                  <span
                    className={
                      d?.status === "ACTIVE"
                        ? styles.status_active
                        : d?.status === "EXPIRED"
                        ? styles.status_expired
                        : d?.status === "INACTIVE"
                        ? styles.status_expired
                        : ""
                    }
                  >
                    {String(d?.status).toLowerCase()}
                  </span>
                  </TableCell>
                  <TableCell align="left">{d?.users}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <PaginatorTemplate totalDocs={user?.business?.length} limit={100} page={1} totalPages={1} />
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
        {error && <FetchError error={error}/>}

        {user && viewCard()}
        <section style={{ marginTop: 24 }}>
            {viewBusiness()}
        </section>
      </main>
      
      
    </Layout>
  );
};

export default ViewOrganizationUsers;
