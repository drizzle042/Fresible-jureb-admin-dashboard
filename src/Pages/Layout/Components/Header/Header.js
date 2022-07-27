import React, { useContext } from "react";
import { SearchDataContext } from "../../../../App";
import Notification from "../../../../lib/assets/images/notification.png";
import UserImg from "../../../../lib/assets/images/user-img.png";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import styles from "../../styles/styles.module.css";
import useFetch from "../../../../lib/components/Hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const Header = ({ handleDrawerToggle }) => {

  // set Search Data Context
  const { handleSearchInput } = useContext(SearchDataContext)
  // Components
  const navigate = useNavigate()
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
        <div>
          <TextField
            className={styles.searchBar}
            size="small"
            placeholder="search subscribers"
            onFocus={() => {
              if(window.location.href !== "/organizations"){
                navigate("/organizations");
              }
            }}
            onInput={(e) => {
              handleSearchInput(e?.target?.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className={styles.searchIcon} />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={styles.headerActionsWrapper}>
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
