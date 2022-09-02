import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "../../../../../lib/components/Validations/authentication";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendURL } from "../../../../../config";

const CustomHook = () => {
  const navigate = useNavigate();
  const url = `${backendURL}/api/v1/admin/auth/password-reset-request`;

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    mode: "all",
  });

  const submitForm = async (formData) => {
    try {
      const { data } = await axios.post(url, formData);
      if (data) {
        navigate("/reset-mail");
      }
    } catch (error) {
      console.log(error?.response);
    }
  };

  return {
    handleSubmit,
    register,
    errors,
    control,
    submitForm,
  };
};

export default CustomHook;
