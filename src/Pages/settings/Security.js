import { Button, TextField } from "@mui/material";
import React from "react";
import Layout from "../Layout/Layout";
import SettingsLayout from "./components/SettingsLayout";
import styles from "./styles/styles.module.css";
import CustomHook from "./useCustomHook/CustomHook";

const Security = () => {
  const { hooksContent } = CustomHook();
  const {
    userData: { newPassword, currentPassword, confirmPassword },
  } = hooksContent;

  return (
    <Layout>
      <main className={styles.main}>
        <div className={styles.section_title}>
          <h2>Settings</h2>
          <p>Manage who has access to what on Jureb</p>
        </div>
        <SettingsLayout>
          <h2 style={{ marginBottom: 16, fontSize: 20 }}>Change Password</h2>
          <form onSubmit={hooksContent.handleSubmit}>
            <div className={styles.form_group}>
              <label>Current Password</label>
              <TextField
                type="password"
                size="small"
                value={hooksContent.currentPassword}
                onChange={hooksContent.handleChange(currentPassword)}
                fullWidth
                placeholder="***************"
              />
            </div>
            <div className={styles.form_group}>
              <label>New Password</label>
              <TextField
                type="password"
                size="small"
                value={hooksContent.newPassword}
                onChange={hooksContent.handleChange(newPassword)}
                fullWidth
                placeholder="***************"
              />
            </div>
            <div className={styles.form_group}>
              <label>Confirm Password</label>
              <TextField
                type="password"
                size="small"
                value={hooksContent.confirmPassword}
                onChange={hooksContent.handleChange(confirmPassword)}
                fullWidth
                placeholder="***************"
              />
            </div>
            <Button type="submit" variant="contained" color="secondary">
              Save
            </Button>
          </form>
        </SettingsLayout>
      </main>
    </Layout>
  );
};

export default Security;
