import { Divider, IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import styles from "../../../styles/styles.module.css";
import { useNavigate } from "react-router-dom";

const OrgModal = ({ setOpen }) => {
  const navigate = useNavigate();
  const organizations = ["Cube", "Alawo & Sons", "Johnson & Bakers"];
  const gotoSettings = () => {
    navigate("/account/personal-information");
    setOpen((open) => !open);
  };
  return (
    <div className={styles.orgModal}>
      <div className={styles.header}>
        <span>Your Jureb Account</span>
        <span>
          <IconButton onClick={() => setOpen((open) => !open)}>
            <CloseIcon />
          </IconButton>
        </span>
      </div>
      <Divider />
      <div className={styles.content}>
        <div className={styles.admin}>
          <span>Admin</span>
          <ul>
            {organizations?.slice(0, 3)?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
            <li className={styles.newBusiness}>
              <AddCircleOutlineIcon style={{ width: "20px" }} /> Create a new
              Business
            </li>
          </ul>
        </div>
        <Divider />
        <div className={styles.admin}>
          <span>Employee</span>
          <ul>
            {organizations?.slice(0, 3)?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <Divider />
        <div className={styles.profile}>
          <div>
            You are signed in as <span>jerrytud@gmail.com</span>{" "}
          </div>
          <div onClick={gotoSettings}>
            <PersonOutlineIcon style={{ width: "20px" }} /> Manage Profile
          </div>
        </div>
      </div>
      <Divider />
      <div className={styles.footer}>
        <span>Terms and Privacy</span>
      </div>
    </div>
  );
};

export default OrgModal;
