import Navbar from "../components/common/Navbar";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeLoading } from "../redux/slices/globalSlice";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { apiConnector } from "../api/apiConnector";
import { userUrl } from "../api/userApi";
import { changeEmail } from "../redux/slices/globalSlice";

function ResetPassword() {

  const[email,setEmail]=useState("")
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((store) => {
    return store.global.loading;
  });
  

  // api request to backend to send mail and handling loading and toast
  async function sendMail(event){
    try {
        event.preventDefault()    
        dispatch(changeLoading(true))
        const res=await apiConnector("post",userUrl.resetPasswordLink,{email})
        if(res.data.success){
            dispatch(changeEmail(email))
            dispatch(changeLoading(false))
            toast.success(res.data.message)
            setEmailSent(true)
        }
    } catch (error) {
        dispatch(changeLoading(false))
        toast.error(error.response?.data?.message || "An error occurred")
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col w-full bg-bg-blue">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          {loading ? (
            <div className="loader"></div>
          ) : emailSent ? (
            <div className="max-w-[400px] flex flex-col gap-2">
              <h1 className="text-3xl text-[rgb(240,240,240)]">Check email</h1>
              <p className="text-gray-white">
                {`We have sent the reset email to ${email}`}
              </p>
              <button onClick={sendMail} className="bg-sky-blue text-center py-2 rounded-md cursor-pointer mt-2">
                Resend email
              </button>
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
            <div className="flex flex-col max-w-[390px] gap-3">
              <h1 className="text-[rgb(240,240,240)] text-3xl font-medium">
                Reset your password
              </h1>
              <p className="text-gray-white">
                Have no fear. We'll email you instructions to reset your
                password. If you don't have access to your email we can try
                account recovery
              </p>
              <form onSubmit={sendMail} className="flex flex-col">
                <label
                  className="text-[rgb(240,240,240)] text-sm mb-1"
                  htmlFor="email"
                >
                  Email Address<sup className="text-xs text-red-700">*</sup>
                </label>
                <input
                  className="placeholder:text-gray-white bg-bg-light-blue px-2 py-2 rounded-md focus:outline-none text-gray-white"
                  required
                  placeholder="Enter email address"
                  type="email"
                  id="email"
                  onChange={(e)=>{setEmail(e.target.value)}}
                />
                <button  className="bg-sky-blue text-center mt-4 py-2 rounded-md cursor-pointer">
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
export default ResetPassword;
