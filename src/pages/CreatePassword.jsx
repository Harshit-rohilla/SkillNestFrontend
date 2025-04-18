import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import Navbar from "../components/common/Navbar";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { apiConnector } from "../api/apiConnector";
import { userUrl } from "../api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { changeLoading } from "../redux/slices/globalSlice";
import toast from "react-hot-toast";

function CreatePassword() {
  const [isVisible, changeIsVisible] = useState(false);
  const [isVisible2, changeIsVisible2] = useState(false);
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const { id } = useParams();
  const dispatch = useDispatch();
  const [passwordSet, setPasswordSet] = useState(false);
  const loading = useSelector((store) => store.global.loading);
  const email = useSelector((store) => store.global.email);
  //console.log(email)

  // password form handler
  function handlePassword(e) {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  //   api request to backend to reset password and handling loading and toast
  async function sendNewPassword(e) {
    try {
      dispatch(changeLoading(true));
      e.preventDefault();
      const { newPassword, confirmNewPassword } = passwords;
      const res = await apiConnector("post", userUrl.resetPassword, {
        newPassword,
        confirmNewPassword,
        token: id,
      });
      //   //console.log(res)
      if (res.data.success) {
        setPasswordSet((prev) => !prev);
        dispatch(changeLoading(false));
        toast.success("password reset successfully");
      }
    } catch (error) {
      //   //console.log(error);
      dispatch(changeLoading(false));
      toast.error(error.response?.data?.message || "An error occurred");
    }
  }

  return (
    <>
      <div className="min-h-screen w-full flex flex-col bg-bg-blue">
        <Navbar />
        <div className="flex justify-center items-center flex-1">
          {loading ? (
            <div className="loader"></div>
          ) : passwordSet ? (
            <div className="max-w-[400px] flex flex-col gap-2">
              <h1 className="text-3xl text-[rgb(240,240,240)]">
                Reset complete!
              </h1>
              <p className="text-gray-white">
                {`All done! We have sent an email to ${email} to
              confirm`}
              </p>
              <Link
                className="bg-sky-blue text-center py-2 rounded-md cursor-pointer mt-2"
                to="/login"
              >
                Return to login
              </Link>
              <div className="flex justify-start">
                <Link
                  className="text-[rgb(240,240,240)] flex justify-center items-center gap-2 text-sm"
                  to="/login"
                >
                  <FaArrowLeftLong />
                  <span>Back to login</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="max-w-[400px] flex flex-col gap-3">
              <h1 className="text-3xl text-[rgb(240,240,240)] ">
                Choose new password
              </h1>
              <p className="text-gray-white">
                Almost done. Enter your new password and you are all set.
              </p>
              <form className="flex flex-col gap-3" onSubmit={sendNewPassword}>
                {/* create password field */}
                <div>
                  <label
                    className="text-[rgb(240,240,240)] mb-1 text-sm"
                    htmlFor="pass"
                  >
                    Create Password<sup className="text-red-700">*</sup>
                  </label>

                  {/* password field with icon */}
                  <div className="relative">
                    <input
                      onChange={handlePassword}
                      name="newPassword"
                      value={passwords.newPassword}
                      className="placeholder:text-gray-white w-full bg-bg-light-blue px-2 py-2 rounded-md focus:outline-none text-gray-white"
                      type={isVisible ? "text" : "password"}
                      id="pass"
                      required
                      placeholder="Enter Password"
                    />
                    {isVisible ? (
                      <LuEyeOff
                        className="text-gray-white absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer size-5"
                        onClick={() => {
                          changeIsVisible((prev) => !prev);
                        }}
                      />
                    ) : (
                      <LuEye
                        className="text-gray-white absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer size-5"
                        onClick={() => {
                          changeIsVisible((prev) => !prev);
                        }}
                      />
                    )}
                  </div>
                </div>
                {/* confirm password field */}
                <div>
                  <label
                    className="text-[rgb(240,240,240)] mb-1 text-sm"
                    htmlFor="pass"
                  >
                    Confirm Password<sup className="text-red-700">*</sup>
                  </label>

                  {/* password field with icon */}
                  <div className="relative">
                    <input
                      onChange={handlePassword}
                      name="confirmNewPassword"
                      value={passwords.confirmNewPassword}
                      className="placeholder:text-gray-white w-full bg-bg-light-blue px-2 py-2 rounded-md focus:outline-none text-gray-white"
                      type={isVisible2 ? "text" : "password"}
                      id="pass"
                      required
                      placeholder="Enter Password"
                    />
                    {isVisible2 ? (
                      <LuEyeOff
                        className="text-gray-white absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer size-5"
                        onClick={() => {
                          changeIsVisible2((prev) => !prev);
                        }}
                      />
                    ) : (
                      <LuEye
                        className="text-gray-white absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer size-5"
                        onClick={() => {
                          changeIsVisible2((prev) => !prev);
                        }}
                      />
                    )}
                  </div>
                </div>
                <button className="bg-sky-blue text-center py-2 rounded-md cursor-pointer mt-2">
                  Reset Password
                </button>
              </form>
              <div className="flex justify-start">
                <Link
                  className="text-[rgb(240,240,240)] flex justify-center items-center gap-2 text-sm"
                  to="/login"
                >
                  <FaArrowLeftLong />
                  <span>Back to login</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default CreatePassword;
