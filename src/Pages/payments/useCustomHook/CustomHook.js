import { useState } from "react";

const CustomHook = () => {
  const [title, setTitle] = useState("");
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [status, setStatus] = useState("status");

  const filterData = {
    title: "title",
    status: "status",
    dateFrom: "dateFrom",
    dateTo: "dateTo",
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
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    status,
    filterData,
  };

  return { hooksContent };
};

export default CustomHook;
