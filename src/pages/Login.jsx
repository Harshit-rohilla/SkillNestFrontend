import login from "../assets/Images/login.webp";
import frame from "../assets/Images/frame.png";
import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { apiConnector } from "../api/apiConnector";
import { userUrl } from "../api/userApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { changeUserData } from "../redux/slices/authSlice";

function Login() {
  const [userType, changeUserType] = useState("Student");
  const [isVisible, changeIsVisible] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // function to handle form data
  function handleFormData(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function sendLoginReq(e) {
    try {
      e.preventDefault();
      const res = await apiConnector("post", userUrl.login, {
        email: formData.email,
        password: formData.password,
        accountType: userType.toLowerCase(),
      });
      //  //console.log(res)
      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.data));
        dispatch(changeUserData(res.data.data));
        // //console.log(res.data.data);

        // //console.log(localStorage.getItem("user"));

        // //console.log("cookies are",document.cookie);

        toast.success("Logged in");
        navigate("/dashboard/my-profile");
      }
    } catch (error) {
      //console.log(error)
      toast.error(error.response?.data?.message || "An error occurred");
    }
  }

  return (
    <>
      {/* whole window */}
      <div className="min-h-screen bg-bg-blue w-full">
        <Navbar />
        {/* width for content */}
        <div className="w-11/12 flex h-full gap-20 mx-auto mt-20 max-w-[1260px]">
          {/* left div */}
          <div className="md:w-1/2 flex flex-col items-end">
            {/* login div */}
            <div className="flex flex-col max-w-[420px]">
              <h1 className="text-3xl font-medium text-[rgb(240,240,240)] mb-2">
                Welcome Back
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
              <form onSubmit={sendLoginReq} className="flex flex-col">
                <label
                  className="text-[rgb(240,240,240)] text-sm mb-1"
                  htmlFor="email"
                >
                  Email Address<sup className="text-red-700">*</sup>
                </label>
                <input
                  onChange={handleFormData}
                  className="placeholder:text-gray-white bg-bg-light-blue px-2 py-2 rounded-md focus:outline-none text-gray-white mb-4"
                  name="email"
                  value={formData.email}
                  type="email"
                  required
                  id="email"
                  placeholder="Enter email address"
                />
                <label
                  className="text-[rgb(240,240,240)] mb-1 text-sm"
                  htmlFor="pass"
                >
                  Password<sup className="text-red-700">*</sup>
                </label>
                {/* password field with icon */}
                <div className="relative">
                  <input
                    onChange={handleFormData}
                    className="placeholder:text-gray-white w-full bg-bg-light-blue px-2 py-2 rounded-md focus:outline-none text-gray-white"
                    type={isVisible ? "text" : "password"}
                    name="password"
                    value={formData.password}
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
                <div className="flex justify-end">
                  <Link
                    to="/reset-password"
                    className="text-end mb-6 text-xs text-sky-blue"
                  >
                    Forgot password
                  </Link>
                </div>
                <button className="bg-sky-blue text-center py-2 rounded-md cursor-pointer">
                  Sign in
                </button>
              </form>
            </div>
          </div>
          {/* right div or image side */}
          <div className="hidden md:block md:w-1/2">
            <div className="w-[458px] relative ">
              <img
                src={login}
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
      </div>
    </>
  );
}
export default Login;
