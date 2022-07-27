import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import ReactHtmlParser from "react-html-parser";
import Slide from "@mui/material/Slide";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NotificationScreen from "../../assets/Android.png";
import ExcludeImg from "../../assets/Exclude.png";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const PreviewMessageMobile = ({
  styles,
  open,
  handleClose,
  openNewMessage,
  messageData,
  openWebMessage,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <div className={styles.dialog_title}>
        <div className={styles.section_title}>
          <div className={styles.header}>
            <h2>Preview Message</h2>
            <p>See how the notification will come out on different platforms</p>
          </div>
          <div className={styles.CloseIcon}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <DialogContent>
        <div className={styles.preview_message}>
          <div className={styles.content_wrapper}>
            <img
              className={styles.mobile_screen}
              src={NotificationScreen}
              alt="mobile notification"
            />
            <div className={styles.mobile_message}>
              <div className={styles.header}>
                <div>
                  <img src={ExcludeImg} alt="new notification" />
                  <span className={styles.title}>Jureb</span>
                  <span>now</span>
                </div>
                <div>
                  <KeyboardArrowUpIcon className={styles.icon} />
                </div>
              </div>
              <div className={styles.content}>
                <div>{ReactHtmlParser(messageData.text)}</div>
                <div>
                  <img src={messageData.imageUrl} alt={messageData.title} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.changeScreen}>
          <Button onClick={openWebMessage}>Web browser</Button>
          <Button color="secondary">Mobile Application</Button>
        </div>
      </DialogContent>
      <DialogActions>
        <DialogActions>
          <Button variant="outlined" onClick={openNewMessage}>
            Back
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Send Message
          </Button>
        </DialogActions>
      </DialogActions>
    </Dialog>
  );
};

export default PreviewMessageMobile;
