import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { courseURL } from "../../api/courseApi";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";
import { changeStep1Data } from "../../redux/slices/addCourseSlice";
import { changeUserData } from "../../redux/slices/authSlice";

const SubSectionModal = ({
  modalData,
  setModalData,
  view = false,
  edit = false,
  create = false,
}) => {
  const dispatch = useDispatch();
  const course = useSelector((store) => store.addCourse.step1Data);
  // file object received from file input
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  // show video on the screen after chosen in file input or when get from backend
  const [preview, setPreview] = useState(null);
  const { register, handleSubmit, setValue, getValues, reset } = useForm();
  // *if view or update is true then show form fields with filled data
  useEffect(() => {
    if (!create) {
      setValue("title", modalData?.title);
      setPreview(modalData?.video);
      setValue("description", modalData?.description);
    }
  }, []);
  // *check if user changed anything in form
  const isFormUpdated = () => {
    const currentValue = getValues();
    if (
      modalData.title !== currentValue.title ||
      modalData.description !== currentValue.description ||
      modalData.video !== currentValue.video
    ) {
      return true;
    } else {
      return false;
    }
  };
  // *call create or updated api based on whether create is true or edit is true
  const handleFormSubmission = async (data) => {
    if (create) {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("video", file);
      formData.append("sectionId", modalData);
      formData.append("courseId", course._id);
      const toastId = toast.loading("creating subsection...");
      try {
        const response = await axios.post(
          courseURL.createSubSection,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        if (response?.data?.success) {
          toast.success("subsection created", { id: toastId });
          setPreview(null);
          reset();
          dispatch(changeStep1Data(response.data.data));
          setModalData(null);
        }
      } catch (error) {
        //console.log(error);
        if (error.status === 401) {
          localStorage.removeItem("user");
          toast.error("session expired", { id: toastId });
          navigate("/login");
          dispatch(changeUserData(null));
        } else {
          toast.error(
            error?.response?.data?.message ||
              "An error occurred while creating subsection",
            { id: toastId }
          );
        }
      } finally {
        setLoading(false);
      }
    } else {
      if (isFormUpdated()) {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        if (file) {
          formData.append("video", file);
        }
        formData.append("subSectionId", modalData._id);
        formData.append("courseId", course._id);
        const toastId = toast.loading("updating subsection...");
        try {
          const response = await axios.put(
            courseURL.updateSubSection,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
              withCredentials: true,
            }
          );
          if (response?.data?.success) {
            toast.success("subsection updated", { id: toastId });
            reset();
            setPreview(null);
            dispatch(changeStep1Data(response.data.data));
            setModalData(null);
          }
        } catch (error) {
          //console.log(error);
          if (error.status === 401) {
            localStorage.removeItem("user");
            toast.error("session expired", { id: toastId });
            navigate("/login");
            dispatch(changeUserData(null));
          } else {
            toast.error(
              error?.response?.data?.message ||
                "An error occurred while updating subsection",
              { id: toastId }
            );
          }
        } finally {
          setLoading(false);
        }
      } else {
        toast.error("change field to update");
      }
    }
  };
  return (
    <>
      <div
        onClick={() => {
          setModalData(null);
        }}
        className="fixed top-0  left-0 z-50 h-full w-full backdrop-blur-lg flex justify-center items-center"
      >
        {/* main div */}
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="bg-[#232332] w-lg"
        >
          <div className="flex justify-between px-4 py-2 items-center w-full bg-bg-light-blue text-light-white text-lg font-medium">
            <span>
              {view
                ? "Viewing Lecture"
                : edit
                ? "Edit Lecture"
                : "Create Lecture"}
            </span>
            <RxCross2
              onClick={() => {
                setModalData(null);
              }}
              className="cursor-pointer"
            />
          </div>
          <form
            onSubmit={handleSubmit(handleFormSubmission)}
            className="flex flex-col gap-4 py-4 px-4"
          >
            {/* show file input only when user is not viewing */}
            {view ? null : (
              <div>
                <label className="text-light-white" htmlFor="video">
                  Video<sup className="text-red-700">*</sup>
                </label>
                {/* e.target.files is a file list that contain multiple files and at [0] is first file*/}
                <input
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  }}
                  required={create}
                  className="outline-none px-2 py-2 text-gray-white bg-bg-light-blue w-full rounded-sm"
                  disabled={view}
                  id="video"
                  type="file"
                  accept="video/*"
                />
              </div>
            )}
            {/* only show preview when available */}
            {preview ? (
              <div className="w-full">
                <video
                  src={preview}
                  controls
                  className="w-full aspect-auto object-cover"
                />
              </div>
            ) : null}
            <div>
              <label className="text-light-white" htmlFor="title">
                Title<sup className="text-red-700">*</sup>
              </label>
              <input
                {...register("title")}
                required
                readOnly={view}
                placeholder="Enter Title"
                className="outline-none px-2 py-2 bg-bg-light-blue rounded-sm w-full text-gray-white"
                id="title"
                type="text"
              />
            </div>
            <div>
              <label className="text-light-white" htmlFor="des">
                Description<sup className="text-red-700">*</sup>
              </label>
              <textarea
                {...register("description")}
                required
                readOnly={view}
                placeholder="Enter Description"
                className="outline-none px-2 py-2 bg-bg-light-blue rounded-sm h-20 w-full text-gray-white"
                id="des"
              ></textarea>
            </div>
            <button
              disabled={loading}
              className="px-2 py-1 self-end rounded-sm cursor-pointer bg-sky-blue text-light-white font-medium"
            >
              {edit ? "Update" : create ? "Create" : null}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default SubSectionModal;
