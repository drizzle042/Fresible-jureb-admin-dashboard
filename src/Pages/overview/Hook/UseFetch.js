import { useState, useEffect } from "react";

const UseFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const tokens = JSON.parse(localStorage.getItem("user-tokens")) || {};

  function fetchData() {
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + tokens?.data?.accessToken,
      },
    })
      .then((res) => {
        switch (res.status) {
          case 404:
            throw Error("Resource could not be reached");
          case 500:
            throw Error("The request was rejected by the server");
          default:
            break;
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.message === "Failed to fetch") {
          setError("Lost network connection");
        } else {
          setError(err.message);
        }
        setIsLoading(false);
      });
  }
  // eslint-disable-next-line
  useEffect(fetchData, [url]);

  return { data, isLoading, error };
};

export default UseFetch;
