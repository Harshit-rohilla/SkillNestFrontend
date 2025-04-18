import Navbar from "../components/common/Navbar";
import { useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RxCountdownTimer } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userUrl } from "../api/userApi";
import { toast } from "react-hot-toast";
import { apiConnector } from "../api/apiConnector";
import { changeLoading } from "../redux/slices/globalSlice";

function Otp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.signUp.formData);
  const loading = useSelector((store) => store.global.loading);

  async function sendOtp(e) {
    e.preventDefault();
    dispatch(changeLoading(true));

    try {
      const res = await apiConnector("post", userUrl.sendOtp, {
        email: formData?.email,
      });
      if (res.data?.success) {
        toast.success("OTP send successfully");
        dispatch(changeLoading(false));
      }
    } catch (error) {
      if (error.status === 401) {
        localStorage.removeItem("user");
        toast.error("session expired");
        navigate("/login");
        dispatch(changeUserData(null));
      } else {
        toast.error(error.response?.data?.message || "unable to send OTP");
      }

      dispatch(changeLoading(false));
    }
  }

  async function registerUser(e) {
    e.preventDefault();
    if (!formData) {
      navigate("/signup");
    }
    try {
      //console.log("formData that is being sent while registering",{...formData,otp})
      const res = await apiConnector("post", userUrl.signUp, {
        ...formData,
        otp,
      });

      if (res.data.success) {
        toast.success("user registered");
        navigate("/login");
      }
    } catch (error) {
      //console.log(error)
      toast.error(error.response?.data?.message || "unable to register user");
    }
  }
  return (
    <>
      <div className="w-full min-h-screen flex flex-col bg-bg-blue">
        <Navbar />
        {loading ? (
          <div className="flex-1 flex justify-center items-center">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <div className="flex flex-col max-w-[420px]">
              <h1 className="text-3xl font-medium text-[rgb(240,240,240)] mb-2">
                Verify OTP
              </h1>
              <p className="text-gray-white mb-2">
                A verification code has been sent to your mail. Enter the code
                below
              </p>
              <form onSubmit={registerUser} className="flex flex-col">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  // renderSeparator={<span></span>}
                  containerStyle="flex justify-center gap-6"
                  inputStyle={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "0.375rem",
                    backgroundColor: "rgb(55, 65, 81)", // gray-700
                    color: "white",
                    textAlign: "center",
                    fontSize: "1.5rem",
                  }}
                  renderInput={(props) => (
                    <input
                      {...props}
                      className="focus:outline-none"
                      type="text"
                      inputMode="numeric"
                    />
                  )}
                />
                <button className="bg-sky-blue mt-4 text-center text-[rgb(240,240,240)] font-medium py-2 rounded-md cursor-pointer">
                  Verify OTP
                </button>
              </form>
              {/* last two buttons */}
              <div className="w-full flex mt-2 justify-between">
                <Link
                  className="text-[rgb(240,240,240)] flex justify-center items-center gap-2 text-sm"
                  to="/login"
                >
                  <FaArrowLeftLong />
                  <span>Back to login</span>
                </Link>
                <button
                  onClick={sendOtp}
                  className="flex text-sky-blue cursor-pointer gap-1 text-sm justify-center items-center"
                >
                  <RxCountdownTimer />
                  <span>Resend it</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Otp;
