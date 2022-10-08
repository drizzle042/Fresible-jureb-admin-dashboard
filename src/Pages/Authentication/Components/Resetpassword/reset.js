import { Button } from "@mui/material";
import React, { useState } from "react";

import JurebLogo from "../../../../lib/assets/images/jureb-logo.png";

import { InputField } from "../Input";
import styles from "./styles/styles.module.css";

import CustomHook from "./useCustomHook/CustomHook";

function Reset() {

  const { handleSubmit, errors, submitForm, register } = CustomHook();

  const [email, setEmail] = useState("");


  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.logoWrapper}>
            <img className={styles.logo} src={JurebLogo} alt="Jureb" />
          </div><br></br>
          <h2>Forgot Password?</h2> <br></br>
          <div className={styles.resettext}>
            <p>
              Enter the email address you used to register with Jureb
              and we'll send you instructions to reset your password
            </p>
            <br />
            <br />
          </div>
          <section className={styles.contentSection}>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className={styles.inputWrapper}>
                <InputField
                  size="medium"
                  placeholder="Enter email address"
                  type="email"
                  onInput={(e) => {
                    setEmail({
                      ...email,
                      email: e.target.value
                    })
                  }}
                  label="Email Address"
                  fullWidth={true}
                  name={"email"}
                  register={register}
                  error={errors.email ? true : false}
                  helperText={errors?.email?.message}
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

export default Reset

