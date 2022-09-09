import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const usePost = (url) => {
    
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const tokens = JSON.parse(localStorage.getItem("user-tokens")) || {};

  function postDataFunc(data, contentType){
    if (data){
      fetch(url, {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + tokens?.data?.accessToken,
          "Content-Type": contentType,
        },
        body: data,
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

  const { handleSubmit } = useForm({shouldUseNativeValidation: true});

  const submitForm = async (data) => {
      await axios.put(url, data, {
        headers: {
          "Authorization": "Bearer " + tokens?.data?.accessToken,
          "Content-Type": "multipart/form-data",
        }
      })
        .then((res) => {
          if (res?.data?.status === "SUCCESS") {
            window.location.reload();
          }
        })
          .catch ((error) => {
            console.log(error);
          })
  };

  // eslint-disable-next-line
  useEffect(postDataFunc, [url]);

  return { isLoading, error, postDataFunc, handleSubmit, submitForm }
}

export default usePost