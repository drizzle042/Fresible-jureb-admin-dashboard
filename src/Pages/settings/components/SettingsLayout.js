import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/styles.module.css";

const SettingsLayout = ({ children }) => {
  const { pathname } = useLocation();
  const current_path = pathname.split("/")[2];

  return (
    <div className={styles.settings_layout}>
      <div className={styles.links}>
        <ul>
          <li>
            <span>Profile Settings</span>
            <span className={current_path === "profile" ? styles.active : ""}>
              <Link to={`/settings/profile`}>User Profile</Link>
            </span>
          </li>
          <li>
            <span>Security</span>
            <span className={current_path === "security" ? styles.active : ""}>
              <Link to={`/settings/security`}>Password</Link>
            </span>
          </li>
        </ul>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default SettingsLayout;
