import React from "react";
import { Button, FormControl, TextField } from "@mui/material";
import styles from "./styles.module.css";

export const InputField = ({
  label,
  placeholder,
  size,
  type,
  fullWidth,
  required,
  helperText,
  register,
  error,
  name,
  ...props
}) => {
  return (
    <div style={{ width: "100%" }}>
      <label className={styles.label}>
        {label} <span>{required && "*"}</span>
      </label>
      <FormControl fullWidth={fullWidth}>
        <TextField
          className={styles.TextField}
          variant="outlined"
          placeholder={placeholder}
          size={size}
          type={type}
          fullWidth={fullWidth}
          helperText={helperText}
          error={error}
          {...register(`${name}`)}
          {...props}
        />
      </FormControl>
    </div>
  );
};

export function SubmitButton({ title, type, maxWidth }) {
  return (
    <Button className={styles.Button} variant="contained" type={type}>
      {title}
    </Button>
  );
}
