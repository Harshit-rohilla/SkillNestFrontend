import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import { LiaVideoSolid } from "react-icons/lia";
import {
  changeCourseProgress,
  changeCurrentSubSection,
  changeCurrentVideo,
} from "../../redux/slices/viewCourseSlice";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Rating } from "react-simple-star-rating";
import toast from "react-hot-toast";
import { apiConnector } from "../../api/apiConnector";
import { courseURL } from "../../api/courseApi";

const Sidebar = () => {
  const dispatch = useDispatch();
  const sectionData = useSelector((store) => store.viewCourse.sectionData);
  const currentSubSection = useSelector(
    (store) => store.viewCourse.currentSubSection
  );
  const navigate = useNavigate();
  const courseData = useSelector((store) => store.viewCourse.courseData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = useSelector((store) => store.auth.userData);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  // const courseProgress=useSelector((store)=>store.viewCourse.courseProgress)
  // const [isChecked,setIsChecked]=useState(courseProgress.some((cp)=>cp.completedVideos.includes(eachSubSection._id)))

  // useEffect(()=>{if(user?.courseProgress){dispatch(changeCourseProgress(user.courseProgress))}},[])

  const handleReview = (e) => {
    setReview(e.target.value);
  };

  const handleRating = (rate) => {
    setRating(rate);
  };
  function handleSubSection(subSection) {
    dispatch(changeCurrentSubSection(subSection._id));
    dispatch(changeCurrentVideo(subSection.video));
  }
  function handleModalVisibility() {
    setIsModalVisible((prev) => !prev);
  }
  async function handleForm(e) {
    e.preventDefault();
    setIsModalVisible(false);
    if (rating === 0) {
      toast.error("please provide rating");
      return;
    }
    const toastId = toast.loading("submitting...");
    try {
      const response = await apiConnector(
        "post",
        courseURL.createRatingAndReview,
        { courseId: courseData._id, rating, review }
      );
      if (response.data.success) {
        setRating(0);
        setReview("");
        toast.success("submitted", { id: toastId });
      }
    } catch (error) {
      //console.log(error);
      toast.error(error?.response?.data?.message || "An error occurred", {
        id: toastId,
      });
    }
  }
  return (
    <>
      <div className="min-w-60 bg-bg-light-blue pt-6">
        <div className="flex px-4 justify-between items-center mb-2">
          <MdKeyboardDoubleArrowLeft
            onClick={() => {
              navigate(-1);
            }}
            className="text-light-white cursor-pointer"
            size={20}
          />
          <button
            onClick={handleModalVisibility}
            className="bg-sky-blue text-light-white font-semibold text-sm px-2 py-2 rounded-md cursor-pointer"
          >
            Add Review
          </button>
        </div>
        <div className="flex px-4 justify-between items-center mb-2 text-light-white">
          {courseData?.title}
        </div>
        {sectionData.map((eachSection, index) => (
          <details
            key={eachSection._id}
            open={index === 0}
            className="cursor-pointer group"
          >
            <summary className="w-full py-2 flex justify-between items-center px-4 bg-[#2C333F]">
              <h1 className="text-light-white">{eachSection.title}</h1>
              <IoIosArrowDown className="group-open:rotate-180 duration-300 text-light-white" />
            </summary>
            {eachSection.subSection.map((eachSubSection) => (
              <div
                onClick={() => {
                  handleSubSection(eachSubSection);
                }}
                key={eachSubSection._id}
                className={`w-full py-1 flex cursor-pointer items-center px-4 gap-2`}
              >
                {/* <input checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} type="checkbox"/> */}
                <h1
                  className={`text-sm text-gray-white ${
                    eachSubSection._id === currentSubSection
                      ? "text-sky-blue"
                      : ""
                  }`}
                >
                  {eachSubSection.title}
                </h1>
                <LiaVideoSolid
                  className={`text-gray-white ${
                    eachSubSection._id === currentSubSection
                      ? "text-sky-blue"
                      : ""
                  }`}
                />
              </div>
            ))}
          </details>
        ))}
      </div>
      <div
        onClick={handleModalVisibility}
        className={`${
          isModalVisible ? "fixed" : "hidden"
        } h-full top-0 left-0 w-full backdrop-blur-lg z-50 flex justify-center items-center`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-[30%] bg-bg-blue rounded-sm overflow-hidden"
        >
          <div className="w-full flex justify-between items-center px-4 bg-bg-light-blue py-2 border-b-[1px] border-[rgba(255,255,255,0.1)]">
            <h1 className="text-light-white font-medium">Add Review</h1>
            <IoClose
              onClick={handleModalVisibility}
              size={20}
              className="text-light-white cursor-pointer"
            />
          </div>
          <div className="w-full px-4">
            <div className="flex items-center justify-center gap-4 my-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={user.userImage}
                  alt="profile-image"
                />
              </div>
              <div>
                <p className="text-light-white">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-light-white">Posting Publicly</p>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <Rating
                SVGstyle={{ display: "inline-block" }}
                onClick={handleRating}
                allowFraction
                transition
                ratingValue={rating}
              />
            </div>
            <form onSubmit={handleForm} className="w-full flex flex-col my-4">
              <label className="mb-1 text-sm text-light-white" htmlFor="review">
                Add Your Experience<sup className="text-red-700">*</sup>
              </label>
              <textarea
                onChange={handleReview}
                value={review}
                className="h-30 outline-none rounded-sm text-sm px-2 py-2 bg-bg-light-blue text-gray-white"
                placeholder="Share details of your own experience of this course"
                id="review"
              ></textarea>
              <button className="bg-sky-blue text-light-white self-end font-medium mt-2 px-2 py-2 cursor-pointer rounded-sm">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
