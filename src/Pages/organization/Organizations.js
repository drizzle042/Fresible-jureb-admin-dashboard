import React from "react";
import Search from "./components/Search";
import styles from "./styles/styles.module.css";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Layout from "../Layout/Layout";
import TabHeaders from "./components/TabPanel";
import All from "./components/users/All";
import Monthly from "./components/users/Monthly";
import Quarterly from "./components/users/Quarterly";
import BiAnnually from "./components/users/BiAnnually";
import Annually from "./components/users/Annually";
import CustomHook from "./useCustomHook/CustomHook";
import useFetch from "../../lib/components/Hooks/useFetch";

const Organizations = () => {
  const { hooksContent } = CustomHook();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Get requests

  // tab headers
  const {data:tabheaderData} = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/organizations/sub-period-stats`)

  // set Search Data
  const {data:AllData, handleSearchInput} = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/organizations?`);

  return (
    <Layout>
      <main className={styles.main}>
        
        <section>
          <Search styles={styles} hooksContent={hooksContent} handleSearchInput={handleSearchInput} />
          <div className={styles.tab_panel}>
            <TabContext value={value}>
              {tabheaderData && <TabHeaders handleChange={handleChange} styles={styles} data={tabheaderData} />}
              <TabPanel className={styles.t_p} value={"1"}>
                <All allData={AllData} styles={styles} />
              </TabPanel>
              <TabPanel className={styles.t_p} value={"2"}>
                <Monthly styles={styles} />
              </TabPanel>
              <TabPanel className={styles.t_p} value={"3"}>
                <Quarterly styles={styles} />
              </TabPanel>
              <TabPanel className={styles.t_p} value={"4"}>
                <BiAnnually styles={styles} />
              </TabPanel>
              <TabPanel className={styles.t_p} value={"5"}>
                <Annually styles={styles} />
              </TabPanel>
            </TabContext>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export { Organizations };
