import * as yup from "yup";

const signInSchema = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const forgotPasswordSchema = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
});

const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password should be at least minimum 6 characters"),
  confirmPassword: yup
    .string()
    .required("Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
const signUpSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password should be at least minimum 6 characters"),
  confirmPassword: yup
    .string()
    .required("Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
const verifyOTPSchema = yup.object({
  otp: yup
    .string()
    .trim()
    .required("OTP is required for verification")
    .matches(/^[0-9]*$/, "Invalid OTP format")
    .min(5, "OTP should be at least 5 characters"),
});

export {
  signInSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  signUpSchema,
  verifyOTPSchema,
};
