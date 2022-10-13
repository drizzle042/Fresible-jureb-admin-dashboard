import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import {Link} from "react-router-dom"
import JurebLogo from "../../../lib/assets/images/jureb-logo.png";
import Feedback from "../../../lib/components/Feedback/Feedback";
import LoaderComponent from "../../../lib/components/LoaderComponent/Loader";
import { InputField } from "../Components/Input";
import styles from "./styles/styles.module.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../../lib/components/Validations/authentication";
import usePost from "../../../lib/components/Hooks/Requests/usePost";
import { Authentication } from "../../../lib/components/Endpoints/Endpoints";

const SignIn = () => {
  
  localStorage.clear();
  // Hook to make requests
  const { postFunc, message, messageSeverity, isLoading } = usePost(Authentication.generateAuthTokens);

  // Controls the snack bar for user feedback 
  const [feedBackMessage, setFeedBackMessage] = useState("")
  const [openSnackBar, setOpenSnackBar] = useState(false)
  function closeSnackBar(){
    setOpenSnackBar(false)
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (message?.data?.accessToken){
      // if backend message contains the auth response token needed
      // keep the snackbar closed because there's no need to open
      setOpenSnackBar(false);
      // Put the auth response token in local storage to use globally when making future requests
      localStorage.setItem("user-tokens", String(message?.data?.accessToken))
      // programmatically navigate to overview
      navigate("/overview")
    } else if (message?.message) {
        // else if backend message contains an error message for any reason
        // open the snack bar
        setOpenSnackBar(true);
        // set feedback to backend message for the user
        setFeedBackMessage(message?.message)
    }
  // eslint-disable-next-line
  }, [message])

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signInSchema),
    mode: "all",
  });

  const submitForm = (formData) => {
    postFunc("POST", "application/json", JSON.stringify(formData))
  };

  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <div className={styles.content}>
          { isLoading && <LoaderComponent /> }
          <div className={styles.logoWrapper}>
            <img className={styles.logo} src={JurebLogo} alt="Jureb" />
          </div>
          <h2>Welcome Back</h2>
          <section className={styles.contentSection}>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className={styles.inputWrapper}>
                <InputField
                  size="medium"
                  placeholder="Enter email address"
                  type="email"
                  label="Email Address"
                  fullWidth={true}
                  name={"email"}
                  register={register}
                  error={errors.email ? true : false}
                  helperText={errors?.email?.message}
                />
              </div>
              <div className={styles.inputWrapper}>
                <InputField
                  size="medium"
                  placeholder="************"
                  type="password"
                  label="Password"
                  fullWidth={true}
                  name={"password"}
                  register={register}
                  error={errors.password ? true : false}
                  helperText={errors?.password?.message}
                />
              </div>
              <div>
              <Link to="/request-password-reset">
                <p style={{color:"blue", textAlign: "right"}}>Forgot Password?</p>
              </Link>
              </div>
              <div className={styles.buttonWrapper}>
                <Button
                  size="medium"
                  color="secondary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </form>
          </section>
          <Feedback 
            severity={messageSeverity} 
            message={feedBackMessage}
            open={openSnackBar}
            handleClose={closeSnackBar} />
        </div>
      </main>
    </div>
  );
};

export default SignIn;
