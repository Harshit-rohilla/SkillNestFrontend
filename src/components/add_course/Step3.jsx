import { useDispatch, useSelector } from "react-redux";
import {
  changeIsEdit,
  changeSectionData,
  changeStep,
  changeStep1Data,
} from "../../redux/slices/addCourseSlice";
import { apiConnector } from "../../api/apiConnector";
import toast from "react-hot-toast";
import { courseURL } from "../../api/courseApi";
import { useNavigate } from "react-router-dom";
import { changeUserData } from "../../redux/slices/authSlice";

const Step3 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courseId = useSelector((store) => store.addCourse.step1Data?._id);
  const goBack = () => {
    dispatch(changeStep(2));
  };

  const publish = async () => {
    const toastId = toast.loading("loading...");
    try {
      const response = await apiConnector("post", courseURL.publishCourse, {
        courseId,
      });
      if (response?.data?.success) {
        toast.success("course published", { id: toastId });
        dispatch(changeStep1Data(null));
        dispatch(changeStep(1));
        dispatch(changeIsEdit(false));
        dispatch(changeSectionData({}));
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
        toast.error(error?.response?.data?.message || "An error occurred", {
          id: toastId,
        });
      }
    }
  };

  const draft = async () => {
    const toastId = toast.loading("loading...");
    try {
      const response = await apiConnector("post", courseURL.draftCourse, {
        courseId,
      });
      if (response?.data?.success) {
        toast.success("saved in draft", { id: toastId });
        dispatch(changeStep1Data(null));
        dispatch(changeStep(1));
        dispatch(changeIsEdit(false));
        dispatch(changeSectionData({}));
        navigate("/dashboard/add-course");
      }
    } catch (error) {
      //console.log(error);
      toast.error(error?.response?.data?.message || "An error occurred", {
        id: toastId,
      });
    }
  };
  return (
    <>
      <div className="w-lg bg-bg-light-blue rounded-sm px-4 py-4 flex flex-col gap-6">
        <div>
          <h1 className="text-lg text-light-white font-medium">
            Publish Setting
          </h1>
          <p className="text-gray-white">
            Make this course public or save as draft
          </p>
        </div>
        <div className="flex justify-between">
          <button
            onClick={goBack}
            className="px-2 py-1 bg-gray-white text-black rounded-sm cursor-pointer"
          >
            Back
          </button>
          <div className="flex gap-2">
            <button
              onClick={draft}
              className="px-2 py-1 bg-sky-blue text-light-white rounded-sm cursor-pointer"
            >
              Save as Draft
            </button>
            <button
              onClick={publish}
              className="px-2 py-1 bg-sky-blue text-light-white rounded-sm cursor-pointer"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Step3;
