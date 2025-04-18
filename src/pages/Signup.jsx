import signup from "../assets/Images/signup.webp";
import frame from "../assets/Images/frame.png";
import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/common/Navbar";
import { changeFormData } from "../redux/slices/signUpSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { userUrl } from "../api/userApi.js";
import { apiConnector } from "../api/apiConnector.js";
import { changeLoading } from "../redux/slices/globalSlice.js";
// import { sendOtp } from "../controllers.js";

function Signup() {
  const [userType, changeUserType] = useState("Student");
  const [isVisible, changeIsVisible] = useState(false);
  const [isVisible2, changeIsVisible2] = useState(false);
  const loading = useSelector((store) => store.global.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const globalFormData = useSelector((store) => store.signUp.formData);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    confirmPassword: "",
    contactNumber: "",
  });

  function handleFormData(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function sendOtp(e) {
    dispatch(changeLoading(true));
    e.preventDefault();
    dispatch(
      changeFormData({ ...formData, accountType: userType.toLowerCase() })
    );

    try {
      const res = await apiConnector("post", userUrl.sendOtp, {
        email: formData.email,
      });
      if (res.data?.success) {
        toast.success("OTP send successfully");
        dispatch(changeLoading(false));
        navigate("/otp");
        // //console.log("forData after just before sending otp",{...globalFormData})
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "unable to send OTP");
      dispatch(changeLoading(false));
    }
  }

  return (
    <>
      {/* whole window */}
      <div className="min-h-screen flex flex-col bg-bg-blue w-full">
        <Navbar />
        {/* width for content */}
        {loading ? (
          <div className="flex-1 flex w-full justify-center items-center">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="w-11/12 flex h-full gap-20 mx-auto mt-20 max-w-[1260px]">
            {/* left div */}
            <div className="md:w-1/2 flex flex-col items-end">
              {/* signup div */}
              <div className="flex flex-col max-w-[420px]">
                <h1 className="text-3xl font-medium text-[rgb(240,240,240)] mb-2">
                  Join the millions learning to code with StudyNotion for free
                </h1>
                <p className="text-gray-white">
                  Build skills for today, tomorrow, and beyond. Education to
                  future-proof your career.
                </p>
                {/* user type */}
                <div className="bg-bg-light-blue w-[195px] my-6 justify-center py-1 rounded-4xl text-gray-white flex gap-2">
                  <div
                    onClick={() => {
                      changeUserType("Student");
                    }}
                    className={
                      userType === "Student"
                        ? "bg-bg-blue duration-200 cursor-pointer text-white rounded-4xl px-2.5 py-1.5"
                        : "px-2.5 cursor-pointer py-1.5"
                    }
                  >
                    Student
                  </div>
                  <div
                    onClick={() => {
                      changeUserType("Instructor");
                    }}
                    className={
                      userType === "Instructor"
                        ? "bg-bg-blue duration-200 cursor-pointer text-white rounded-4xl px-2.5 py-1.5"
                        : "px-2.5 cursor-pointer py-1.5"
                    }
                  >
                    Instructor
                  </div>
                </div>
                <form onSubmit={sendOtp} className="flex flex-col">
                  {/*both name field */}
                  <div className="flex gap-2">
                    <div>
                      <label
                        className="text-[rgb(240,240,240)] text-sm mb-1"
                        htmlFor="firstName"
                      >
                        First Name<sup className="text-red-700">*</sup>
                      </label>
                      <input
                        onChange={handleFormData}
                        name="firstName"
                        value={formData.firstName}
                        className="placeholder:text-gray-white bg-bg-light-blue px-2 py-2 rounded-md focus:outline-none text-gray-white mb-4"
                        type="text"
                        required
                        id="firstName"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label
                        className="text-[rgb(240,240,240)] text-sm mb-1"
                        htmlFor="lastName"
                      >
                        Last Name<sup className="text-red-700">*</sup>
                      </label>
                      <input
                        onChange={handleFormData}
                        name="lastName"
                        value={formData.lastName}
                        className="placeholder:text-gray-white bg-bg-light-blue px-2 py-2 rounded-md focus:outline-none text-gray-white mb-4"
                        type="text"
                        required
                        id="lastName"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                  {/* email field */}
                  <label
                    className="text-[rgb(240,240,240)] text-sm mb-1"
                    htmlFor="email"
                  >
                    Email Address<sup className="text-red-700">*</sup>
                  </label>
                  <input
                    onChange={handleFormData}
                    name="email"
                    value={formData.email}
                    className="placeholder:text-gray-white bg-bg-light-blue px-2 py-2 rounded-md focus:outline-none text-gray-white mb-4"
                    type="email"
                    required
                    id="email"
                    placeholder="Enter email address"
                  />
                  {/* phone number field */}
                  <div className="flex flex-col">
                    <label
                      className="text-[rgb(240,240,240)] text-sm mb-1"
                      htmlFor="phoneNumber"
                    >
                      Phone Number<sup className="text-red-700">*</sup>
                    </label>
                    <input
                      onChange={handleFormData}
                      name="contactNumber"
                      value={formData.contactNumber}
                      className="placeholder:text-gray-white bg-bg-light-blue px-2 py-2 rounded-md focus:outline-none text-gray-white mb-4"
                      type="text"
                      required
                      id="phoneNumber"
                      placeholder="Enter phone number"
                    />
                  </div>
                  {/* both password field */}
                  <div className="flex gap-2 mb-6">
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
                          onChange={handleFormData}
                          name="currentPassword"
                          value={formData.currentPassword}
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
                        htmlFor="confirmPass"
                      >
                        Confirm Password<sup className="text-red-700">*</sup>
                      </label>

                      {/* password field with icon */}
                      <div className="relative">
                        <input
                          onChange={handleFormData}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          className="placeholder:text-gray-white w-full bg-bg-light-blue px-2 py-2 rounded-md focus:outline-none text-gray-white"
                          type={isVisible2 ? "text" : "password"}
                          id="confirmPass"
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
                  </div>
                  <button className="bg-sky-blue text-center py-2 rounded-md cursor-pointer">
                    Sign up
                  </button>
                </form>
              </div>
            </div>
            {/* right div or image side */}
            <div className="hidden md:block md:w-1/2">
              <div className="w-[458px] relative ">
                <img
                  src={signup}
                  className="w-full h-auto object-cover absolute z-20"
                  alt="image"
                />
                <img
                  src={frame}
                  className="w-full h-auto object-cover absolute z-10 top-4 left-4"
                  alt="image"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Signup;
