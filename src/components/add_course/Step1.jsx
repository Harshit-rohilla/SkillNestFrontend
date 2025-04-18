import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { changeStep, changeStep1Data } from "../../redux/slices/addCourseSlice";

import { courseURL } from "../../api/courseApi";
import toast from "react-hot-toast";
import axios from "axios";
import { changeUserData } from "../../redux/slices/authSlice";

const Step1 = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();
  const inputRef = useRef(null);
  const tagRef = useRef(null);
  const allCategories = useSelector((store) => store.category.allCategories);
  const [req, setReq] = useState([]);
  const [tag, setTag] = useState([]);
  const isEdit = useSelector((store) => store.addCourse.isEdit);
  const submittedFormData = useSelector((store) => store.addCourse.step1Data);

  useEffect(() => {
    if (isEdit) {
      setValue("title", submittedFormData.title);
      setValue("description", submittedFormData.description);
      setValue("price", submittedFormData.price);
      setValue("category", submittedFormData.category.name);
      setPreview(submittedFormData.thumbnail);
      setValue("whatYouWillLearn", submittedFormData.whatYouWillLearn);
      setReq(submittedFormData.instructions);
      setTag(submittedFormData.tags);
    }
  }, []);

  const handleForm = async (data) => {
    if (isNaN(Number(data.price))) {
      toast.error("enter price in numbers");
      return;
    }
    if (isEdit) {
      const toastId = toast.loading("updating course...");
      const formData = new FormData();
      if (submittedFormData.tags.toString() !== tag.toString()) {
        tag.forEach((item) => formData.append("tags[]", item));
      }
      if (submittedFormData.instructions.toString() !== req.toString()) {
        req.forEach((item) => formData.append("instructions[]", item));
      }
      if (submittedFormData.title !== data.title) {
        formData.append("title", data.title);
      }
      if (submittedFormData.description !== data.description) {
        formData.append("description", data.description);
      }
      if (submittedFormData.price !== data.price) {
        formData.append("price", data.price);
      }
      if (submittedFormData.category !== data.category) {
        formData.append("category", data.category);
      }
      if (submittedFormData.whatYouWillLearn !== data.whatYouWillLearn) {
        formData.append("whatYouWillLearn", data.whatYouWillLearn);
      }
      if (file) {
        formData.append("thumbnail", file);
      }
      formData.append("courseId", submittedFormData._id);

      try {
        const response = await axios.post(courseURL.updateCourse, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        if (response?.data?.success) {
          toast.success("course updated", { id: toastId });
          dispatch(changeStep1Data(response.data.data));
          // //console.log(formData);
          setReq([]);
          setTag([]);
          dispatch(changeStep(2));
          reset();
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
    } else {
      const toastId = toast.loading("creating course...");
      const formData = new FormData();
      formData.append("tags", tag);
      formData.append("instructions", req);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("whatYouWillLearn", data.whatYouWillLearn);
      if (file) {
        formData.append("thumbnail", file);
      }
      // formData.append("courseId",submittedFormData._id)
      // //console.log("data that we are sending",formData);

      try {
        const response = await axios.post(courseURL.createCourse, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        if (response?.data?.success) {
          // //console.log("received data is",response.data.data);
          toast.success("course created", { id: toastId });
          dispatch(changeStep1Data(response.data.data));
          // //console.log(formData);
          setReq([]);
          setTag([]);
          dispatch(changeStep(2));
          reset();
        }
      } catch (error) {
        //console.log(error);
        toast.error(error?.response?.data?.message || "unable to create", {
          id: toastId,
        });
      }
    }
  };

  function handleReq() {
    if (inputRef.current.value.trim() === "") {
      //console.log("empty value provided");
      return;
    }
    const valueToAdd = inputRef.current.value;
    setReq((prev) => [...prev, valueToAdd]);
    inputRef.current.value = "";
  }
  function removeReq(val) {
    setReq((prev) => prev.filter((str) => str !== val));
  }
  function handleTag() {
    if (tagRef.current.value.trim() === "") {
      //console.log("empty value provided");
      return;
    }
    const valueToAdd = tagRef.current.value;
    setTag((prev) => [...prev, valueToAdd]);
    tagRef.current.value = "";
  }
  function removeTag(val) {
    setTag((prev) => prev.filter((str) => str !== val));
  }

  // TODO: handle image submission separately in both submitting and retrieving
  return (
    <>
      <div className="py-4 px-6 bg-[#232332]">
        <form
          onSubmit={handleSubmit(handleForm)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-light-white font-medium">
              Course Title<sup className="text-red-700">*</sup>
            </label>
            <input
              {...register("title")}
              id="title"
              type="text"
              required={!isEdit}
              placeholder="Enter Course Title"
              className="px-2.5 py-2 w-lg bg-bg-light-blue rounded-sm text-gray-white outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="des" className="text-light-white font-medium">
              Course Short Description<sup className="text-red-700">*</sup>
            </label>
            <textarea
              {...register("description")}
              id="des"
              type="text"
              required={!isEdit}
              placeholder="Enter Description"
              className="px-2.5 py-2 min-h-40 w-lg bg-bg-light-blue rounded-sm text-gray-white outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="price" className="text-light-white font-medium">
              Price<sup className="text-red-700">*</sup>
            </label>
            <input
              {...register("price")}
              id="price"
              type="text"
              required={!isEdit}
              placeholder="Enter Price"
              className="px-2.5 py-2 w-lg bg-bg-light-blue rounded-sm text-gray-white outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="Category" className="text-light-white font-medium">
              Category<sup className="text-red-700">*</sup>
            </label>
            <select
              {...register("category")}
              id="Category"
              type="text"
              defaultValue=""
              required={!isEdit}
              placeholder="Choose a Category"
              className="px-2.5 py-2 w-lg bg-bg-light-blue rounded-sm text-gray-white outline-none"
            >
              <option value="" disabled>
                Select an option
              </option>
              {allCategories.map((val, index) => (
                <option key={index}>{val.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="tags" className="text-light-white font-medium">
              Tags<sup className="text-red-700">*</sup>
            </label>
            <input
              ref={tagRef}
              id="tags"
              type="text"
              placeholder="Enter a Tag"
              className="px-2.5 py-2 w-lg bg-bg-light-blue rounded-sm text-gray-white outline-none"
            />
            <button
              type="button"
              onClick={handleTag}
              className="px-2 py-1 cursor-pointer bg-sky-blue rounded-md self-start mt-1"
            >
              Add
            </button>
            <div className="flex gap-2">
              {tag.map((str, index) => (
                <div
                  key={index}
                  className="text-sm border px-2 py-1 flex items-center text-red-700"
                >
                  <span className="text-light-white">{str}</span>
                  <IoIosClose
                    className="cursor-pointer text-red-500"
                    onClick={() => {
                      removeTag(str);
                    }}
                    size={20}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="thumbnail" className="text-light-white font-medium">
              Course Thumbnail<sup className="text-red-700">*</sup>
            </label>
            <input
              id="thumbnail"
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
              required={!isEdit}
              className="px-2.5 py-2 w-lg bg-bg-light-blue rounded-sm text-gray-white outline-none"
            />
          </div>
          {preview ? (
            <div className="flex flex-col gap-1">
              <label className="text-light-white font-medium">Preview</label>
              <img
                src={preview}
                className="w-lg h-auto object-cover"
                alt="img"
              />
            </div>
          ) : null}
          <div className="flex flex-col gap-1">
            <label htmlFor="Benefits" className="text-light-white font-medium">
              Benefits of the course<sup className="text-red-700">*</sup>
            </label>
            <textarea
              {...register("whatYouWillLearn")}
              id="Benefits"
              type="text"
              required={!isEdit}
              placeholder="Enter Benefits of the course"
              className="px-2.5 py-2 w-lg bg-bg-light-blue h-28 rounded-sm text-gray-white outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="Requirements"
              className="text-light-white font-medium"
            >
              Requirements/Instructions<sup className="text-red-700">*</sup>
            </label>
            <input
              ref={inputRef}
              id="Requirements"
              type="text"
              placeholder="Enter Requirements"
              className="px-2.5 py-2 w-lg bg-bg-light-blue rounded-sm text-gray-white outline-none"
            />
            <button
              type="button"
              onClick={handleReq}
              className="px-2 py-1 cursor-pointer bg-sky-blue rounded-md self-start mt-1"
            >
              Add
            </button>
            <div className="flex gap-2">
              {req.map((str, index) => (
                <div
                  key={index}
                  className="text-sm border px-2 py-1 flex items-center text-red-700"
                >
                  <span className="text-light-white">{str}</span>
                  <IoIosClose
                    className="cursor-pointer text-red-500"
                    onClick={() => {
                      removeReq(str);
                    }}
                    size={20}
                  />
                </div>
              ))}
            </div>
          </div>
          <button className="px-2 py-1 bg-sky-blue cursor-pointer text-light-white font-medium self-end rounded-sm">
            {isEdit ? "Update" : "Next"}
          </button>
        </form>
      </div>
    </>
  );
};
export default Step1;
