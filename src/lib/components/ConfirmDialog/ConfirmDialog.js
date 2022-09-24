import { Button, Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const ConfirmDialog = ({
  open,
  title,
  styles,
  content,
  action,
  handleClose,
  actionName,
  type,
}) => {
  return (
    <Dialog open={true} onClose={() => handleClose()}>
      <div >
        <div >
          <span>{title}</span>
          <span onClick={() => handleClose()}>
            <CloseIcon style={{ color: "#555" }} />
          </span>
        </div>
        <div className={styles.dialogContent}>
          <p>{content}</p>
        </div>
        <div className={styles.dialogFooter}>
          <Button onClick={() => handleClose()} color="secondary">
            Close
          </Button>
          <Button
            className={styles.btn}
            variant="contained"
            color="secondary"
            onClick={() => {
              handleClose();
              action();
            }}
          >
            {actionName}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
