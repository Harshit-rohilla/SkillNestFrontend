import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineFileUpload } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { apiConnector } from "../api/apiConnector";
import { userUrl } from "../api/userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { changeUserData } from "../redux/slices/authSlice";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Setting() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const user = useSelector((store) => store.auth.userData);
  const [fileName, setFileName] = useState("No file chosen");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profilePicture, setProfilePicture] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      if (file.name.length > 7) {
        setFileName(file.name.slice(0, 6));
      } else {
        setFileName(file.name);
      }
    }
  };

  async function uploadProfilePicture() {
    const toastId = toast.loading("uploading profile picture");
    const formData = new FormData();
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    } else {
      toast.error("please attach profile picture", { id: toastId });
      return;
    }
    try {
      const response = await axios.put(userUrl.updateProfilePicture, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (response?.data?.success) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        dispatch(changeUserData(response.data.data));
        toast.success("profile picture updated", { id: toastId });
        setProfilePicture(null);
        setFileName("No file chosen");
      }
    } catch (error) {
      //console.log(error);
      if (error.status === 401) {
        localStorage.removeItem("user");
        toast.error("session expired", { id: toastId });
        navigate("/login");
        dispatch(changeUserData(null));
      } else {
        toast.error(error?.response?.data?.message || "An error occurred", {
          id: toastId,
        });
      }
    }
  }

  async function updateProfileInfo(data) {
    const toastId = toast.loading("updating profile info");
    try {
      const response = await apiConnector("post", userUrl.updateProfile, data);
      if (response?.data?.success) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        dispatch(changeUserData(response.data.data));
        toast.success("profile info updated", { id: toastId });
        reset();
      }
    } catch (error) {
      //console.log(error);
      if (error.status === 401) {
        localStorage.removeItem("user");
        toast.error("session expired", { id: toastId });
        navigate("/login");
        dispatch(changeUserData(null));
      } else {
        toast.error(error?.response?.data?.message || "An error occurred", {
          id: toastId,
        });
      }
    }
  }

  async function resetPass() {
    try {
      setConfirmNewPassword("");
      setNewPassword("");
      const response = await apiConnector("post", userUrl.resetAuthPassword, {
        newPassword,
        confirmNewPassword,
      });
      if (response?.data?.success) {
        toast.success("password reset successfully");
      }
    } catch (error) {
      //console.log(error);
      if (error.status === 401) {
        localStorage.removeItem("user");
        toast.error("session expired");
        navigate("/login");
        dispatch(changeUserData(null));
      } else {
        toast.error(error?.response?.data?.message || "An error occurred");
      }
    }
  }

  async function deleteAccount() {
    try {
      const response = await apiConnector("delete", userUrl.deleteUser);
      if (response?.data?.success) {
        toast.success("account deleted");
        localStorage.clear("user");
        dispatch(changeUserData(null));
        navigate("/login");
      }
    } catch (error) {
      //console.log(error)
      if (error.status === 401) {
        localStorage.removeItem("user");
        toast.error("session expired");
        navigate("/login");
        dispatch(changeUserData(null));
      } else {
        toast.error(error?.response?.data?.message || "An error occurred");
      }
    }
  }

  return (
    <>
      <div className="flex-1 bg-bg-blue">
        {/* main div */}
        <div className="w-11/12 max-w-[900px] mx-auto h-full flex flex-col pt-6 gap-6">
          <h1 className="text-3xl text-light-white font-semibold">
            Edit Profile
          </h1>
          {/* first section or first div */}
          <div className="bg-bg-light-blue rounded-md flex py-6 px-8 items-center gap-4">
            <img
              src={user ? `${user.userImage}` : null}
              alt="img"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="flex flex-col justify-center w-full gap-1">
              <h1 className="text-light-white text-sm font-medium">
                Change Profile Picture
              </h1>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <label className="bg-sky-blue rounded-md py-1 px-3 cursor-pointer text-light-white font-medium">
                    Select
                    <input onChange={handleFile} type="file" hidden />
                  </label>
                  <p className="text-light-white py-1 px-2">{fileName}</p>
                </div>
                <button
                  onClick={uploadProfilePicture}
                  className="bg-gray-white text-black cursor-pointer rounded-md py-1 px-2.5 flex items-center gap-1 font-medium"
                >
                  <span>Upload</span>
                  <MdOutlineFileUpload />
                </button>
              </div>
            </div>
          </div>
          {/* second section */}
          <div className="bg-bg-light-blue rounded-md flex flex-col py-6 px-8 gap-4">
            <h1 className="font-medium text-lg text-light-white ">
              Profile Information
            </h1>
            <form
              onSubmit={handleSubmit(updateProfileInfo)}
              className="w-full flex flex-col gap-4"
            >
              <div className="flex gap-8">
                <div className="flex flex-col min-w-1/4">
                  <label
                    htmlFor="firstName"
                    className="text-light-white font-medium mb-1"
                  >
                    First Name
                  </label>
                  <input
                    {...register("firstName")}
                    type="text"
                    id="firstName"
                    className="bg-bg-blue text-gray-white outline-none px-2 py-1.5 rounded-md"
                  />
                </div>
                <div className="flex flex-col min-w-1/4">
                  <label
                    htmlFor="lastName"
                    className="text-light-white font-medium mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    {...register("lastName")}
                    type="text"
                    id="lastName"
                    className="bg-bg-blue text-gray-white outline-none px-2 py-1.5 rounded-md"
                  />
                </div>
              </div>
              <div className="flex gap-8">
                <div className="flex flex-col min-w-1/4">
                  <label
                    htmlFor="dob"
                    className="text-light-white font-medium mb-1"
                  >
                    Date of Birth
                  </label>
                  <input
                    {...register("dob")}
                    type="date"
                    id="dob"
                    className="bg-bg-blue text-gray-white outline-none px-2 py-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col min-w-1/4">
                  <label
                    htmlFor="gender"
                    className="text-light-white font-medium mb-1"
                  >
                    Gender
                  </label>
                  <select
                    {...register("gender")}
                    id="gender"
                    defaultValue="Male"
                    className="bg-bg-blue text-gray-white outline-none px-2 py-2 rounded-md"
                  >
                    <option className="text-gray-white">Male</option>
                    <option className="text-gray-white">Female</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="flex flex-col min-w-1/4">
                  <label
                    htmlFor="number"
                    className="text-light-white font-medium mb-1"
                  >
                    Contact Number
                  </label>
                  <input
                    {...register("contactNumber")}
                    type="text"
                    id="number"
                    minLength={10}
                    className="bg-bg-blue text-gray-white outline-none px-2 py-1.5 rounded-md"
                  />
                </div>
                <div className="flex flex-col min-w-1/4">
                  <label
                    htmlFor="about"
                    className="text-light-white font-medium mb-1"
                  >
                    About
                  </label>
                  <input
                    {...register("about")}
                    type="text"
                    id="about"
                    className="bg-bg-blue text-gray-white outline-none px-2 py-1.5 rounded-md"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="bg-gray-white text-black cursor-pointer rounded-md py-1 px-2.5 flex items-center gap-1 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-sky-blue text-light-white cursor-pointer rounded-md py-1 px-2.5 flex items-center gap-1 font-medium"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
          {/* third or password section */}
          <div className="bg-bg-light-blue rounded-md flex py-6 px-8 items-center justify-between">
            <div className="flex gap-8">
              <div className="min-w-1/3">
                <label
                  htmlFor="newpass"
                  className="text-light-white font-medium mb-1"
                >
                  New Password
                </label>
                <div className="relative ">
                  <input
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                    type={isVisible ? "text" : "password"}
                    value={newPassword}
                    required
                    id="newpass"
                    className="bg-bg-blue w-full text-gray-white outline-none px-2 py-1.5 rounded-md"
                  />
                  {isVisible ? (
                    <LuEyeOff
                      onClick={() => {
                        setIsVisible((prev) => !prev);
                      }}
                      size={18}
                      className="absolute cursor-pointer text-gray-white top-1/2 right-2 -translate-y-1/2"
                    />
                  ) : (
                    <LuEye
                      onClick={() => {
                        setIsVisible((prev) => !prev);
                      }}
                      size={18}
                      className="absolute cursor-pointer text-gray-white top-1/2 right-2 -translate-y-1/2"
                    />
                  )}
                </div>
              </div>
              <div className="min-w-1/3">
                <label
                  htmlFor="confirmpass"
                  className="text-light-white font-medium mb-1"
                >
                  Confirm New Password
                </label>
                <div className="relative ">
                  <input
                    onChange={(e) => {
                      setConfirmNewPassword(e.target.value);
                    }}
                    type={isVisible2 ? "text" : "password"}
                    value={confirmNewPassword}
                    required
                    id="confirmpass"
                    className="bg-bg-blue w-full text-gray-white outline-none px-2 py-1.5 rounded-md"
                  />
                  {isVisible2 ? (
                    <LuEyeOff
                      onClick={() => {
                        setIsVisible2((prev) => !prev);
                      }}
                      size={18}
                      className="absolute cursor-pointer text-gray-white top-1/2 right-2 -translate-y-1/2"
                    />
                  ) : (
                    <LuEye
                      onClick={() => {
                        setIsVisible2((prev) => !prev);
                      }}
                      size={18}
                      className="absolute cursor-pointer text-gray-white top-1/2 right-2 -translate-y-1/2"
                    />
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={resetPass}
              className="bg-sky-blue  text-light-white cursor-pointer rounded-md py-1 px-2.5 flex items-center gap-1 font-medium"
            >
              Save
            </button>
          </div>
          {/* last or delete section */}
          <div className="bg-[#340019] border-[1px] border-[#691432] rounded-md flex py-6 px-8 gap-8">
            <span className="bg-[#691432] h-14 w-14 flex justify-center items-center rounded-full">
              <FaRegTrashAlt color="#EF476F" size={20} />
            </span>
            <div>
              <h1 className="text-lg text-light-white mb-2 font-medium">
                Delete Account
              </h1>
              <p className="text-sm text-light-white">
                Would you like to delete account?
              </p>
              <p className="text-sm text-light-white mb-2">
                This account contains Paid Courses. Deleting your account will
                remove all the content associated with it.
              </p>
              <span
                onClick={deleteAccount}
                className="text-[#D43D63] duration-200 italic cursor-pointer hover:text-[#EF476F]"
              >
                I want to delete my account.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
