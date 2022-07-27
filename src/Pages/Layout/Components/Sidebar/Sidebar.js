import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Logo from "../../../../lib/assets/images/jureb-logo.png";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import styles from "../../styles/styles.module.css";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;
const Sidebar = (props) => {
  const { window } = props;
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];

  const drawer = (
    <div
      style={{
        padding: "16px",
        background: "#fff",
      }}
    >
      <div className={styles.logo}>
        <img src={Logo} alt="Jureb" />
      </div>
      <div className={styles.sidebar_links}>
        <div className={styles.main_menu}>Main Menu</div>
        <ul className={styles.list_top}>
          <li>
            <Link
              className={path === "overview" ? styles.active_link : ""}
              to="/overview"
            >
              <span>
                <GridViewOutlinedIcon />
              </span>
              Overview
            </Link>
          </li>
          <li>
            <Link
              className={path === "organizations" ? styles.active_link : ""}
              to="/organizations"
            >
              <span>
                <GroupOutlinedIcon />
              </span>
              Organizations
            </Link>
          </li>
          <li>
            <Link
              className={path === "payments" ? styles.active_link : ""}
              to="/payments"
            >
              <span>
                <CreditCardOutlinedIcon />
              </span>
              Payments
            </Link>
          </li>
          <li>
            <Link
              className={path === "notifications" ? styles.active_link : ""}
              to="/notifications"
            >
              <span>
                <ChatBubbleOutlineOutlinedIcon />
              </span>
              Push Notification
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.sidebar_links}>
        <div className={styles.preference_menu}>Preferences</div>
        <ul>
          <li>
            <Link
              className={path === "users" ? styles.active_link : ""}
              to="/users"
            >
              <span>
                <PersonOutlineOutlinedIcon />
              </span>
              Users
            </Link>
          </li>
          <li>
            <Link
              className={path === "settings" ? styles.active_link : ""}
              to="/settings/profile"
            >
              <span>
                <SettingsOutlinedIcon />
              </span>
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={props.mobileOpen}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              backgroundColor: "#fff",
              width: drawerWidth + 60,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              backgroundColor: "#fff",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {props.children}
    </>
  );
};

export default Sidebar;
