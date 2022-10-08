import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "../../../../../lib/components/Validations/authentication";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CustomHook = () => {
  const navigate = useNavigate();
  const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/auth/password-reset-request`;

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
        navigate("/success-check-your-mail");
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
