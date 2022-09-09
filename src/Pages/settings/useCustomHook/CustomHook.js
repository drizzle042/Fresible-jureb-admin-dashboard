import { useState, useEffect } from "react";

const CustomHook = () => {
  const [image, setImage] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const tokens = JSON.parse(localStorage.getItem("user-tokens")) || {};

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/account`, {
        headers: {
          "Authorization": "Bearer " + tokens?.data?.accessToken,
        }
      })
        .then((res) => res.json())
          .then((data) => setImageUrl(data?.data?.avatarUploadMeta?.url))
    // eslint-disable-next-line
  }, []);

  const userData = {
    firstName: "firstName",
    lastName: "lastName",
    email: "email",
    currentPassword: "currentPassword",
    newPassword: "newPassword",
    confirmPassword: "confirmPassword",
  };

  /* Handle changes in form and save form state */
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleChange = (name) => (e) => {
    const { value } = e.target;
    switch (name) {
      case userData.firstName:
        setFirstName(value);
        break;
      case userData.lastName:
        setLastName(value);
        break;
      case userData.email:
        setEmail(value);
        break;
      case userData.currentPassword:
        setCurrentPassword(value);
        break;
      case userData.newPassword:
        setNewPassword(value);
        break;
      case userData.confirmPassword:
        setConfirmPassword(value);
        break;
      default:
    }
  };
  const handleSubmit = () => {};

  const hooksContent = {
    onImageChange,
    imageUrl,
    image,
    setImage,
    setImageUrl,
    handleChange,
    firstName,
    lastName,
    email,
    currentPassword,
    newPassword,
    confirmPassword,
    userData,
    handleSubmit,
  };

  return { hooksContent };
};

export default CustomHook;
