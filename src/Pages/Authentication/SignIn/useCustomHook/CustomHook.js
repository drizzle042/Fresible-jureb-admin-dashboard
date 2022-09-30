import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../../../lib/components/Validations/authentication";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CustomHook = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null)
  const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/auth/auth-tokens`;

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(signInSchema),
    mode: "all",
  });

  const submitForm = async (formData) => {
    try {
      const { data } = await axios.post(url, formData);
      if (data) {
        localStorage.setItem("user-tokens", JSON.stringify(data));
        navigate("/overview");
      }
    } catch (e) {
      console.log(e?.response);
      let m=e?.response?.data?.message
      if(m==undefined) m=e?.response?.data
      setMessage({...message,severity:'error',open:true,message:m})
    }
  };

  return {
    handleSubmit,
    register,
    errors,
    control,
    submitForm,
    message,
    setMessage
  };
};

export default CustomHook;
