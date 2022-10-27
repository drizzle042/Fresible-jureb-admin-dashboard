import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import styles from "./styles/styles.module.css";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import TabHeaders from "./components/TabPanel";
import Tab from "./components/Tab";
import Search from "./components/Search";
import NewMessage from "./components/message/NewMessage";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import PreviewMessageWeb from "./components/message/PreviewMessage";
import PreviewMessageMobile from "./components/message/PreviewMessageMobile";
import Feedback from "../../lib/components/Feedback/Feedback";
import CustomHook from "./useCustomHook/CustomHook";
import useFetch from "../../lib/components/Hooks/Requests/useFetch";
import usePost from "../../lib/components/Hooks/Requests/usePost";
import { Notification } from "../../lib/components/Endpoints/Endpoints";
import usePaginator from "../../lib/components/Hooks/PaginatorTemplate";
import LoaderComponent from "../../lib/components/LoaderComponent/Loader";
import FetchError from "../../lib/components/Hooks/FetchError";

const Notifications = () => {

  // Accessories
  const { hooksContent } = CustomHook();
  const [newMessage, setNewMessage] = useState(false);
  const [previewMessageWeb, setPreviewMessageWeb] = useState(false);
  const [previewMessageMobile, setPreviewMessageMobile] = useState(false);
  
  // Feedback
  const short_message = "Warning: message too short";
  const warning_message = "Warning: message too long";
  const [openFeedback, setFeedback] = React.useState(false);
  const [severity, setSeverity] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Getting the value from editor
  const text = draftToHtml(
    convertToRaw(hooksContent.editorState?.getCurrentContent())
  );
  const editors_raw_content = convertToRaw(
    hooksContent.editorState.getCurrentContent()
  ).blocks?.map((item) => ({
    text: item?.text.length,
  }));
  const content_Length = editors_raw_content?.reduce(
    (acc, curr) => acc + curr?.text,
    0
  );

  const messageData = {
    text,
    imageUrl: hooksContent.imageUrl,
  };

  // New message handlers
  const openNewMessage = () => {
    setNewMessage(true);
    setPreviewMessageWeb(false);
    setPreviewMessageMobile(false);
  };

  const closeNewMessage = () => {
    setNewMessage(false);
  };

  // Web  / mobile dialog handlers
  const openWebMessage = () => {
    if (content_Length <= 0) return handleFeedback();
    if (content_Length >= 120) return handleFeedback();
    setPreviewMessageWeb(true);
    setNewMessage(false);
    setPreviewMessageMobile(false);
  };

  const closeWebMessage = () => {
    setPreviewMessageWeb(false);
  };

  const openMobileMessage = () => {
    setPreviewMessageMobile(true);
    setPreviewMessageWeb(false);
  };

  const closeMobileMessage = () => {
    setPreviewMessageMobile(false);
  };

  // Feedback
  const handleFeedback = () => {
    setFeedback(true);
    setSeverity("warning");
    setFeedbackMessage(content_Length <= 0 ? short_message : warning_message);
  };

  const closeFeedback = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFeedback(false);
  };

  const {pageNumber, PaginatorTemplate} = usePaginator();

  const [pageValue, setpageValue] = React.useState("");
  const handleChange = (event, newValue) => {
    setpageValue(newValue);
  };

  // Get Tab headers
  const { data:tabData } = useFetch(Notification.getCategoryCount)

  // Get All Notifications
  const { data, isLoading, error, handleSearchInput, fetchData } = useFetch(`${Notification.adminFetchPushNotifications}/?page=${pageNumber}&status=${pageValue}`)

  // Post Notification
  const { postForm, isLoading:postIsLoading, message, messageSeverity } = usePost(Notification.createPushNotification);
  
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
        setFeedBackMessage([message?.status])
        setOpenSnackBar(true)
        // Data will only be refetched when post is successful
        setTimeout(() => {
          fetchData()
        }, 2000)
        }
    // eslint-disable-next-line
  }, [message])

  return (
    <Layout>
      <main className={styles.main}>
        <section>
          <Search styles={styles} handleSearchInput={handleSearchInput} hooksContent={hooksContent} openNewMessage={openNewMessage} />
          {isLoading && <LoaderComponent />}
          {postIsLoading && <LoaderComponent />}
          {error && <FetchError error={error.message} />}
          {
            data && 
            <>
              <div className={styles.tab_panel}>
                <TabContext value={pageValue}>
                  <TabHeaders handleChange={handleChange} data={tabData} styles={styles} />
                  {
                    [
                      "",
                      "SENT",
                      "SCHEDULED"
                    ].map((i, index) => (
                      <TabPanel key={index} className={styles.t_p} value={i}>
                        <Tab data={data} styles={styles} />
                      </TabPanel>
                    ))
                  }
                </TabContext>
              </div>
              <PaginatorTemplate 
                totalDocs={data?.data?.length} 
                limit={data?.limit} 
                page={data?.page} 
                totalPages={data?.totalPages} />
            </>
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
      </main>

      <NewMessage
        messageData={messageData}
        openWebMessage={openWebMessage}
        styles={styles}
        open={newMessage}
        handleClose={closeNewMessage}
        hooksContent={hooksContent}
        postForm={postForm}
      />
      <PreviewMessageWeb
        styles={styles}
        open={previewMessageWeb}
        messageData={messageData}
        handleClose={closeWebMessage}
        openNewMessage={openNewMessage}
        openMobileMessage={openMobileMessage}
      />
      <PreviewMessageMobile
        styles={styles}
        open={previewMessageMobile}
        handleClose={closeMobileMessage}
        openNewMessage={openNewMessage}
        messageData={messageData}
        openWebMessage={openWebMessage}
      />
      <Feedback
        severity={severity}
        open={openFeedback}
        handleClose={closeFeedback}
        message={feedbackMessage}
      />
    </Layout>
  );
};

export default Notifications;
