import { useState, useEffect } from "react";

const useFetch = (url) => {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const tokens = localStorage.getItem("user-tokens") || "none"

  function fetchData(){
    fetch(url, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + tokens
      }
    })
    .then((res) => {
      switch (res.status) {
        case 404:
          throw Error("Resource could not be reached");
        case 500:
          throw Error("The request was rejected by the server");
        default:
          break;
      };
      return res.json();
    })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
        .catch((err) => {
          if (err.message === "Failed to fetch"){
            setError("Please check your internet connection")
          }else{
            setError(err.message);
          }
          setIsLoading(false);
        })
  };
  
  function handleSearchInput(value){
    if (value==null) value={}
    let resourceEndpoint = `${url}`;
    let count=0
    for (var key of Object.keys(value)){
      resourceEndpoint = resourceEndpoint.concat(count > 0 ? "&" : "?", key, "=", value[key]);
      count++;
    }
    fetch(resourceEndpoint, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + tokens,
      }
    })
    .then((res) => {
      switch (res.status) {
        case 404:
          throw Error("Resource could not be reached");
        case 500:
          throw Error("The request was rejected by the server");
        default:
          break;
      };
      return res.json();
    })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
        .catch((err) => {
          if (err.message === "Failed to fetch"){
            setError("Please check your internet connection")
          }else{
            setError(err.message);
          }
          setIsLoading(false);
        })
  };
  // eslint-disable-next-line
  useEffect(fetchData, [url]);

  return {data, isLoading, error, setData, fetchData, handleSearchInput};
};

export default useFetch;
