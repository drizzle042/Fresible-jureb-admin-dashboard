import React, { useState } from "react";
import { EditorState } from "draft-js";

const CustomHook = () => {
  const [title, setTitle] = useState("");
  const [dateFrom, setDateFrom] = useState(new Date("2022-01-18T21:11:54"));
  const [dateTo, setDateTo] = useState(new Date("2022-01-18T21:11:54"));
  const [imageUrl, setImageUrl] = useState([]);
  const [status, setStatus] = useState("");
  //  For post data 
  const [messageTitle, setMessageTitle] = useState("");
  const [recipients, setRecipients] = useState("");
  const [messageType, setMessageType] = React.useState(["SMS"]);
  const [messageDate, setMessageDate] = React.useState(
    new Date()
  );
  const [messageTime, setMessageTime] = React.useState(
    new Date().getTime()
  );
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
    recipients: "recipients",
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
      case filterData.recipients:
        setRecipients(value);
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

  const selectType = (event) => {
    const {
      target: { value },
    } = event;
    setMessageType(typeof value === "string" ? value.split(",") : value);
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
    selectType,
    messageDate,
    setMessageDate,
    messageTitle,
    messageTime,
    setMessageTime,
    messageType,
    recipients,
    editorState,
    scheduled,
    handleEditorChange,
  };

  return { hooksContent };
};

export default CustomHook;
