import { useState, useEffect } from "react";

const useFetch = (endpoint) => {

  const [data, setData] = useState(null);
  // Make sure to control this feature as rigidly as possible throughout the request.
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
                        .catch(() => {
                            setIsLoading(false)
                            setData(null)
                            setError({
                                message: "Something went wrong. Dont worry we are on it."
                            })
                        })
            } else {
                let promise = response.json()
                promise
                    .then((resObj) => {
                        setIsLoading(false)
                        setData(null)
                        setError(resObj)
                    })
                        .catch(() => {
                            setIsLoading(false)
                            setData(null)
                            setError({
                                message: "Something went wrong. Dont worry we are on it."
                            })
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

  function handleSearchInput(value){
    
    let resourceEndpoint = `${endpoint}`;
    for (var key of Object.keys(value)){
      resourceEndpoint = resourceEndpoint.concat("&", key, "=", value[key]);
    }

    fetch(resourceEndpoint, {
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
                        .catch(() => {
                            setIsLoading(false)
                            setData(null)
                            setError({
                                message: "Something went wrong. Dont worry we are on it."
                            })
                        })
            } else {
                let promise = response.json()
                promise
                    .then((resObj) => {
                        setIsLoading(false)
                        setData(null)
                        setError(resObj)
                    })
                        .catch(() => {
                            setIsLoading(false)
                            setData(null)
                            setError({
                                message: "Something went wrong. Dont worry we are on it."
                            })
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
  };

  // eslint-disable-next-line
  useEffect(fetchData, [endpoint]);

  return { data, fetchData, isLoading, error, handleSearchInput };
};

export default useFetch;