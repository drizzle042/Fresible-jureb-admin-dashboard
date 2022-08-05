import { useState, useEffect } from "react";

const usePut = (url) => {
    
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const tokens = JSON.parse(localStorage.getItem("user-tokens")) || {};

  function putFunc(id){
    if (id){
      fetch(url + id, {
        method: "PUT",
        headers: {
          "Authorization": "Bearer " + tokens?.data?.accessToken,
        },
      })
      .then((res) => {
        switch (res.status) {
          case 400:
            throw Error("Bad Request!");
          case 500:
            throw Error("Delete was not allowed by the server!");
          default:
            break;
        };
        return res.json();
      })
        .then(() => {
          setIsLoading(false);
          window.location.reload()
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
  useEffect(putFunc, [url]);

  return { isLoading, error, putFunc }
}

export default usePut;