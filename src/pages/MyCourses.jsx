import React, { useEffect, useState } from "react";
import { apiConnector } from "../api/apiConnector";
import { courseURL } from "../api/courseApi";
import toast from "react-hot-toast";
import SingleCourse from "../components/common/SingleCourse";
import { useNavigate } from "react-router-dom";
import { changeUserData } from "../redux/slices/authSlice";

export default function MyCourses() {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const [refreshTrigger,setRefreshTrigger]=useState(true)

  async function getMyCourse() {
    setLoading(true);
    try {
      const response = await apiConnector("get", courseURL.enrolledCourses);
      if (response?.data?.success) {
        setMyCourses(response.data.data.courses);
        // //console.log("received data is", response.data.data);
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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMyCourse();
  }, []);

  return (
    <>
      <div className="flex-1 bg-bg-blue pt-10">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <span className="loader"></span>
          </div>
        ) : myCourses.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center">
            <span className=" text-gray-white text-lg font-medium">
              You have not created any courses yet
            </span>
          </div>
        ) : (
          // main div
          <div className="w-3xl mx-auto">
            {/* main heading and add button */}
            <div className="flex justify-between">
              <h1 className="text-lg text-light-white font-medium">
                My Courses
              </h1>
              <button
                onClick={() => {
                  navigate("/dashboard/add-course");
                }}
                className="px-2 py-1 bg-sky-blue text-light-white cursor-pointer rounded-sm font-medium"
              >
                Add Course
              </button>
            </div>
            {/* course price and action heading */}
            <div className="flex justify-between mt-5 mb-4">
              <h1 className="text-lg text-light-white font-medium">Courses</h1>
              <div className="flex gap-6">
                <h1 className=" text-light-white font-medium text-lg">Price</h1>
                <h1 className=" text-light-white font-medium text-lg">
                  Actions
                </h1>
              </div>
            </div>
            {myCourses.map((course, index) => (
              <SingleCourse
                key={index}
                myCourses={myCourses}
                setMyCourses={setMyCourses}
                course={course}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
