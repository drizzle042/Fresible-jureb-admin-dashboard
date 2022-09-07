import { useState } from "react";

const CustomHook = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  const filterData = {
    title: "title",
    status: "status",
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

      default:
    }
  };

  const hooksContent = {
    handleChange,
    title,
    status,
    filterData,
  };

  return { hooksContent };
};

export default CustomHook;
