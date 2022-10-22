import React, { useState, useContext } from "react";
import { UserAccount } from "../../../../App";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Notification from "../../../../lib/assets/images/notification.png";
import DefaultImg from "../../../../lib/components/defaultImg";
import styles from "../../styles/styles.module.css";
import { Link, useLocation } from "react-router-dom";
import AdminLogs from "../AdminLogs/AdminLogs";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";


const Header = ({ handleDrawerToggle }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [opens, setOpens] = React.useState(false);
  const [state, setState] = useState({});
  const handleDrawerOpen = () => {
    setOpens(true);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const {pathname} = useLocation()
  
  const path = {
    'overview':{
      title: "Overview",
      subtitle:"Get insights to everything happening on Jureb here"
    },
    'organizations':{
      title:"Subscribers",
      subtitle:"Get insights to accounts on Jureb here"
    },
    'organizationUsers':{
      title:"Subscribers",
      subtitle:"Get insights to accounts on Jureb here"
    },
    'organizations-activities':{
      title:"User Activities",
      subtitle:"Monitor all organizations' activities on Jureb"
    },
    'admin-activities':{
      title:"Admin Activities",
      subtitle:"Monitor all admins' activities on Jureb"
    },
    'subs-by-location':{
      title:"Subscribers By Location",
      subtitle:"Get insights to accounts on Jureb here"
    },
    'payments':{
      title:"Payment History",
      subtitle:"See all payments made for the Jureb Subscription"
    },
    'notifications':{
      title:"Push Notification",
      subtitle:"Send targeted messages to your audience"
    },
    'users':{
      title:"Users",
      subtitle:"Manage who has access to what on Jureb"
    },
    'settings':{
      title:"Settings",
      subtitle:"Manage who has access to what on Jureb"
    },
  }
  const checkPath = pathname.split('/')

  // Get profilepic and name
  const [profileData,] = useContext(UserAccount)
 
  const navigate = useNavigate();
  const logout =()=>{
      setState({})
      localStorage.removeItem("user-tokens");
      navigate("/signin");
  }

  return (
    <div className={styles.header}>
      <div className={styles.toggleMenu}>
        <IconButton onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
      </div>
      <div className={styles.headerContent}>
        <div className={styles.section_title}>
          <h2>{path[checkPath[1]].title}</h2>
          <p style={{color: "gray", fontSize: "0.9rem"}}>{path[checkPath[1]].subtitle}</p>
        </div>
        <div className={styles.headerActionsWrapper} style={{marginLeft: "auto"}}>
          <div className={styles.headerActions}>
            <span>
                <img src={Notification} alt="Notification" onClick={handleDrawerOpen}/>
            </span>
            <div className={styles.clickAway}>
              <span style={{ display: "flex" }} onClick={handleClick}>
              {
                profileData?.data && 
                <>
                  {
                    profileData?.data?.avatarUploadMeta?.url ? 
                    <img 
                      style={{width: "40px", height: "40px", borderRadius: "50%"}} 
                      src={profileData?.data?.avatarUploadMeta?.url} 
                      alt={profileData?.data?.lastName} /> :
                    <DefaultImg name={profileData?.data?.lastName}/>}
                    <span>{profileData?.data?.lastName} {profileData?.data?.firstName}</span>
                </>
              }
                <KeyboardArrowDownIcon sx={{ color: "black" }} />
              </span>
            </div>
          </div>
        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          style={{marginTop:"1rem"}}
        >
          <Link to='/settings'> <Typography sx={{ p: 2 }}   style={{width: '10rem', marginLeft:"2rem"}}>Profile</Typography></Link>
          <Typography sx={{ p: 2 }}  style={{width: '10rem', marginLeft:"2rem", color: '#EB5757',cursor:'pointer'}} onClick={()=>setState({...state, logout:true})}>Logout</Typography>
        </Popover>
        <AdminLogs open={opens} setOpen={setOpens} />
        <Dialog open={state?.logout} onClose={() => setState({})}>
          <div >
          <div className={styles.dialog_title}>
            <div className={styles.section_title}>
              <span>Logout</span>
            </div>
            </div>
            <DialogContent>
            <div className={styles.dialogContent}>
              <p>Are you sure you want to logout?</p>
            </div>
            </DialogContent>
            <DialogActions>
            <div className={styles.dialogFooter}>
              <Button onClick={() => setState({})} color="secondary">
                Close
              </Button>
              <Button
                style={{marginLeft:'15px'}}
                className={styles.btn}
                variant="contained"
                color="secondary"
                onClick={() =>logout() }
              >
                Yes
              </Button>
            </div>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Header;