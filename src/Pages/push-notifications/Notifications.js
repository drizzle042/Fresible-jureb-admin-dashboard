import React, { useState } from "react";
import Layout from "../Layout/Layout";
import styles from "./styles/styles.module.css";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import TabHeaders from "./components/TabPanel";
import AllNotifications from "./components/NotificationTypes/AllNotifications";
import ScheduledNotifications from "./components/NotificationTypes/ScheduledNotifications";
import SentNotifications from "./components/NotificationTypes/SentNotifications";
import Search from "./components/Search";
import NewMessage from "./components/message/NewMessage";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import PreviewMessageWeb from "./components/message/PreviewMessage";
import PreviewMessageMobile from "./components/message/PreviewMessageMobile";
import Feedback from "../../lib/components/Feedback/Feedback";
import CustomHook from "./useCustomHook/CustomHook";
import useFetch from "../../lib/components/Hooks/useFetch";

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
  const [pageValue, setpageValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setpageValue(newValue);
  };

  // Get All Notifications
  const { data, handleSearchInput } = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/administrators/push-notification/fetch`)

  return (
    <Layout>
      <main className={styles.main}>
        <section>
          <Search styles={styles} handleSearchInput={handleSearchInput} hooksContent={hooksContent} openNewMessage={openNewMessage} />
          <div className={styles.tab_panel}>
            <TabContext value={pageValue}>
              {data && <TabHeaders handleChange={handleChange} data={data} styles={styles} />}
              <TabPanel className={styles.t_p} value="1">
                <AllNotifications allData={data} styles={styles} />
              </TabPanel>
              <TabPanel className={styles.t_p} value="2">
                <SentNotifications styles={styles} />
              </TabPanel>
              <TabPanel className={styles.t_p} value="3">
                <ScheduledNotifications styles={styles} />
              </TabPanel>
            </TabContext>
          </div>
        </section>
      </main>
      <NewMessage
        messageData={messageData}
        openWebMessage={openWebMessage}
        styles={styles}
        open={newMessage}
        handleClose={closeNewMessage}
        hooksContent={hooksContent}
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
