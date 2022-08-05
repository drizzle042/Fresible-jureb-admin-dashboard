import React from "react";
import Notification from "../../../../lib/assets/images/notification.png";
import UserImg from "../../../../lib/assets/images/user-img.png";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import styles from "../../styles/styles.module.css";
import useFetch from "../../../../lib/components/Hooks/useFetch";
import { Link } from "react-router-dom";

const Header = ({ handleDrawerToggle, handleSearchInput }) => {
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
        <div className={styles.headerActionsWrapper} style={{marginLeft: "auto"}}>
          <div className={styles.headerActions}>
            <span>
              <Link to="/notifications">
                <img src={Notification} alt="Notification" />
              </Link>
            </span>

            <div className={styles.clickAway}>
              <span style={{ display: "flex" }}>
                <Link style={{ display: "flex" }} to="/settings/profile">
                  <img src={UserImg} alt="Settings" />
                  <span>{profileData?.data?.lastName} {profileData?.data?.firstName}</span>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
