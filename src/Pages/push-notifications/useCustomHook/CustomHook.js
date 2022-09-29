import React, { useState } from "react";
import { EditorState } from "draft-js";

const CustomHook = () => {

  const [title, setTitle] = useState("");
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [imageUrl, setImageUrl] = useState([]);
  const [status, setStatus] = useState("");

  //  For post data 
  const [messageTitle, setMessageTitle] = useState("");
  const [receipients, setReceipients] = React.useState([]);
  const [deliveryType, setdeliveryType] = React.useState([]);
  const [subscriptionPlans, setSubscriptionPlans] = React.useState([]);
  const [messageDate, setMessageDate] = React.useState(new Date());
  const [messageTime, setMessageTime] = React.useState(new Date().getTime());

  // Text editor state
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [image, setImage] = useState([]);
  const scheduled = false;

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const filterData = {
    title: "title",
    status: "status",
    dateFrom: "dateFrom",
    dateTo: "dateTo",
    messageTitle: "messageTitle",
  };

  const handleChange = (name) => (e) => {
    const { value } = e.target;
    switch (name) {
      case filterData.title:
        setTitle(value);
        break;
      case filterData.status:
        setStatus(value);
        break;
      case filterData.messageTitle:
        setMessageTitle(value);
        break;
      default:
    }
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const selectReceipients = (event) => {
    const {
      target: { value },
    } = event;
    setReceipients(value);
  };

  const selectType = (event) => {
    const {
      target: { value },
    } = event;
    setdeliveryType(value);
  };

  const selectSubscription = (event) => {
    const {
      target: { value },
    } = event;
    setSubscriptionPlans(value);
  };

  const hooksContent = {
    handleChange,
    title,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    status,
    filterData,
    onImageChange,
    image,
    imageUrl,
    selectReceipients,
    selectType,
    selectSubscription,
    messageDate,
    setMessageDate,
    messageTitle,
    messageTime,
    setMessageTime,
    receipients,
    deliveryType,
    subscriptionPlans,
    editorState,
    scheduled,
    handleEditorChange,
  };

  return { hooksContent };
};

export default CustomHook;
