import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import {
  changeIsEdit,
  changeStep,
  changeStep1Data,
} from "../../redux/slices/addCourseSlice";
import { useDispatch, useSelector } from "react-redux";
import { apiConnector } from "../../api/apiConnector";
import { courseURL } from "../../api/courseApi";
import toast from "react-hot-toast";
import Dropdown from "./Dropdown";
import DeleteModal from "../common/DeleteModal";
import { changeUserData } from "../../redux/slices/authSlice";

const Step2 = () => {
  //   *edit section is to know whether we are editing the section or not
  const [editSection, setEditSection] = useState(false);
  const { register, handleSubmit, setValue, reset, getValues } = useForm();
  const dispatch = useDispatch();
  //   *course is the entire course data which we are getting on every api call and we are updating it's value on successful api call to update the section and subSection
  const course = useSelector((store) => store.addCourse.step1Data);
  //   *section is entire section data that we are getting when we click on edit or delete so that we can send sectionId when we need it
  const [section, setSection] = useState(null);

  //* go back to previous page and change setEdit to true so that we can know we got on step1 from step2 and we want to edit the course info
  function goBack() {
    dispatch(changeIsEdit(true));
    dispatch(changeStep(1));
  }
  //* cancel editing section name and setEditSection to false so that we can create a new section
  function cancelEdit() {
    setEditSection(false);
    setValue("sectionName", "");
  }
  //* go to next page and before that check condition that user have created at least one section and subSection
  function goNext() {
    if (course.courseContent.length === 0) {
      toast.error("please add at least one section");
      return;
    }
    if (
      !course.courseContent.some((section) => section.subSection.length > 0)
    ) {
      toast.error("add at least one sub-section");
      return;
    }
    dispatch(changeStep(3));
  }
  //*calling createSection or updateSection api based on editSection is true or false if it's true that means we are editing a section which is already created and now we are updating it's name
  async function handleForm(data) {
    if (editSection) {
      try {
        //console.log("before api req",data.sectionName);

        const response = await apiConnector("put", courseURL.updateSection, {
          newSectionName: data.sectionName,
          sectionId: section?._id,
          courseId: course._id,
        });
        if (response?.data?.success) {
          //console.log("after api req",response.data.data.courseContent);

          dispatch(changeStep1Data(response.data.data));
          reset();
          setEditSection(false);
          toast.success("section updated");
        }
      } catch (error) {
        if (error.status === 401) {
          localStorage.removeItem("user");
          toast.error("session expired", { id: toastId });
          navigate("/login");
          dispatch(changeUserData(null));
        } else {
          toast.error(
            error?.response?.data?.message || "failed to update section"
          );
        }

        //console.log(error);
      }
    } else {
      try {
        //console.log("before",data.sectionName);

        const response = await apiConnector("post", courseURL.createSection, {
          title: data.sectionName,
          courseId: course._id,
        });
        if (response?.data?.success) {
          //console.log("after",response.data.data.courseContent);

          dispatch(changeStep1Data(response.data.data));
          reset();
          toast.success("section created");
        }
      } catch (error) {
        if (error.status === 401) {
          localStorage.removeItem("user");
          toast.error("session expired", { id: toastId });
          navigate("/login");
          dispatch(changeUserData(null));
        } else {
          toast.error(
            error?.response?.data?.message || "failed to create section"
          );
        }

        //console.log(error);
      }
    }
  }
  return (
    <>
      <div className="p-6 bg-[#232332] w-lg">
        <form onSubmit={handleSubmit(handleForm)}>
          <div className="flex flex-col gap-1">
            <label htmlFor="section" className="text-light-white font-medium">
              Section Name<sup className="text-red-700">*</sup>
            </label>
            <input
              type="text"
              id="section"
              required
              {...register("sectionName")}
              placeholder="Add a section to build your course"
              className="px-2.5 py-2  bg-bg-light-blue rounded-sm text-gray-white outline-none"
            />
          </div>
          <div className="flex gap-2 py-2">
            <button
              type="submit"
              className="flex justify-center items-center cursor-pointer gap-1 text-sky-blue border border-sky-blue px-2 py-1 rounded-sm"
            >
              <span>
                {editSection ? "Edit Section Name" : "Create Section"}
              </span>
              <AiOutlinePlusCircle />
            </button>
            {editSection ? (
              <button
                onClick={cancelEdit}
                type="button"
                className="flex justify-center items-center cursor-pointer text-sky-blue border border-sky-blue px-2 py-1 rounded-sm"
              >
                Cancel Edit
              </button>
            ) : null}
          </div>
        </form>
        <Dropdown
          setSection={setSection}
          setValue={setValue}
          course={course}
          setEditSection={setEditSection}
          section={section}
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={goBack}
            className="cursor-pointer text-sky-blue border border-sky-blue px-2 py-1 rounded-sm"
          >
            Back
          </button>
          <button
            onClick={goNext}
            className="cursor-pointer text-sky-blue border border-sky-blue px-2 py-1 rounded-sm"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
export default Step2;
