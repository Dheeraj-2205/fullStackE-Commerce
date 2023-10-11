import React, { useEffect, useRef, useState } from "react";
import "./updateprofile.css";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { BiFace } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import { clearError, loadUser, updateProfile } from "../actions/userAction";
import { useAlert } from "react-alert";
import Loading from "../loading/Loading";
import { useNavigate } from "react-router-dom";

const UpdatedProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = {
      name,
      email,
      avatar,
    };

    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);

    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/account");

      dispatch()
    }
  }, [dispatch, alert, error, navigate, isAuthenticated]);

  return <div>UpdatedProfile</div>;
};

export default UpdatedProfile;
