import { Button } from "@mui/material";
import React from "react";
import {Link} from "react-router-dom"
import JurebLogo from "../../../lib/assets/images/jureb-logo.png";

import { InputField } from "../Components/Input";
import styles from "./styles/styles.module.css";

import CustomHook from "./useCustomHook/CustomHook";

const SignIn = () => {
  const { handleSubmit, errors, submitForm, register } = CustomHook();

  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <div className={styles.content}>
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
              <Link to="/reset-password"><p style={{color:"blue", textAlign: "right"}}>Forgot Password?</p></Link>
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
        </div>
      </main>
    </div>
  );
};

export default SignIn;
