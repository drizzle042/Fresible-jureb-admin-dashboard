import { useState } from "react";

const CustomHook = () => {
  const [title, setTitle] = useState("");
  const [dateFrom, setDateFrom] = useState(new Date("2022-01-18T21:11:54"));
  const [dateTo, setDateTo] = useState(new Date("2022-01-18T21:11:54"));
  const [status, setStatus] = useState("");

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
