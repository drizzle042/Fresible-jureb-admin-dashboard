import React from "react";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Notification from "../../../../lib/assets/images/notification.png";
import DefaultImg from "../../../../lib/components/defaultImg";
import styles from "../../styles/styles.module.css";
import useFetch from "../../../../lib/components/Hooks/useFetch";
import { Link, useLocation } from "react-router-dom";
import AdminLogs from "../AdminLogs/AdminLogs";

const Header = ({ handleDrawerToggle, handleSearchInput }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [opens, setOpens] = React.useState(false);
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
      subtitle:"Get insights to everything happening on jureb here"
    },
    'organizations':{
      title:"Subscribers",
      subtitle:"Get insights to accounts on jureb here"
    },
    'organizations-activities':{
      title:"User Activities",
      subtitle:"Monitor all organizations' activities on Jureb"
    },
    'subs-by-location':{
      title:"Subscribers By Location",
      subtitle:"Get insights to accounts on jureb here"
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
  const { data:profileData } = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/account`)
  
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
            {profileData?.data && 
              <span style={{ display: "flex" }} onClick={handleClick}>
                {profileData?.data?.avatarUploadMeta?.url ? 
                  <img style={{width: "40px", height: "40px", borderRadius: "50%"}} src={profileData?.data?.avatarUploadMeta?.url} alt={profileData?.data?.lastName} /> :
                  <DefaultImg name={profileData?.data?.lastName}/> }
                  <span>{profileData?.data?.lastName} {profileData?.data?.firstName}</span>
                  <KeyboardArrowDownIcon sx={{ color: "black" }} />
              </span>
            }
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
              <Link to='/settings/profile'> <Typography sx={{ p: 2 }}   style={{width: '10rem', marginLeft:"2rem"}}>Profile</Typography></Link>
              <Typography sx={{ p: 2 }}  style={{width: '10rem', marginLeft:"2rem", color: '#EB5757',}}>Logout</Typography>
            </Popover>
            </div>
          </div>
        </div>
        <AdminLogs open={opens} setOpen={setOpens} />
      </div>
    </div>
  );
};

export default Header;