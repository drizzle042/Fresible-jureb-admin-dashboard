import React, { useState, useRef, useContext, useEffect } from "react";
import usePost from "../../lib/components/Hooks/Requests/usePost";
import { Account } from "../../lib/components/Endpoints/Endpoints";
import LoaderComponent from "../../lib/components/LoaderComponent/Loader";
import FetchError from "../../lib/components/Hooks/FetchError";
import Feedback from "../../lib/components/Feedback/Feedback";
import Layout from "../Layout/Layout";
import { UserAccount } from "../../App";
import styles from "./styles/styles.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import CustomHook from "./useCustomHook/CustomHook";
import info  from  "../../lib/assets/images/info.svg";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const Settings = () => {

  const { hooksContent } = CustomHook();
  const [page, setPage] = useState(1);
  const [value, setValue] = useState({});

  const navigations = [
    { id: 1, name: 'Profile Settings', details: 'User Profile' },
    { id: 2, name: 'Tax Settings', details: 'Tax Rates' },
    { id: 3, name: 'Security Settings', details: 'Password' },
  ]
  
  const [data, ] = useContext(UserAccount)
  console.log(data)

  const { setImageUrl } = hooksContent;
  useEffect(() => {
    setImageUrl(data?.data?.avatarUploadMeta?.url)
  // eslint-disable-next-line
  }, [])
 
  const {
    userData: { firstName, lastName }
  } = hooksContent;

  const imageRef = useRef();


  // Update Profile function  
  const { 
    postForm, 
    isLoading:updateProfileIsLoading, 
    message:updateProfileMessage, 
    messageSeverity: updateProfileMessageSeverity 
  } = usePost(Account.updateProfile)
  
  // FeedBack controller
  const [openUpdateProfileMessage, setOpenUpdateProfileMessage] = useState(false)
  function closeUpdateProfileMessage(){
    setOpenUpdateProfileMessage(false)
  }

  const [updateProfileFeedbackMessage, setUpdateProfileFeedbackMessage] = useState([])
  useEffect(() => {
    if (typeof(updateProfileMessage?.message) === "string"){
      setUpdateProfileFeedbackMessage([updateProfileMessage?.message])
      setOpenUpdateProfileMessage(true)
    } else if (Array.isArray(updateProfileMessage?.message)){
      let cummulativeMessage = [];
      for (var i of updateProfileMessage?.message) {
        for (var n of Object.values(i)) {
          cummulativeMessage.push(n)
        }
      }
      setUpdateProfileFeedbackMessage(cummulativeMessage)
      setOpenUpdateProfileMessage(true)
      } else if (updateProfileMessage?.status === "SUCCESS"){
        setUpdateProfileFeedbackMessage([updateProfileMessage?.status])
        setOpenUpdateProfileMessage(true)
        }
    // eslint-disable-next-line
  }, [updateProfileMessage])


  function UserProfilePage(){

    const submitProfile = () => {
      let formData = new FormData();
      formData.set("avatarUpload", hooksContent.image)
      formData.set("firstName", hooksContent.firstName)
      formData.set("lastName", hooksContent.lastName)
      postForm("PUT", formData)
    }

    return (
      <div>
        {updateProfileIsLoading && <LoaderComponent />}
        {
          data ?
            <div>
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
              <Button 
                type="submit" 
                variant="contained" 
                color="secondary"
                onClick={submitProfile}>
                Save
              </Button>
            </div> :
            <FetchError />
        }
        {
          updateProfileMessage &&
            updateProfileFeedbackMessage.map((i, index) => (
              <Feedback 
                key={index}
                severity={updateProfileMessageSeverity} 
                message={i}
                open={openUpdateProfileMessage}
                handleClose={closeUpdateProfileMessage} />
            ))
        }
      </div>
    )
  }
  
  const [taxRates, ]= useState([
    {id:1,name:'VAT',rate:7.5,date:'20/20/2022',selected:true},
    {id:2,name:'Capital Gain Tax', rate:2.5,date:'20/20/2022',selected:true},
  ])

  function TaxRatePage(){
    let formData = new FormData();
    const handleChange = (newValue, d) => {
      setValue({...value,[d]:newValue});
      console.log(value)
    };
    return (
      <div>
        <div className="ruby center space-bottom">
          <img className="space-right2" src={info} alt="info" />
          <span className={styles.active}>Select the taxes you are required to pay</span>
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
                        maxDate={new Date()}
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
                        control={<Checkbox size="small" fontSize="small"  color="primary" defaultChecked={d.selected} />}
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

  // Change Password function
  const { 
    postFunc, 
    isLoading:changePasswordIsLoading, 
    message:changePasswordMessage, 
    messageSeverity:changePasswordMessageSeverity 
  } = usePost(Account.changePassword)

  
  // FeedBack controller
  const [openChangePasswordMessage, setOpenChangePasswordMessage] = useState(false)
  function closeChangePasswordMessage(){
    setOpenChangePasswordMessage(false)
  }

  const [changePasswordFeedBackMessage, setChangePasswordFeedBackMessage] = useState([])
  useEffect(() => {
    if (typeof(changePasswordMessage?.message) === "string"){
      setChangePasswordFeedBackMessage([changePasswordMessage?.message])
      setOpenChangePasswordMessage(true)
    } else if (Array.isArray(changePasswordMessage?.message)){
        let cummulativeMessage = [];
        for (var i of changePasswordMessage?.message) {
          for (var n of Object.values(i)) {
            cummulativeMessage.push(n)
          }
        }
        setChangePasswordFeedBackMessage(cummulativeMessage)
        setOpenChangePasswordMessage(true)
      } else if (changePasswordMessage?.status === "SUCCESS"){
        setChangePasswordFeedBackMessage([changePasswordMessage?.status])
        setOpenChangePasswordMessage(true)
        }
    // eslint-disable-next-line
  }, [changePasswordMessage])


  function PasswordPage(){
    let formData = {};

    let passwords = {};
    function checkPassword(newPassword, confirmPassword){
      if (newPassword === confirmPassword){
        return true;
      }else{
        return false
      }
    }
    
    return (
      <div>
          {changePasswordIsLoading && <LoaderComponent />}
          <h2 style={{ marginBottom: 16, fontSize: 20 }}>Change Password</h2>
          <form onSubmit={(e) => {
            e.preventDefault()
            hooksContent.handleSubmit()
          }}>
            <div className={styles.form_group}>
              <label>Current Password</label>
              <TextField
                type="password"
                size="small"
                onChange={(e) => {
                  formData.password = e?.target?.value
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
                  formData.newPassword = passwords?.confirmPassword
                  postFunc("PUT", "application/json", JSON.stringify(formData))
                }
              }}>
              Save
            </Button>
          </form>
          {
            changePasswordMessage &&
              changePasswordFeedBackMessage.map((i, index) => (
                <Feedback 
                  key={index}
                  severity={changePasswordMessageSeverity} 
                  message={i}
                  open={openChangePasswordMessage}
                  handleClose={closeChangePasswordMessage} />
              ))
          }
      </div>
    )
  }

  function getsettingPage(){
    // eslint-disable-next-line
    switch (page){
      case 1: return UserProfilePage();
      case 2: return TaxRatePage();
      case 3: return PasswordPage();
    }
  }

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
};

export default Settings;
