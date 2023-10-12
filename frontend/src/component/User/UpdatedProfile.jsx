import React, { useEffect, useState } from "react";
import "./updateprofile.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { BiFace } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import { clearError, loadUser, updateProfile } from "../actions/userAction";
import { useAlert } from "react-alert";
import Loading from "../loading/Loading";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdatedProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const data = useSelector((state) => state.profile);
  const {error, loading ,isUpdated} = ""
  console.log(data);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const updateSubmit = (e) => {
    e.preventDefault();

    const myForm = {
      name,
      email,
      avatar,
    };

    dispatch(updateProfile(myForm));
  };

  const updateDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, alert, error, navigate, isUpdated, user]);

  return (
    <>
      {loading ? (
        Loading
      ) : (
        <>
          <div className="updataProfileContainer">
            <div className="updataProfileBox">
              <h2>Update Profile</h2>
              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={(e) => updateSubmit(e.target.value)}
              >
                <div className="updateProfileName">
                  <BiFace />
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="updateProfileEmail">
                  <MailOutlineIcon />

                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateDataChange}
                  />
                </div>

                <input type="submit" value="Update" id="updateProfileBtn" />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatedProfile;
