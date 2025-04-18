import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../api/apiConnector";
import { courseURL } from "../api/courseApi";
import toast from "react-hot-toast";
import ChartComponent from "../components/instructor/ChartComponent";

const Instructor = () => {
  const [isSwitch, setIsSwitch] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  async function fetchInstructorData() {
    try {
      const response = await apiConnector("get", courseURL.getDashboardData);
      if (response?.data?.success) {
        //console.log(response.data.data);
        setData(response.data.data);
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
    fetchInstructorData();
  }, []);
  return (
    <>
      <div className="flex-1 bg-bg-blue">
        <div className="w-11/12 max-w-[900px] mx-auto h-full pt-6 flex flex-col gap-4">
          {/* first section with heading */}
          <section>
            <h1 className="text-3xl text-light-white font-medium ">
              HI {data[0]?.instructor?.firstName}
            </h1>
            <p className="text-gray-white">let's start something new</p>
          </section>
          {/* second section with 2 parts */}
          <main className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-4">
            {/* left or bigger div */}
            <div className="bg-bg-light-blue rounded-md p-4 flex flex-col gap-2">
              <h2 className="text-xl text-light-white font-medium">
                Visualize
              </h2>
              <div className="flex justify-start gap-2">
                <button
                  onClick={() => {
                    setIsSwitch((prev) => !prev);
                  }}
                  className={`px-2 py-1 rounded-sm text-gray-white cursor-pointer ${
                    isSwitch ? "" : "bg-[rgba(240,240,240,0.1)]"
                  }`}
                >
                  Students
                </button>
                <button
                  onClick={() => {
                    setIsSwitch((prev) => !prev);
                  }}
                  className={`px-2 py-1 rounded-sm text-gray-white cursor-pointer ${
                    isSwitch ? "bg-[rgba(240,240,240,0.1)]" : ""
                  }`}
                >
                  Income
                </button>
              </div>
              <ChartComponent data={data} isSwitch={isSwitch} />
            </div>
            {/* right or smaller div */}
            <div className="bg-bg-light-blue rounded-md px-4 py-4 flex flex-col gap-4">
              <h2 className="text-xl text-light-white font-medium">
                Statistics
              </h2>
              <div>
                <p className="text-gray-white">Total Courses</p>
                <p className="text-gray-white">{data.length}</p>
              </div>
              <div>
                <p className="text-gray-white">Total Students</p>
                <p className="text-gray-white">
                  {data.reduce(
                    (acc, cv) => acc + cv.studentsEnrolled.length,
                    0
                  )}
                </p>
              </div>
              <div>
                <p className="text-gray-white">Total Income</p>
                <p className="text-gray-white">
                  Rs.{" "}
                  {data.reduce(
                    (acc, cv) => acc + cv.studentsEnrolled.length * cv.price,
                    0
                  )}
                </p>
              </div>
            </div>
          </main>
          {/* courses section */}
          <section className="p-4 bg-bg-light-blue rounded-md">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xl text-light-white font-medium">
                Your Courses
              </p>
              <button
                onClick={() => {
                  navigate("/dashboard/my-courses");
                }}
                className="text-sky-blue cursor-pointer"
              >
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.slice(0, 3).map((eachCourse) => (
                <div key={eachCourse._id}>
                  <div className="w-full h-44">
                    <img
                      className="w-full h-full object-cover rounded-sm"
                      src={eachCourse.thumbnail}
                      alt="course-image"
                    />
                  </div>
                  <h2 className="text-gray-white">{eachCourse.title}</h2>
                  <p>
                    <span className="text-sm text-gray-white pr-2">
                      {eachCourse.studentsEnrolled.length}{" "}
                      {eachCourse.studentsEnrolled.length > 1
                        ? "students"
                        : "student"}
                    </span>
                    <span className="text-sm text-gray-white pl-2 border-l-2 border-[rgba(240,240,240,0.1)]">
                      Rs. {eachCourse.price}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
export default Instructor;
