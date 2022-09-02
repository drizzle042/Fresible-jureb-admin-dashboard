import { TabContext, TabPanel } from "@mui/lab";
import React, { useState } from "react";
import Layout from "../Layout/Layout";
import Search from "./components/Search";
import styles from "./styles/styles.module.css";
import Active from "./users_categories/Active";
import All from "./users_categories/All";
import Inactive from "./users_categories/Inactive";
import TabHeaders from "./components/TabHeaders";
import AddUser from "./components/AddUser";
import useFetch from "../../lib/components/Hooks/useFetch";
import LoaderComponent from "../../lib/components/LoaderComponent/Loader";
import FetchError from "../../lib/components/Hooks/FetchError";

const Users = () => {
  const [value, setValue] = React.useState("1");
  const [openUserDialog, setOpenUserDialog] = useState(false);

  const handleOpenUserDailog = () => {
    setOpenUserDialog(true);
  };
  const handleCloseUserDialog = () => {
    setOpenUserDialog(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Get data request
  const {data:tabheaderData} = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/administrators/status-stats`)

  const {data, isLoading, error, setData } = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/administrators`)

  return (
    <Layout>
      <main className={styles.main}>
       
        <section>
          <Search styles={styles} openDialog={handleOpenUserDailog} setData={setData} />
          <div className={styles.tab_panel}>
            <TabContext value={value}>
              {tabheaderData && <TabHeaders handleChange={handleChange} styles={styles} data={tabheaderData} />}
              {isLoading && <LoaderComponent />}
              {error && <FetchError error={error} />}
              {data &&
                <div>
                  <TabPanel className={styles.t_p} value="1">
                    <All data={data} styles={styles} />
                  </TabPanel>
                  <TabPanel className={styles.t_p} value="2">
                    <Active data={data} styles={styles} />
                  </TabPanel>
                  <TabPanel className={styles.t_p} value="3">
                    <Inactive data={data} styles={styles} />
                  </TabPanel>
                </div>
              }
            </TabContext>
          </div>
        </section>
        <AddUser
          styles={styles}
          open={openUserDialog}
          handleClose={handleCloseUserDialog}
        />
      </main>
    </Layout>
  );
};

export default Users;
