import { useState, useEffect } from "react";

const usePut = (url) => {
    
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const tokens = localStorage.getItem("user-tokens") || "none"
  const [message, setMessage] = useState(null)

  function putFunc(id="",gotoAction,data=null){
    // eslint-disable-next-line
    if(id!="" || data!=null){
      setIsLoading(true)
      fetch(url + id, {
        method: "PUT",
        headers: {
          "Authorization": "Bearer " + tokens,
        },
        body: JSON.stringify(data),
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
  // eslint-disable-next-line
  useEffect(putFunc, [url]);

  return { isLoading, error, putFunc , message, setMessage}
}

export default usePut;