import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const usePost = (url) => {
    
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const tokens = JSON.parse(localStorage.getItem("user-tokens")) || {};

  function postDataFunc(data, contentType,gotoAction){
    if (data){
      setIsLoading(true)
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
          if(gotoAction!=null) gotoAction()
          else window.location.reload()
        })
          .catch((err) => {
            if (err.message === "Failed to fetch"){
              setError("Lost network connection")
            }else{
              setError(err.message);
            }
            setIsLoading(false);
            let m=err?.response?.data?.message
            if(m==undefined) m=err?.response?.data
            setMessage({...message,severity:'error',open:true,message:m})
            console.log(err);
          })}
  };


  function postFormData(data, gotoAction){
    if (data){
      setIsLoading(true)
    axios({
      method: "post",
      url: url,
      data: data,
      headers: { 
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + tokens?.data?.accessToken,
      },
    })
      .then(function (response) {
        setIsLoading(false);
        console.log(response);
        if(gotoAction!=null) gotoAction()
        else window.location.reload()
      })
      .catch(function (err) {
        if (err.message === "Failed to fetch"){
          setError("Lost network connection")
        }else{
          setError(err.message);
        }
        setIsLoading(false);
        let m=err?.response?.data?.message
        if(m==undefined) m=err?.response?.data
        setMessage({...message,severity:'error',open:true,message:m})
        console.log(err);
      });
    }
  }

  const { handleSubmit } = useForm({shouldUseNativeValidation: true});

  const submitForm = async (data,gotoAction) => {
    if(data){
      setIsLoading(true)
      await axios.put(url, data, {
        headers: {
          "Authorization": "Bearer " + tokens?.data?.accessToken,
          "Content-Type": "multipart/form-data",
        }
      })
        .then((res) => {
          if (res?.data?.status === "SUCCESS") {
            setIsLoading(false);
            console.log(res);
            if(gotoAction!=null) gotoAction()
            else window.location.reload()
          }
        })
          .catch ((err) => {
            console.log(err);
            let m=err?.response?.data?.message
            if(m==undefined) m=err?.response?.data
            setMessage({...message,severity:'error',open:true,message:m})
            setIsLoading(false);
          })
        }
  };

  // eslint-disable-next-line
  useEffect(postDataFunc, [url]);

  return { isLoading, error, postDataFunc, handleSubmit, submitForm,postFormData , message, setMessage}
}

export default usePost