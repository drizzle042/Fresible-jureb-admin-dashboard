import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { Administrators } from "../../../lib/components/Endpoints/Endpoints";

const AddUser = ({ open, handleClose, styles, postFunc, setEndpoint }) => {

  // Post data
  const [formData, setFormData] = useState({});

  // Control useEffect's render
  const [signal, setSignal] = useState(true)
  const isMounted = useRef(true)
  useEffect(() => {
    if (isMounted.current){
      isMounted.current = false
    } else {
      postFunc("POST", "application/json", JSON.stringify(formData))
    }
    // eslint-disable-next-line
  }, [signal])

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
            required
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => setFormData({
                ...formData,
                firstName: e.target.value
              })}
          />
        </div>
        <div className={styles.form_group}>
          <label>Last Name</label>
          <TextField 
            type="text" 
            size="small" 
            fullWidth 
            required
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => setFormData({
                ...formData,
                lastName: e.target.value
              })}
          />
        </div>
        <div className={styles.form_group}>
          <label>Email</label>
          <TextField
            type="email"
            size="small"
            fullWidth
            required
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({
                ...formData,
                email: e.target.value
              })}
          />
        </div>
        <Button
          variant="contained" 
          color="secondary"
          onClick={() => {
            setEndpoint(Administrators.createAdmin)
            setSignal(!signal)
          }}>
          Add User
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;
