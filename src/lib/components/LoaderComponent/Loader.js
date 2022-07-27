import React from "react";
import "./loader.scss";
import Loader from "react-loaders";

const LoaderComponent = () => {
  return (
    <div className="loaderWrapper">
      <Loader type="line-scale" color="#2F49D0" />
    </div>
  );
};

export default LoaderComponent;
