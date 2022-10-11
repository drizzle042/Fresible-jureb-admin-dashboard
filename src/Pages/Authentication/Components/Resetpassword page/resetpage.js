import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import JurebLogo from "../../../../lib/assets/images/jureb-logo.png";
import { Button } from "@mui/material";
import { InputField } from "../Input";
import styles from "./styles/styles.module.css";
import CustomHook from "./useCustomHook/CustomHook";
import Feedback from "../../../../lib/components/Feedback/Feedback"

function Resetpage() {
  const { errors, register } = CustomHook();

  const [password, setPassword] = useState({});
  const [error, setError] = useState(null);
  const [severity, setSeverity] = useState(null)
  const [openSnackBar, setOpenSnackBar] = useState(false)
  const navigate = useNavigate();

  function closeSnackBar(){
    setOpenSnackBar(false)
  }

  const [queryParams, ] = useSearchParams()

  function changePassword(passwordProvided){
    if (queryParams.has("token")){
      const token = queryParams.get("token")
      let payload = {
        token: token,
        password: passwordProvided
      }
      fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/auth/password-reset/`, {
        method: "PUT",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      .then((response) => {
        if (response.ok){
            let promise = response.json()
            promise
                .then((resObj) => {
                  setSeverity("success")
                  setError(resObj?.data);
                  setOpenSnackBar(true)
                  window.setTimeout(() => {
                    navigate("/signin")
                  }, 3)
                })
        } else {
            let promise = response.json()
            promise
                .then((resObj) => {
                  setSeverity("error")
                  setError(resObj?.message);
                  setOpenSnackBar(true)
                })
        }
      })
    }
  }

  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.logoWrapper}>
            <img className={styles.logo} src={JurebLogo} alt="Jureb" />
          </div><br></br>
          <h2>Reset Password</h2> <br></br>
          <section className={styles.contentSection}>
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
                  onInput = {(e) => {
                    setPassword({
                      ...password,
                      passwordOne: e.target.value
                    })
                  }}
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
                  onInput = {(e) => {
                    setPassword({
                      ...password,
                      passwordTwo: e.target.value
                    })
                  }}
                />
              </div>
              <div className={styles.buttonWrapper}>
                <Button
                  size="medium"
                  color="secondary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  onClick = {() => {
                    if (password.passwordOne === password.passwordTwo){
                      changePassword(password.passwordTwo)
                    } else {
                        setError({
                          message: "Your passwords do not match"
                        })
                        setSeverity("error")
                        setOpenSnackBar(true)
                    }
                  }}
                >
                Send
                </Button>
              </div>
              <Feedback 
              severity={severity} 
              message={error}
              open={openSnackBar}
              handleClose={closeSnackBar} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Resetpage

