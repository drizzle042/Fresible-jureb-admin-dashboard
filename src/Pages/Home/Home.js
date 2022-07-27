import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/signin");
    // eslint-disable-next-line
  }, []);
  return <div></div>;
};

export default Home;
