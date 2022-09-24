import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, TextField } from "@mui/material";
import usePost from "../../../lib/components/Hooks/usePost";

const AddUser = ({ open, handleClose, styles,handleSearchInput }) => {

  // Make post request
  const { postDataFunc } = usePost(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/administrators`);
  // Post data
  let formData = {};

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className={styles.dialog_title}>
        <div className={styles.section_title}>
          <div className={styles.header}>
            <h2>Add User</h2>
            <p>Add new users to the Jureb software to manage tasks.</p>
          </div>
          <div className={styles.CloseIcon}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <DialogContent>
        <div className={styles.form_group}>
          <label>First Name</label>
          <TextField 
            type="text" 
            size="small" 
            fullWidth 
            placeholder="John"
            onChange={(e) => formData.firstName = e.target.value}
          />
        </div>
        <div className={styles.form_group}>
          <label>Last Name</label>
          <TextField 
            type="text" 
            size="small" 
            fullWidth 
            placeholder="Doe"
            onChange={(e) => formData.lastName = e.target.value}
          />
        </div>
        <div className={styles.form_group}>
          <label>Email</label>
          <TextField
            type="email"
            size="small"
            fullWidth
            placeholder="john@example.com"
            onChange={(e) => formData.email = e.target.value}
          />
        </div>
        <Button
          variant="contained" 
          color="secondary"
          onClick={() => {
            postDataFunc(JSON.stringify(formData), "application/json",handleSearchInput)
            handleClose()
          }}>
          Add User
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;
