import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import ReactHtmlParser from "react-html-parser";
import { IconButton } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const PreviewMessageWeb = ({
  styles,
  handleClose,
  open,
  openNewMessage,
  openMobileMessage,
  messageData,
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
          <div className={styles.web_message}>
            <div className={styles.header}>
              <div>Jureb</div>
              <div className={styles.icon}>
                <CloseIcon />
              </div>
            </div>
            <div className={styles.content}>
              <div>
                <img src={messageData.imageUrl} alt={messageData.title} />
              </div>
              <div>{ReactHtmlParser(messageData.text)}</div>
            </div>
          </div>
        </div>
        <div className={styles.changeScreen}>
          <Button color="secondary">Web browser</Button>
          <Button onClick={openMobileMessage}>Mobile Application</Button>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={openNewMessage}>
          Back
        </Button>
        <Button variant="contained" color="secondary" onClick={handleClose}>
          Send Message
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PreviewMessageWeb;
