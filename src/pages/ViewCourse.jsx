import { useEffect, useRef, useState } from "react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import { apiConnector } from "../api/apiConnector";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  changeCurrentSubSection,
  changeCourseData,
  changeCurrentVideo,
  changeSectionData,
  changeSubSectionData,
} from "../redux/slices/viewCourseSlice";
import { useDispatch, useSelector } from "react-redux";
import { courseURL } from "../api/courseApi";
import Sidebar from "../components/view_course/Sidebar";
import { FaRedoAlt } from "react-icons/fa";
import { changeUserData } from "../redux/slices/authSlice";

const ViewCourse = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { courseId } = useParams();
  const currentVideo = useSelector((store) => store.viewCourse.currentVideo);
  // const currentSubSection=useSelector((store)=>store.viewCourse.currentSubSection)
  // const courseProgress=useSelector((store)=>store.viewCourse.courseProgress)
  const videoRef = useRef(null);
  // const [isMarkBtnVisible,setIsMarkBtnVisible]=useState(false)
  const [isReWatchBtnVisible, setIsReWatchBtnVisible] = useState(false);

  function handleReWatch() {
    if (videoRef?.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsReWatchBtnVisible(false);
    }
  }
  // function handleMarkBtn(){
  //     setIsMarkBtnVisible(false)
  //     // backend call
  //     // set subSection id in global store
  // }

  const getCourseData = async () => {
    setLoading(true);
    try {
      const response = await apiConnector("post", courseURL.viewCourseDetail, {
        courseId,
      });
      //console.log(response);
      dispatch(changeSectionData(response?.data?.data?.courseContent));
      dispatch(
        changeCurrentVideo(
          response?.data?.data?.courseContent[0]?.subSection[0]?.video
        )
      );
      dispatch(changeCourseData(response?.data?.data));
      dispatch(
        changeCurrentSubSection(
          response?.data?.data?.courseContent[0]?.subSection[0]._id
        )
      );
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
    getCourseData();
  }, [courseId]);
  return (
    <>
      <div className="min-h-screen w-full flex flex-col">
        <Navbar />
        <div className="flex-1 flex">
          <Sidebar />
          <div className="flex-1 bg-bg-blue relative">
            <video
              onSeeking={() => {
                setIsReWatchBtnVisible(false);
              }}
              onEnded={() => {
                setIsReWatchBtnVisible(true);
              }}
              ref={videoRef}
              className="aspect-video"
              controls
              src={currentVideo}
            ></video>

            <FaRedoAlt
              onClick={handleReWatch}
              className={`${
                isReWatchBtnVisible ? "block" : "hidden"
              } absolute cursor-pointer text-bg-light-blue left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
              size={30}
            />
            {/* <button onClick={handleMarkBtn} className={`${isMarkBtnVisible?"block":"hidden"} absolute cursor-pointer left-1/2 top-1/2 translate-y-1/2 -translate-x-1/2 px-2 py-2 bg-sky-blue text-light-white font-medium rounded-sm`}>Mark As Completed</button> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ViewCourse;
