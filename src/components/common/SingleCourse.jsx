import { MdCurrencyRupee } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi2";
import { HiClock } from "react-icons/hi";
import { IoIosCheckmark } from "react-icons/io";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { apiConnector } from "../../api/apiConnector";
import {
  changeIsEdit,
  changeStep1Data,
} from "../../redux/slices/addCourseSlice";
import { useNavigate } from "react-router-dom";
import { courseURL } from "../../api/courseApi";
import { changeUserData } from "../../redux/slices/authSlice";

function SingleCourse({ course, myCourses, setMyCourses }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = async () => {
    const toastId = toast.loading("loading...");
    // //console.log("data we are sending",{courseId: course._id});

    try {
      const response = await apiConnector("post", courseURL.sendCourseDetail, {
        courseId: course._id,
      });
      if (response?.data?.success) {
        // //console.log("data received",response.data.data);

        toast.dismiss(toastId);
        dispatch(changeStep1Data(response.data.data));
        dispatch(changeIsEdit(true));
        navigate("/dashboard/add-course");
      }
    } catch (error) {
      //console.log(error);
      if (error.status === 401) {
        localStorage.removeItem("user");
        toast.error("session expired", { id: toastId });
        navigate("/login");
        dispatch(changeUserData(null));
      } else {
        toast.error("something went wrong while fetching course", {
          id: toastId,
        });
      }
    }
  };

  const handleDelete = async () => {
    const toastId = toast.loading("deleting...");
    try {
      const response = await apiConnector("delete", courseURL.deleteCourse, {
        courseId: course._id,
      });
      if (response?.data?.success) {
        toast.success("course deleted", { id: toastId });
        setMyCourses(
          myCourses.filter((eachCourse) => eachCourse._id !== course._id)
        );
      }
    } catch (error) {
      //console.log(error);
      if (error.status === 401) {
        localStorage.removeItem("user");
        toast.error("session expired", { id: toastId });
        navigate("/login");
        dispatch(changeUserData(null));
      } else {
        toast.error(error?.response?.data?.message || "An error occurred", {
          id: toastId,
        });
      }
    }
  };
  return (
    <>
      <div className="w-full flex  justify-between py-4 border-y-[1px] border-[rgba(230,230,230,0.1)] mb-4">
        {/* left div with image and course info */}
        <div className="flex gap-2">
          {/* img div */}
          <div className="w-50 h-34">
            <img
              src={course.thumbnail}
              className="w-full object-cover h-full"
              alt="course thumbnail"
            />
          </div>
          {/* course info div */}
          <div className="flex flex-col justify-between">
            <h1 className="text-lg font-medium text-light-white">
              {course.title}
            </h1>
            <p className="text-gray-white text-sm  max-w-[400px]">
              {course.description.length > 125
                ? course.description.slice(0, 125) + "..."
                : course.description}
            </p>
            <p className="text-gray-white text-sm">
              Created:{" "}
              {new Date(course.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            {/* publish and draft divs */}
            {course.status === "Published" ? (
              <div className="bg-bg-light-blue self-start flex gap-2 justify-center items-center rounded-2xl px-2 py-1">
                <span className="bg-green-500 rounded-full">
                  <IoIosCheckmark />
                </span>
                <span className="text-green-500 text-sm">{course.status}</span>
              </div>
            ) : (
              <div className="bg-bg-light-blue self-start flex gap-2 justify-center items-center rounded-2xl px-2 py-1">
                <span>
                  <HiClock className="text-yellow-500" />
                </span>
                <span className="text-yellow-500 text-sm">{course.status}</span>
              </div>
            )}
          </div>
        </div>
        {/* right div with price and action */}
        <div className="flex gap-6 self-start">
          <span className="flex items-center text-gray-white">
            <MdCurrencyRupee />
            <span>{course.price}</span>
          </span>
          <div className="flex gap-2 justify-center items-center text-gray-white">
            <MdOutlineEdit
              onClick={handleEdit}
              className="hover:text-sky-blue cursor-pointer duration-200"
              size={20}
            />
            <HiOutlineTrash
              onClick={handleDelete}
              className="hover:text-sky-blue cursor-pointer duration-200"
              size={20}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default SingleCourse;
