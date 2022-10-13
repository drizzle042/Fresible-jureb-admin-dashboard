import { useState } from "react";


const usePost = (endpoint) => {
    
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [messageSeverity, setMessageSeverity] = useState(null)
  const tokens = localStorage.getItem("user-tokens") || "none"

  function postFunc(method, contentType, data){
    setIsLoading(true)
    fetch(endpoint, {
        method: method,
        headers: {
          "Authorization": "Bearer " + tokens,
          "Content-Type": contentType,
        },
        body: data
    })
        .then((response) => {
            if (response.ok){
                let promise = response.json()
                promise
                    .then((resObj) => {
                        setIsLoading(false)
                        setMessageSeverity("success")
                        setMessage(resObj);
                    })
            } else {
                let promise = response.json()
                promise
                    .then((resObj) => {
                        setIsLoading(false)
                        setMessageSeverity("error")
                        setMessage(resObj);
                    })
            }
        })
            .catch(() => {
                setIsLoading(false)
                setMessageSeverity("error")
                setMessage({
                    message: "Please check your internet connection"
                })
            })
  }

  return {postFunc, isLoading, setIsLoading, message, setMessage, messageSeverity, setMessageSeverity}
}

export default usePost;