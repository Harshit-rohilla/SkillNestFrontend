import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import CreatePassword from "./pages/CreatePassword";
import Otp from "./pages/Otp";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import { useDispatch, useSelector } from "react-redux";
import MyProfile from "./pages/MyProfile";
import MyCourses from "./pages/MyCourses";
import AddCoursePage from "./pages/AddCoursePage";
import EnrolledCourses from "./pages/EnrolledCourses";
// import PurchaseHistory from "./pages/PurchaseHistory"
import Instructor from "./pages/Instructor";
import Dashboard from "./pages/Dashboard";
import Setting from "./pages/Setting";
import { useEffect } from "react";
// import { userUrl } from "./api/userApi"
// import { changeLoading } from "./redux/slices/authSlice"
import axios from "axios";
import PrivateRoute from "./components/common/PrivateRoute";
import Cart from "./pages/Cart";
import { apiConnector } from "./api/apiConnector";
import { setCategories } from "./redux/slices/categorySlice";
import { courseURL } from "./api/courseApi";
import Catalog from "./pages/Catalog";
import Course from "./pages/Course";
import ViewCourse from "./pages/ViewCourse";
import { changeRatingAndReview } from "./redux/slices/globalSlice";

function App() {
  // const location=useLocation()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // async function authenticate(){
  //     dispatch(changeLoading(true))
  //     try {
  //         const response=await axios.get(userUrl.verifySession,{withCredentials:true})
  //         //console.log(response);

  //         if(response.data.success){
  //             dispatch(changeIsAuthenticated(true))
  //             dispatch(changeUser(response.data.data.accountType))

  //         }
  //     } catch (error) {
  //         //console.log(error?.response?.data?.message)
  //         dispatch(changeIsAuthenticated(false))
  //         dispatch(changeUser(""))

  //     } finally{
  //         dispatch(changeLoading(false))
  //     }
  // }
  // useEffect(()=>{
  //     authenticate()
  // },[location])
  // *to fetch all categories and set it in the global redux slice so other component can use
  async function fetchReviews() {
    try {
      const res = await apiConnector("get", courseURL.getAllRatingAndReview);
      // //console.log(res?.data?.data);
      dispatch(changeRatingAndReview(res?.data?.data));
    } catch (error) {
      if (error.status === 401) {
        localStorage.removeItem("user");
        toast.success("session expired");
        navigate("/login");
        dispatch(changeUserData(null));
      }
      //console.log(error)
    }
  }
  async function fetchAllCategories() {
    try {
      const res = await apiConnector("get", courseURL.categoryURL);
      dispatch(setCategories(res?.data?.data ? res.data.data : []));
    } catch (error) {
      if (error.status === 401) {
        localStorage.removeItem("user");
        toast.success("session expired");
        navigate("/login");
        dispatch(changeUserData(null));
      }
      //console.log(error)
      // toast.error(error?.response?.data?.message || "An error occurred")
    }
  }
  useEffect(() => {
    fetchAllCategories();
    fetchReviews();
  }, []);
  const user = useSelector((store) => store.auth.userData);
  // //console.log("check 1",user);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/create-password/:id" element={<CreatePassword />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="/course/:courseId" element={<Course />} />
        <Route element={<Dashboard user={user} />}>
          <Route
            path="/dashboard/my-profile"
            element={
              <PrivateRoute condition={user?.accountType}>
                <MyProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/my-courses"
            element={
              <PrivateRoute condition={user?.accountType === "instructor"}>
                <MyCourses />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/add-course"
            element={
              <PrivateRoute condition={user?.accountType === "instructor"}>
                <AddCoursePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/enrolled-courses"
            element={
              <PrivateRoute condition={user?.accountType === "student"}>
                <EnrolledCourses />
              </PrivateRoute>
            }
          />
          {/* <Route path="/dashboard/purchase-history" element={<PrivateRoute condition={user?.accountType==="student"}><PurchaseHistory/></PrivateRoute>}/> */}
          <Route
            path="/dashboard/instructor"
            element={
              <PrivateRoute condition={user?.accountType === "instructor"}>
                <Instructor />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/setting"
            element={
              <PrivateRoute condition={user?.accountType}>
                <Setting />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/cart"
            element={
              <PrivateRoute condition={user?.accountType === "student"}>
                <Cart />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="/view-course/:courseId"
          element={
            <PrivateRoute condition={user?.accountType === "student"}>
              <ViewCourse />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}
export default App;
