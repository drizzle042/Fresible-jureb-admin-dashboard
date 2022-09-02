import { Avatar, Button, TextField } from "@mui/material";
import React, { useRef } from "react";
import Layout from "../Layout/Layout";
import SettingsLayout from "./components/SettingsLayout";
import styles from "./styles/styles.module.css";
import CustomHook from "./useCustomHook/CustomHook";
import useFetch from "../../lib/components/Hooks/useFetch";
import LoaderComponent from "../../lib/components/LoaderComponent/Loader";
import FetchError from "../../lib/components/Hooks/FetchError";
import useFilePost from "../../lib/components/Hooks/useFilePost";

const Settings = () => {
  const { hooksContent } = CustomHook();
  const {
    userData: { firstName, lastName, email }
  } = hooksContent;

  const imageRef = useRef();
  
  // Get request
  const { data, isLoading, error } = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/account`)
  // Post request
  const { postDataFunc } = useFilePost(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/account`)

  // intended Form Data
  let postData = new FormData();
  postData.set("avatarUpload", hooksContent?.image)
  postData.set("lastName", hooksContent?.lastName)
  postData.set("firstName", hooksContent?.firstName)
  // postData.set("email", hooksContent?.email)

  return (
    <Layout>
      <main className={styles.main}>
       
        <SettingsLayout>
          {isLoading && <LoaderComponent />}
          {error && <FetchError error={error} />}
          {data && 
          <form onSubmit={(e) => { 
            e.preventDefault()
            postDataFunc(postData)
            }}>
            <div className={styles.upload_wrapper}>
              <div>
                <Avatar
                  alt={`${data?.data?.lastName} ${data?.data?.firstName}`}
                  src={hooksContent.imageUrl}
                  sx={{ width: 76, height: 76 }}
                />
                <input
                  accept=".png, .jpg, .jpeg, .gif"
                  onChange={hooksContent.onImageChange}
                  type="file"
                  style={{ display: "none" }}
                  ref={imageRef}
                />
              </div>
              <div>
                <Button
                  onClick={() => imageRef.current.click()}
                  variant="outlined"
                  color="secondary"
                >
                  Upload Image
                </Button>
              </div>
            </div>
            <div className={styles.form_group}>
              <label>First Name</label>
              <TextField
                type="text"
                size="small"
                value={hooksContent.firstName}
                onChange={hooksContent.handleChange(firstName)}
                fullWidth
                placeholder={data?.data?.firstName}
              />
            </div>
            <div className={styles.form_group}>
              <label>Last Name</label>
              <TextField
                type="text"
                value={hooksContent.lastName}
                onChange={hooksContent.handleChange(lastName)}
                size="small"
                fullWidth
                placeholder={data?.data?.lastName}
              />
            </div>
            <div className={styles.form_group}>
              <label>Email</label>
              <TextField
                type="email"
                value={hooksContent.email}
                onChange={hooksContent.handleChange(email)}
                size="small"
                fullWidth
                placeholder={data?.data?.email}
              />
            </div>

            <Button type="submit" variant="contained" color="secondary">
              Save
            </Button>
          </form>
          }
        </SettingsLayout>
      </main>
    </Layout>
  );
};

export default Settings;
