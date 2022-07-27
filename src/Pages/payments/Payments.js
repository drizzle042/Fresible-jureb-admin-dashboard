import React from "react";
import Layout from "../Layout/Layout";
import Search from "./components/Search";
import styles from "./styles/styles.module.css";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import TabHeaders from "./components/TabPanel";
import All from "./components/users/All";
import Monthly from "./components/users/Monthly";
import Quarterly from "./components/users/Quarterly";
import BiAnnually from "./components/users/BiAnnually";
import Annually from "./components/users/Annually";
import CustomHook from "./useCustomHook/CustomHook";
import useFetch from "../../lib/components/Hooks/useFetch";
import FetchLoading from "../../lib/components/LoaderComponent/FetchLoading";
import FetchError from "../../lib/components/Hooks/FetchError";
import usePaginator from "../../lib/components/Hooks/PaginatorTemplate";

const Payments = () => {
  const { hooksContent } = CustomHook();
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { pageNumber } = usePaginator()
  // Get requests
  const { data:AllData, isLoading, error, setData } = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/invoices?page=${pageNumber}`)
  const { data:MonthlyData } = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/invoices?plan=MONTHLY&page=${pageNumber}`)
  const { data:QuarterlyData } = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/invoices?plan=QUARTERLY&page=${pageNumber}`)
  const { data:BiAnnualData } = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/invoices?plan=BIANNUALLY&page=${pageNumber}`)
  const { data:AnnualData } = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/invoices?plan=ANNUALLY&page=${pageNumber}`)

  return (
    <Layout>
      <main className={styles.main}>
        <div className={styles.section_title}>
          <h2>Payment History</h2>
          <p>See all payments made for the Jureb Subscription</p>
        </div>
        <section>
          <Search hooksContent={hooksContent} styles={styles} setData={setData} />
          <div className={styles.tab_panel}>
            <TabContext value={value}>
              <TabHeaders handleChange={handleChange} styles={styles} />
              {isLoading && <FetchLoading />}
              {error && <FetchError error={error} />}
              <TabPanel className={styles.t_p} value="1">
                {AllData && <All data={AllData} styles={styles} />}
              </TabPanel>
              <TabPanel className={styles.t_p} value="2">
                {MonthlyData && <Monthly data={MonthlyData} styles={styles} />}
              </TabPanel>
              <TabPanel className={styles.t_p} value="3">
                {QuarterlyData && <Quarterly data={QuarterlyData} styles={styles} />}
              </TabPanel>
              <TabPanel className={styles.t_p} value="4">
                {BiAnnualData && <BiAnnually data={BiAnnualData} styles={styles} />}
              </TabPanel>
              <TabPanel className={styles.t_p} value="5">
                {AnnualData && <Annually data={AnnualData} styles={styles} />}
              </TabPanel>
            </TabContext>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Payments;
