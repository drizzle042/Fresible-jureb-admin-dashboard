import { TabContext, TabPanel } from "@mui/lab";
import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import Search from "./components/Search";
import styles from "./styles/styles.module.css";
import Tab from "./components/Tab";
import TabHeaders from "./components/TabHeaders";
import AddUser from "./components/AddUser";
import usePaginator from "../../lib/components/Hooks/PaginatorTemplate";
import useFetch from "../../lib/components/Hooks/Requests/useFetch";
import usePost from "../../lib/components/Hooks/Requests/usePost";
import { Administrators } from "../../lib/components/Endpoints/Endpoints";
import LoaderComponent from "../../lib/components/LoaderComponent/Loader";
import Feedback from "../../lib/components/Feedback/Feedback";
import FetchError from "../../lib/components/Hooks/FetchError";

const Users = () => {

  const [openUserDialog, setOpenUserDialog] = useState(false);
  const handleOpenUserDailog = () => {
    setOpenUserDialog(true);
  };
  const handleCloseUserDialog = () => {
    setOpenUserDialog(false);
  };

  const [value, setValue] = React.useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { PaginatorTemplate, pageNumber } = usePaginator()

  // Get requests
  const {data:tabheaderData, fetchData:fetchTabHeaders} = useFetch(Administrators.getAdminsStatusStat)

  const {data, isLoading, error, handleSearchInput, fetchData } = useFetch(`${Administrators.getAdmins}/?page=${pageNumber}&status=${value}`)

  // Make post, put or delete requests
  const [endpoint, setEndpoint] = useState("")
  const { postFunc, isLoading:postIsLoading, message, messageSeverity } = usePost(endpoint);

  // FeedBack controller
  const [openSnackBar, setOpenSnackBar] = useState(false)
  function closeSnackBar(){
    setOpenSnackBar(false)
  }

  const [feedBackMessage, setFeedBackMessage] = useState([])
  useEffect(() => {
    if (typeof(message?.message) === "string"){
      setFeedBackMessage([message?.message])
      setOpenSnackBar(true)
    } else if (Array.isArray(message?.message)){
      let cummulativeMessage = [];
      for (var i of message?.message) {
        for (var n of Object.values(i)) {
          cummulativeMessage.push(n)
        }
      }
      setFeedBackMessage(cummulativeMessage)
      setOpenSnackBar(true)
      } else if (message?.status === "SUCCESS"){
        setFeedBackMessage([message?.data])
        setOpenSnackBar(true)
        // Data will only be refetched when post is successfull
        setTimeout(() => {
          fetchData()
          fetchTabHeaders()
        }, 2000)
        }
    // eslint-disable-next-line
  }, [message])

  return (
    <Layout>
      <main className={styles.main}>
        <section>
          <Search styles={styles} openDialog={handleOpenUserDailog} handleSearchInput={handleSearchInput} />
          {isLoading && <LoaderComponent />}
          {postIsLoading && <LoaderComponent />}
          {error && <FetchError error={error.message} />}
          {
            data &&
              <div className={styles.tab_panel}>
                <TabContext value={value}>
                  {tabheaderData && <TabHeaders handleChange={handleChange} styles={styles} data={tabheaderData} />}
                    <div>
                    {
                      [
                        "",
                        "ACTIVE",
                        "INACTIVE"
                      ].map((i, index) => (
                        <TabPanel key={index} className={styles.t_p} value={i}>
                          <Tab 
                            data={data} 
                            styles={styles}
                            postFunc={postFunc}
                            setEndpoint={setEndpoint} />
                        </TabPanel>
                      ))
                    }
                    </div>
                </TabContext>
                <PaginatorTemplate totalDocs={data?.data?.length} limit={data?.limit} page={data?.page} totalPages={data?.totalPages} />
              </div>
          }
          {
            message &&
              feedBackMessage.map((i, index) => (
                <Feedback 
                  key={index}
                  severity={messageSeverity} 
                  message={i}
                  open={openSnackBar}
                  handleClose={closeSnackBar} />
              ))
          }
        </section>
        <AddUser
          styles={styles}
          open={openUserDialog}
          handleClose={handleCloseUserDialog}
          postFunc={postFunc}
          endpoint={endpoint}
          setEndpoint={setEndpoint}
        />
      </main>
    </Layout>
  );
};

export default Users;
