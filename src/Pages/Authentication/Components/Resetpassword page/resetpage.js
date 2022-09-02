import { Button } from "@mui/material";
import React from "react";

import JurebLogo from "../../../../lib/assets/images/jureb-logo.png";

import { InputField } from "../Input";
import styles from "./styles/styles.module.css";

import CustomHook from "./useCustomHook/CustomHook";

function Resetpage() {
  const { handleSubmit, errors, submitForm, register } = CustomHook();

  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.logoWrapper}>
            <img className={styles.logo} src={JurebLogo} alt="Jureb" />
          </div><br></br>
          <h2>Reset Password</h2> <br></br>
          {/* <div className={styles.resettext}><p>Enter the email address you used to register with Jureb and we'll 
            send you instructions to reset your password</p><br></br><br></br></div> */}
          <section className={styles.contentSection}>
            <form onSubmit={handleSubmit(submitForm)}>
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
              <div className={styles.inputWrapper}>
                <InputField
                  size="medium"
                  placeholder="************"
                  type="password"
                  label="Confirm Password"
                  fullWidth={true}
                  name={"confirmPassword"}
                  register={register}
                  error={errors.password ? true : false}
                  helperText={errors?.password?.message}
                />
              </div>
              
              
              <div className={styles.buttonWrapper}>
                <Button
                  size="medium"
                  color="secondary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                Send
                </Button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Resetpage
