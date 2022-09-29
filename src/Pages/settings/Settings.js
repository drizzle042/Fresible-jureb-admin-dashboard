import React,{useState,useRef} from "react";
import Layout from "../Layout/Layout";
import styles from "./styles/styles.module.css";
import { Button, TextField,Avatar,Table,TableBody,TableCell,TableHead,TableRow,Paper,TableContainer,Checkbox,FormControlLabel,InputAdornment } from "@mui/material";
import CustomHook from "./useCustomHook/CustomHook";
import LoaderComponent from "../../lib/components/LoaderComponent/Loader";
import LoaderComponent2 from "../../lib/components/LoaderComponent/LoaderSpinner";
import FetchError from "../../lib/components/Hooks/FetchError";
import info  from  "../../lib/assets/images/info.svg";
import useFetch from "../../lib/components/Hooks/useFetch";
import usePost from "../../lib/components/Hooks/usePost";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const Settings = () => {
  const [page, setPage] = useState(1);
  const [value, setValue] = useState({});
  const navigations =[
    {id:1,name:'Profile Settings',details:'User Profile'},
    {id:2,name:'Tax Settings',details:'Tax Rates'},
    {id:3,name:'Security Settings',details:'Password'},
  ]
  const taxRates =[
    {id:1,name:'VAT',rates:7.5,date:'20/20/2022',selected:true},
    {id:2,name:'PAYE',rate: 7.5,date:'20/20/2022',selected:true},
    {id:3,name:'Company Income Tax',date:'20/20/2022',rate:7.5,selected:true},
    {id:3,name:'Witholding Tax',rate:7.5,date:'20/20/2022',selected:true},
    {id:3,name:'Capital Gain Tax',rate:7.5,date:'20/20/2022',selected:true},
    {id:3,name:'Stamp Duties',rate: 7.5,date:'20/20/2022',selected:true},
    {id:3,name:'Education Tax (EDT)',rate:7.5,date:'20/20/2022',selected:true},
    {id:3,name:'Petroleum Profit Tax (PPT)',rate:7.5,date:'20/20/2022',selected:true},
    {id:3,name:'Custom and Excise Duties',rate:7.5,date:'20/20/2022',selected:true},
  ]

  const { hooksContent } = CustomHook();
  let passwords = {};
  const { postDataFunc } = usePost(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/administrators`);

  const { data, isLoading, error } = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/account`)
  // Post request
  const { handleSubmit, submitForm,isLoading:isLoading2 } = usePost(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/account`)

 
  const {
    userData: { firstName, lastName, email }
  } = hooksContent;

  const imageRef = useRef();

  return (
    <Layout>
     
    <main className={styles.main}>
    <div className={styles.settings_layout}>
      <div className={styles.links}>
        <ul>
          {navigations.map((d)=>{
            return (
              <li key={d.id} onClick={() => setPage(d.id)} style={{marginBottom :'20px'}}>
                <span style={{marginBottom :'5px'}}>{d.name}</span>
                <span className={[page===d.id ? styles.active : ""].join(' ')} style={{cursor:'pointer'}}>
                  {d.details}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
      
      <div className={styles.content}>
        {getsettingPage()}
      </div>
    </div>
    </main>
    </Layout>
  );

  function getsettingPage(){
    // eslint-disable-next-line
    switch (page){
      case 1: return UserProfilePage();
      case 2: return TaxRatePage();
      case 3: return PasswordPage();
    }
  }

  function UserProfilePage(){
    let formData = new FormData();
    return (
      <div>
        {isLoading && <LoaderComponent />}
        {error && <FetchError error={error} />}
        {data && <div>
            <form onSubmit={(e) => {
              e.preventDefault()
              handleSubmit(submitForm(formData))}}>
              <div className={styles.upload_wrapper}>
                <div>
                  <Avatar
                    alt={`${data?.data?.lastName} ${data?.data?.firstName}`}
                    src={hooksContent.imageUrl}
                    sx={{ width: 76, height: 76 }}
                  />
                  <input
                    accept=".png, .jpg, .jpeg, .gif"
                    onChange={hooksContent.onImageChange}
                    type="file"
                    style={{ display: "none" }}
                    ref={imageRef}
                  />
                </div>
                <div>
                  <Button
                    onClick={() => imageRef.current.click()}
                    variant="outlined"
                    color="secondary"
                  >
                    Upload Image
                  </Button>
                </div>
              </div>
              <div className={styles.form_group}>
                <label>First Name</label>
                <TextField
                  type="text"
                  size="small"
                  value={hooksContent.firstName}
                  onChange={hooksContent.handleChange(firstName)}
                  fullWidth
                  placeholder={data?.data?.firstName}
                />
              </div>
              <div className={styles.form_group}>
                <label>Last Name</label>
                <TextField
                  type="text"
                  value={hooksContent.lastName}
                  onChange={hooksContent.handleChange(lastName)}
                  size="small"
                  fullWidth
                  placeholder={data?.data?.lastName}
                />
              </div>
              {data?.data?.roleName !== "ROOT" ?
              <div className={styles.form_group}>
                <label>Email</label>
                <TextField
                  type="email"
                  value={hooksContent.email}
                  onChange={hooksContent.handleChange(email)}
                  size="small"
                  fullWidth
                  placeholder={data?.data?.email}
                />
              </div> :
              ""
              }

              <Button 
                type="submit" 
                variant="contained" 
                color="secondary"
                startIcon={isLoading2 && <LoaderComponent2 />}
                onClick={() => {
                  formData.set("avatarUpload", hooksContent.image)
                  formData.set("firstName", hooksContent.firstName)
                  formData.set("lastName", hooksContent.lastName)
                }}>
                Save
              </Button>
            </form>
        </div>}
      </div>
    )
  }
  
 
  function TaxRatePage(){
    let formData = new FormData();
    const handleChange = (newValue,d) => {
      setValue({...value,[d]:newValue});
      console.log(value)
    };
    return (
      <div>
        <div className="ruby center space-bottom">
          <img className="space-right2" src={info} alt="info" />
          <span className={styles.active}>Select the  taxes you are required to pay</span>
        </div>

         <TableContainer className={styles.table_container} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className={styles.thead}>
              <TableRow>
                <TableCell className={styles.thead_cell}>Tax Name</TableCell>
                <TableCell className={styles.thead_cell} align="left">
                 Rates(%)
                </TableCell>
                <TableCell className={styles.thead_cell} align="left">
                 Date to be Paid
                </TableCell>
                <TableCell className={styles.thead_cell} align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taxRates?.map((d, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className={styles.client_cell} component="th" scope="row" >
                    {d.name}
                  </TableCell>
                  <TableCell  >
                  <TextField size="small" variant='outlined' defaultValue={d.rate}  InputProps={{startAdornment: (
                          <InputAdornment position="start">
                            <div className="sign">%</div>
                          </InputAdornment> ),  }} />
                    
                  </TableCell>
                  <TableCell  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        label="Date"
                        inputFormat="MM/dd/yyyy"
                        value={value["name"+d.id]}
                        onChange={(e)=>handleChange(e,"name"+d.id)}
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
                  </TableCell>
                  <TableCell align="center" >
                    <FormControlLabel
                        value="VAT(7.5%)"
                        control={<Checkbox size="small" fontSize="small"  color="primary" defaultChecked={data.selected} />}
                      
                        size="small"
                        fontSize="small"
                      />
                  </TableCell>
                 </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className='space-top padding-bottom'>
        <Button 
                type="submit" 
                variant="contained" 
                color="secondary"
                onClick={() => {
                  formData.set("avatarUpload", hooksContent.image)
                  formData.set("firstName", hooksContent.firstName)
                  formData.set("lastName", hooksContent.lastName)
                }}>
                Save
              </Button>
        </div>
      </div>
    )
  }

  function PasswordPage(){
    let formData = {};
    function checkPassword(newPassword, confirmPassword){
      if (newPassword === confirmPassword){
        return true;
      }else{
        return false
      }
    }
    
    return (
      <div>
          <h2 style={{ marginBottom: 16, fontSize: 20 }}>Change Password</h2>
          <form onSubmit={(e) => {
            e.preventDefault()
            hooksContent.handleSubmit()}}>
            <div className={styles.form_group}>
              <label>Current Password</label>
              <TextField
                type="password"
                size="small"
                onChange={(e) => {
                  formData.password = e?.target?.value;
                }}
                fullWidth
                placeholder="***************"
              />
            </div>
            <div className={styles.form_group}>
              <label>New Password</label>
              <TextField
                type="password"
                size="small"
                onChange={(e) => {
                  passwords.newPassword = e.target.value;
                }}
                fullWidth
                placeholder="***************"
              />
            </div>
            <div className={styles.form_group}>
              <label>Confirm Password</label>
              <TextField
                type="password"
                size="small"
                onChange={(e) => {
                  passwords.confirmPassword = e.target.value;
                }}
                fullWidth
                placeholder="***************"
              />
            </div>
            <Button 
              type="submit" 
              variant="contained" 
              color="secondary"
              onClick={() => {
                if (checkPassword(passwords?.newPassword, passwords?.confirmPassword) === true){
                  formData.newPassword = passwords?.confirmPassword;
                  postDataFunc(JSON.stringify(formData), "application/json")
                }
              }}>
              Save
            </Button>
          </form>
      </div>
    )
  }
};

export default Settings;
