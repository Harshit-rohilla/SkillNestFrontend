import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { apiConnector } from "../api/apiConnector";
import { userUrl } from "../api/userApi";
import { useDispatch } from "react-redux";
import { changeUserData } from "../redux/slices/authSlice";

export function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function logout() {
    try {
      const response = await apiConnector("post", userUrl.logout);
      if (response?.data?.success) {
        toast.success("Logged out!");
        localStorage.removeItem("user");
        dispatch(changeUserData(null));
        navigate("/login");
      }
    } catch (error) {
      if (error.status === 401) {
        localStorage.removeItem("user");
        toast.error("session expired");
        dispatch(changeUserData(null));
        navigate("/login");
      } else {
        toast.error(error?.response?.data?.message || "An error occurred");
      }
      //console.log(error);
    }
  }
  return logout;
}
