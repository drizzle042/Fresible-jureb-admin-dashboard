import { useState, useEffect } from "react";

const usePost = (url) => {
    
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const tokens = JSON.parse(localStorage.getItem("user-tokens")) || {};

  function postDataFunc(data){
    if (data){
      fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + tokens?.data?.accessToken
        },
        body: data
      })
      .then((res) => {
        switch (res.status) {
          case 400:
            throw Error("Bad Request!");
          case 500:
            throw Error("The Data was rejected by the server");
          default:
            break;
        };
        return res.json();
      })
        .then(() => {
          setIsLoading(false);
        })
          .catch((err) => {
            if (err.message === "Failed to fetch"){
              setError("Lost network connection")
            }else{
              setError(err.message);
            }
            setIsLoading(false);
            console.log(err);
          })}
  };
  // eslint-disable-next-line
  useEffect(postDataFunc, [url]);

  return { isLoading, error, postDataFunc }
}

export default usePost