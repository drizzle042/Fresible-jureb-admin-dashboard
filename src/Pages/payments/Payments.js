import React from "react";
import Layout from "../Layout/Layout";
import Search from "./components/Search";
import styles from "./styles/styles.module.css";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import TabHeaders from "./components/TabPanel";
import Tab from "./components/Tab";
import CustomHook from "./useCustomHook/CustomHook";
import usePaginator from "../../lib/components/Hooks/PaginatorTemplate";
import FetchError from "../../lib/components/Hooks/FetchError";
import LoaderComponent from "../../lib/components/LoaderComponent/Loader";
import useFetch from "../../lib/components/Hooks/Requests/useFetch";
import { Invoice } from "../../lib/components/Endpoints/Endpoints";

const Payments = () => {

  const { hooksContent } = CustomHook();

  const [value, setValue] = React.useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Paginator
  const { pageNumber, PaginatorTemplate } = usePaginator();

  // Get requests

  // tab headers
  const {data:tabheaderData} = useFetch(Invoice.getInvoicesSubPeriodStat)

  // Invoice Data
  const {data, isLoading, error, handleSearchInput} = useFetch(`${Invoice.getInvoices}/?page=${pageNumber}&period=${value}`)

  return (
    <Layout>
      <main className={styles.main}>
        <section>
          <Search hooksContent={hooksContent} styles={styles} handleSearchInput={handleSearchInput} />
          {isLoading && <LoaderComponent />}
          {error && <FetchError error={error.message} />}
          {
            data &&
              <>
                <div className={styles.tab_panel}>
                  <TabContext value={value}>
                    {tabheaderData && <TabHeaders handleChange={handleChange} styles={styles} data={tabheaderData} />}
                    {
                      [
                        "",
                        "MONTHLY",
                        "QUARTERLY",
                        "BIANNUALLY",
                        "ANNUALLY"
                      ].map((i, index) => (
                        <TabPanel key={index} className={styles.t_p} value={i}>
                          <Tab data={data} styles={styles} />
                        </TabPanel>
                      ))
                    }
                  </TabContext>
                </div>
                <PaginatorTemplate totalDocs={data?.data?.length} limit={data?.limit} page={data?.page} totalPages={data?.totalPages} />
              </>
          }
        </section>
      </main>
    </Layout>
  );
};

export default Payments;
