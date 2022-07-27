import React from "react";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Feedback = ({ severity, open, handleClose, message }) => {
  const [state] = React.useState({
    vertical: "top",
    horizontal: "right",
  });

  const { vertical, horizontal } = state;
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        style={{ fontWeight: 400 }}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Feedback;
