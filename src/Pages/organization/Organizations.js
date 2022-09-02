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
import LoaderComponent from "../../lib/components/LoaderComponent/Loader";
import FetchError from "../../lib/components/Hooks/FetchError";
import usePaginator from "../../lib/components/Hooks/PaginatorTemplate";

const Organizations = () => {
  const { hooksContent } = CustomHook();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Pagination
  const { pageNumber, PaginatorTemplate } = usePaginator();

  // Get requests

  // tab headers
  const {data:tabheaderData} = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/organizations/sub-period-stats`)

  // set Search Data
  const {data:searchData, isLoading, error, handleSearchInput} = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/organizations`);

  const { data:MonthlyData } = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/organizations?page=${pageNumber}&plan=MONTHLY`)
  const { data:QuarterlyData } = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/organizations?page=${pageNumber}&plan=QUARTERLY`)
  const { data:BiAnnualData } = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/organizations?page=${pageNumber}&plan=BIANNUALLY`)
  const { data:AnnualData } = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/organizations?page=${pageNumber}&plan=ANNUALLY`)

  return (
    <Layout>
      <main className={styles.main}>
        
        <section>
          <Search styles={styles} hooksContent={hooksContent} handleSearchInput={handleSearchInput} />
          <div className={styles.tab_panel}>
            <TabContext value={value}>
              {tabheaderData && <TabHeaders handleChange={handleChange} styles={styles} data={tabheaderData} />}
              {isLoading && <LoaderComponent />}
              {error && <FetchError error={error} />}
              <TabPanel className={styles.t_p} value={"1"}>
                {searchData && <All data={searchData} styles={styles} PaginatorTemplate={PaginatorTemplate} />}
              </TabPanel>
              <TabPanel className={styles.t_p} value={"2"}>
                {MonthlyData && <Monthly data={MonthlyData} styles={styles}  PaginatorTemplate={PaginatorTemplate} />}
              </TabPanel>
              <TabPanel className={styles.t_p} value={"3"}>
                {QuarterlyData && <Quarterly data={QuarterlyData} styles={styles}  PaginatorTemplate={PaginatorTemplate} />}
              </TabPanel>
              <TabPanel className={styles.t_p} value={"4"}>
                {BiAnnualData && <BiAnnually data={BiAnnualData} styles={styles}  PaginatorTemplate={PaginatorTemplate} />}
              </TabPanel>
              <TabPanel className={styles.t_p} value={"5"}>
                {AnnualData && <Annually data={AnnualData} styles={styles}  PaginatorTemplate={PaginatorTemplate} />}
              </TabPanel>
            </TabContext>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export { Organizations };
