import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../../../../../lib/components/Validations/authentication";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendURL } from "../../../../../config";

const CustomHook = () => {
  const navigate = useNavigate();
  const url = `${backendURL}/api/v1/admin/auth/password-reset`;

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    mode: "all",
  });

  const submitForm = async (formData) => {
    try {
      const { data } = await axios.put(url, formData);
      if (data) {
        navigate("/signin");
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
