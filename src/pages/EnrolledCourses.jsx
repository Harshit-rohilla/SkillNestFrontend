import React, { useEffect, useState } from "react";
import { apiConnector } from "../api/apiConnector";
import { courseURL } from "../api/courseApi";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { changeUserData } from "../redux/slices/authSlice";

export default function EnrolledCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchEnrolledCourses = async () => {
    try {
      setLoading(true);
      const response = await apiConnector(
        "get",
        courseURL.studentEnrolledCourses
      );
      // //console.log(response);
      if (response?.data?.success) {
        setEnrolledCourses(response.data.data.courses);
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
  };
  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  // TODO: use progress bar package to show progress bar

  return (
    <>
      <div className="flex-1 bg-bg-blue">
        {loading ? (
          <div className="flex justify-center items-center h-full w-full">
            <span className="loader"></span>
          </div>
        ) : enrolledCourses.length ? (
          // main div
          <div className="w-11/12 max-w-[1000px] mx-auto h-full flex flex-col pt-6 gap-6">
            {/* main heading */}
            <h1 className="text-light-white font-semibold text-3xl ">
              Enrolled Courses
            </h1>
            {/* courses div starts here */}
            <div className="border-[1px]  border-bg-light-blue rounded-md">
              {/* course name and progress heading div */}
              <div className="bg-bg-light-blue text-gray-white flex justify-between px-4 py-2">
                {/* left div */}
                <p className="w-3/4 ">Course Name</p>
                {/* right div */}
                <div className="w-1/4 flex">
                  <p>Progress</p>
                </div>
              </div>
              {/* all enrolled courses are in "courses div starts here" */}
              {enrolledCourses.map((obj, index) => (
                <Link to={`/view-course/${obj._id}`} key={index}>
                  <div className="border-b-[1px] flex px-4 border-bg-light-blue">
                    {/* left section with image, title and description */}
                    <div className=" w-3/4 py-3 flex items-center gap-2">
                      <div className="h-10 w-10 rounded-md">
                        <img
                          className="w-full h-full rounded-md object-cover"
                          src={obj.thumbnail}
                          alt="thumbnail"
                        />
                      </div>
                      <div>
                        <h1 className="text-light-white">
                          {obj.title.length > 30
                            ? obj.title.slice(0, 30) + "..."
                            : obj.title}
                        </h1>
                        <p className="text-sm text-gray-white">
                          {obj.description.length > 80
                            ? obj.description.slice(0, 80) + "..."
                            : obj.description}
                        </p>
                      </div>
                    </div>
                    {/* right section which have progress bar */}
                    <div className=" w-1/4 py-3"></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full w-full text-light-white text-3xl font-semibold">
            <span>You have not yet enrolled in any course</span>
          </div>
        )}
        {/* main div */}
      </div>
    </>
  );
}
