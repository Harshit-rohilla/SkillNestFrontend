import { HiOutlineTrash } from "react-icons/hi2";
import { HiPencil } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { TiPlus } from "react-icons/ti";
import { RxDropdownMenu } from "react-icons/rx";
import DeleteModal from "../common/DeleteModal";
import { useState } from "react";
import { apiConnector } from "../../api/apiConnector";
import { courseURL } from "../../api/courseApi";
import { useDispatch } from "react-redux";
import { changeStep1Data } from "../../redux/slices/addCourseSlice";
import toast from "react-hot-toast";
import SubSectionModal from "./SubSectionModal";

function Dropdown({ setValue, setSection, course, setEditSection, section }) {
  const [modalVisibility, setModalVisibility] = useState(false);
  const dispatch = useDispatch();
  //   *to know whether i clicked on section or subsection trash icon
  const [clickOnSection, setClickOnSection] = useState(false);
  // *set subsection data
  const [subSection, setSubSection] = useState(null);
  const [viewModalData, setViewModalData] = useState(null);
  const [editModalData, setEditModalData] = useState(null);
  const [createModalData, setCreateModalData] = useState(null);

  async function deleteSubSection() {
    const toastId = toast.loading("deleting subsection...");
    try {
      const response = await apiConnector(
        "delete",
        courseURL.deleteSubSection,
        { subSectionId: subSection._id, courseId: course._id }
      );
      if (response?.data?.success) {
        dispatch(changeStep1Data(response.data.data));
        setModalVisibility(false);
        toast.success("subsection deleted", { id: toastId });
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
            "error occurred while deleting this subsection",
          { id: toastId }
        );
      }
    }
  }

  async function deleteSection() {
    const toastId = toast.loading("deleting section...");
    try {
      const response = await apiConnector("delete", courseURL.deleteSection, {
        sectionId: section._id,
        courseId: course._id,
      });
      if (response?.data?.success) {
        dispatch(changeStep1Data(response.data.data));
        setModalVisibility(false);
        toast.success("section deleted", { id: toastId });
      }
    } catch (error) {
      //console.log(error);
      toast.error(
        error?.response?.data?.message ||
          "error occurred while deleting this section",
        { id: toastId }
      );
    }
  }
  return (
    <>
      <div
        className={`w-full bg-bg-light-blue text-gray-white ${
          course?.courseContent.length > 0 ? "px-4 py-4" : null
        } rounded-sm`}
      >
        {course?.courseContent.map((section) => (
          <details key={section._id} open className="group mb-2">
            <summary className="list-none flex justify-between items-center">
              <span className="font-medium flex justify-center items-center gap-2">
                <RxDropdownMenu />
                <span>{section.title}</span>
              </span>
              <span className="flex gap-2">
                <HiPencil
                  onClick={() => {
                    setValue("sectionName", section.title);
                    setEditSection(true);
                    setSection(section);
                  }}
                  className="cursor-pointer"
                />
                <HiOutlineTrash
                  onClick={() => {
                    setSection(section);
                    setModalVisibility((prev) => !prev);
                    setClickOnSection(true);
                  }}
                  className="cursor-pointer"
                />
                <IoIosArrowDown className="group-open:rotate-180 duration-300" />
              </span>
            </summary>
            <div className="border-t-[1px] border-[rgba(240,240,240,0.2)] px-2 py-1 mt-1">
              {section?.subSection.map((obj) => (
                <div className="flex justify-between mb-1" key={Object._id}>
                  <div className="flex gap-2 items-center">
                    <RxDropdownMenu />
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        setViewModalData(obj);
                      }}
                    >
                      {obj.title}
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <HiPencil
                      className="cursor-pointer"
                      onClick={() => {
                        setEditModalData(obj);
                      }}
                    />
                    <HiOutlineTrash
                      className="cursor-pointer"
                      onClick={() => {
                        setSubSection(obj);
                        setModalVisibility((prev) => !prev);
                        setClickOnSection(false);
                      }}
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  setCreateModalData(section._id);
                }}
                className="text-sky-blue flex justify-center items-center gap-1 cursor-pointer text-sm"
              >
                <TiPlus />
                <span>Add Lecture</span>
              </button>
            </div>
          </details>
        ))}
      </div>
      {viewModalData ? (
        <SubSectionModal
          modalData={viewModalData}
          setModalData={setViewModalData}
          view={true}
        />
      ) : editModalData ? (
        <SubSectionModal
          modalData={editModalData}
          setModalData={setEditModalData}
          edit={true}
        />
      ) : createModalData ? (
        <SubSectionModal
          modalData={createModalData}
          setModalData={setCreateModalData}
          create={true}
        />
      ) : null}
      <DeleteModal
        clickOnSection={clickOnSection}
        deleteSection={deleteSection}
        deleteSubSection={deleteSubSection}
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
      />
    </>
  );
}
export default Dropdown;
