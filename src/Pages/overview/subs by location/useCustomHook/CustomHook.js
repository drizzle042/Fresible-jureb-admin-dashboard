import { useState } from "react";

const CustomHook = () => {
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [status, setStatus] = useState("");

  const filterData = {
    title: "title",
    country: "country",
    state: "state",
    status: "status",
  };
  const handleChange = (name) => (e) => {
    const { value } = e.target;
    switch (name) {
      case filterData.title:
        setTitle(value);
        break;
      case filterData.country:
        setCountry(value);
        break;
      case filterData.state:
        setState(value);
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
    country,
    setCountry,
    state,
    setState,
    status,
    filterData,
  };

  return { hooksContent };
};

export default CustomHook;
