import { useState, useEffect } from "react";

const useFetch = (endpoint) => {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const tokens = localStorage.getItem("user-tokens") || "none"

  function fetchData(){
    setIsLoading(true)
    fetch(endpoint, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + tokens,
        }
    })
        .then((response) => {
            if (response.ok){
                let promise = response.json()
                promise
                    .then((resObj) => {
                        setIsLoading(false)
                        setData(resObj)
                        setError(null)
                    })
            } else {
                let promise = response.json()
                promise
                    .then((resObj) => {
                        setIsLoading(false)
                        setData(null)
                        setError(resObj)
                    })
            }
        })
            .catch(() => {
                setIsLoading(false)
                setData(null)
                setError({
                    message: "Please check your internet connection"
                })
            })
  }

  // eslint-disable-next-line
  useEffect(fetchData, [endpoint]);

  return { data, isLoading, error };
};

export default useFetch;