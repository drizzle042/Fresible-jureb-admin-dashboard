// import { Button } from "@mui/material";
import React from "react";
import styles from "./styles/styles.module.css";
// import {Link} from "react-router-dom"
import mail  from  "../../../../lib/assets/images/mailbox.svg";
import JurebLogo from "../../../../lib/assets/images/jureb-logo.png";

function Resetmail() {
  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.logoWrapper}>
            <img className={styles.logo} src={JurebLogo} alt="Jureb" />
          </div><br></br>
          <h2>Check your Mail</h2> <br></br>
         
          <section className={styles.contentSection}>
           
          <div className={styles.logoWrapper}>
            <img className={styles.logo} src={mail} alt="mail" />
          </div>
          <div><p>We have sent an email to your inbox with directions on how to reset your password.</p><br></br><br></br></div>
          {/* <Link to='/update-password'>
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
          </Link> */}
          </section>
        </div>
      </main>
    </div>
  )
}

export default Resetmail
