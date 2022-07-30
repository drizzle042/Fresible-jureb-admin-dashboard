import { Button, TextField } from "@mui/material";
import React from "react";
import Layout from "../Layout/Layout";
import SettingsLayout from "./components/SettingsLayout";
import styles from "./styles/styles.module.css";
import CustomHook from "./useCustomHook/CustomHook";
import usePost from "../../lib/components/Hooks/usePost";

const Security = () => {
  const { hooksContent } = CustomHook();
  const {
    userData: { currentPassword },
  } = hooksContent;
  let formData = {};
  const tokens = JSON.parse(localStorage.getItem("user-tokens")) || {};
  formData.token = tokens?.data?.accessToken;

  let passwords = {};
  function checkPassword(newPassword, confirmPassword){
    if (newPassword === confirmPassword){
      return true;
    }else{
      return false
    }
  }
  const { postDataFunc } = usePost(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/administrators`);

  return (
    <Layout>
      <main className={styles.main}>
        <div className={styles.section_title}>
          <h2>Settings</h2>
          <p>Manage who has access to what on Jureb</p>
        </div>
        <SettingsLayout>
          <h2 style={{ marginBottom: 16, fontSize: 20 }}>Change Password</h2>
          <form onSubmit={(e) => {
            e.preventDefault()
            hooksContent.handleSubmit()}}>
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
                  formData.password = passwords?.confirmPassword;
                  console.log(formData)
                  postDataFunc(JSON.stringify(formData), "application/json")
                }
              }}>
              Save
            </Button>
          </form>
        </SettingsLayout>
      </main>
    </Layout>
  );
};

export default Security;
