import { Button, Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const ConfirmDialog = ({
  open,
  styles,
  content,
  action,
  handleClose,
  actionColor,
  type,
}) => {
  return (
    <Dialog open={open} onClose={() => handleClose(type)}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalHeader}>
          <span>Confirm Action</span>
          <span onClick={() => handleClose(type)}>
            <CloseIcon style={{ color: "#555" }} />
          </span>
        </div>
        <div className={styles.dialogContent}>
          <p>{content}</p>
        </div>
        <div className={styles.dialogFooter}>
          <Button onClick={() => handleClose(type)} color="secondary">
            Close
          </Button>
          <Button
            className={styles.btn}
            color={actionColor}
            variant="contained"
          >
            {action}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
