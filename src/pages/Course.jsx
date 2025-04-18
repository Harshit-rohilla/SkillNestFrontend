import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { apiConnector } from "../api/apiConnector";
import { courseURL } from "../api/courseApi";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { MdCurrencyRupee } from "react-icons/md";
import { IoTvOutline } from "react-icons/io5";
import { PiCertificate } from "react-icons/pi";
import { MdOutlineHourglassEmpty } from "react-icons/md";
import { GoClock } from "react-icons/go";
import { CiGlobe } from "react-icons/ci";
import CourseDetailDropdown from "../components/course/CourseDetailDropdown";
import { buyCourse } from "../utility/buyCourse";
import { useSelector } from "react-redux";
import Marquee from "react-fast-marquee";
import { Rating } from "react-simple-star-rating";
import { changeUserData } from "../redux/slices/authSlice";

const Course = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  // const [isPurchased,setIsPurchased]=useState(false)
  // const [isAddedToCart,setIsAddedToCart]=useState(false)
  const user = useSelector((store) => store.auth.userData);
  // const cartData=useSelector((store)=>store.cart.cartData)

  function handleBuy() {
    if (user.accountType === "student") {
      buyCourse([courseId], user, navigate);
    }
  }

  const addToCart = async () => {
    const toastId = toast.loading("adding to cart...");
    try {
      const response = await apiConnector("post", courseURL.addCourseToCart, {
        courseId,
      });
      if (response?.data?.success) {
        toast.success("added to cart", { id: toastId });
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

  const getCourseData = async () => {
    setLoading(true);
    try {
      const response = await apiConnector(
        "post",
        courseURL.getHalfCourseDetail,
        { courseId }
      );
      // //console.log(response);
      if (response?.data?.success) {
        setCourseData(response.data.data);
        //console.log(response.data.data);

        // setIsPurchased(response.data.data.studentsEnrolled.includes(user._id))
        // setIsAddedToCart(user.cart.includes(courseId))
      }
    } catch (error) {
      //console.log(error);
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCourseData();
  }, [courseId]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        {/* content div */}
        <div className="flex-1 flex flex-col bg-bg-blue">
          {loading ? (
            <div className="flex-1 flex justify-center items-center">
              <span className="loader"></span>
            </div>
          ) : (
            <>
              {/* first section or section with light color */}
              <section className="w-full flex bg-bg-light-blue text-gray-white py-10">
                {/* less width div */}
                <div className="w-11/12 max-w-[1260px] mx-auto flex flex-col md:flex-row ">
                  {/* left div */}
                  <div className="md:w-[70%] md:pr-4 flex flex-col gap-1">
                    <h1 className="text-light-white text-3xl font-semibold">
                      {courseData?.title}
                    </h1>
                    <p>{courseData?.description}</p>
                    {/* rating will come here */}
                    <p>{courseData?.studentsEnrolled.length} students</p>
                    <p>
                      Created by {courseData?.instructor?.firstName}{" "}
                      {courseData?.instructor?.lastName}
                    </p>
                    <div className="flex gap-4">
                      <p className="flex items-center gap-1">
                        <GoClock />
                        <span>
                          Create at{" "}
                          {new Date(courseData?.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </p>
                      <p className="flex gap-1 items-center">
                        <CiGlobe />
                        <span>English</span>
                      </p>
                    </div>
                    {courseData?.ratingAndReviews?.length === 0 ? (
                      <h2 className="text-gray-white">No Ratings</h2>
                    ) : (
                      <div className="flex gap-2 items-center">
                        <h2 className="text-yellow-500 pt-1">
                          {(
                            courseData?.ratingAndReviews?.reduce(
                              (acc, cv) => acc + cv.rating,
                              0
                            ) / courseData?.ratingAndReviews?.length
                          ).toFixed(1)}
                        </h2>
                        <Rating
                          SVGstyle={{ display: "inline-block" }}
                          size={20}
                          allowFraction
                          readonly
                          initialValue={(
                            courseData?.ratingAndReviews.reduce(
                              (acc, cv) => acc + cv.rating,
                              0
                            ) / courseData?.ratingAndReviews.length
                          ).toFixed(1)}
                        />
                        <p className="text-gray-white pt-1">{`(${
                          courseData?.ratingAndReviews.length
                        } ${
                          courseData?.ratingAndReviews.length > 1
                            ? "ratings"
                            : "rating"
                        })`}</p>
                      </div>
                    )}
                  </div>
                  {/* right div */}
                  <div className="md:w-[30%] w-full md:relative">
                    <div className="md:absolute md:top-0 md:left-0 w-full flex flex-col gap-2 rounded-sm py-6 px-10 bg-[#232332]">
                      <div className="w-full h-44 rounded-ld">
                        <img
                          className="h-full w-full rounded-lg object-cover"
                          src={courseData?.thumbnail}
                          alt="thumbnail"
                        />
                      </div>
                      <h1 className="text-light-white flex justify-start items-center text-lg font-semibold">
                        <MdCurrencyRupee />
                        <span>{courseData?.price}</span>
                      </h1>
                      {user.accountType === "student" ? (
                        <>
                          <button
                            onClick={handleBuy}
                            className="text-center cursor-pointer py-2 bg-sky-blue text-light-white font-semibold rounded-md"
                          >
                            Buy Now
                          </button>
                          <button
                            onClick={addToCart}
                            className="text-center cursor-pointer py-2 bg-black text-light-white font-semibold rounded-md"
                          >
                            Add to Cart
                          </button>
                        </>
                      ) : null}

                      <p className="text-center">30-Day Money-Back Guarantee</p>
                      <div>
                        <p className="text-light-white">
                          This course includes:
                        </p>
                        <p className="flex justify-start items-center gap-1 text-sm">
                          <MdOutlineHourglassEmpty />
                          <span>Lifetime access</span>
                        </p>
                        <p className="flex justify-start items-center gap-1 text-sm">
                          <IoTvOutline />
                          <span>Access on Mobile and Tv</span>
                        </p>
                        <p className="flex justify-start items-center gap-1 text-sm">
                          <PiCertificate />
                          <span>Certificate of completion</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* second section or dark color div */}
              <section className="w-full bg-bg-blue text-gray-white py-8">
                <div className="w-11/12 max-w-[1260px] mx-auto flex flex-col md:flex-row gap-4">
                  <div className="md:w-[70%] flex flex-col gap-8">
                    <div className="border-[1px] border-[rgba(240,240,240,0.2)] py-4 px-4">
                      <h1 className="text-light-white text-xl font-semibold">
                        What you'll learn
                      </h1>
                      <p>{courseData?.whatYouWillLearn}</p>
                    </div>
                    <div>
                      <h1 className="text-light-white text-xl font-semibold">
                        Course Content
                      </h1>
                      <div className="flex gap-2">
                        <span>
                          {courseData?.courseContent?.length} section(s)
                        </span>
                        <span>
                          {courseData?.courseContent.reduce(
                            (acc, val) => acc + val?.subSection.length,
                            0
                          )}{" "}
                          lecture(s)
                        </span>
                      </div>
                      <CourseDetailDropdown
                        section={courseData?.courseContent}
                      />
                    </div>
                  </div>
                  <div className="md:w-[30%]"></div>
                </div>
              </section>
            </>
          )}
          <h1 className="text-center text-3xl text-light-white font-semibold mt-20 mb-10">
            Reviews from other learners
          </h1>
          <Marquee speed={80} className="mb-10">
            {courseData?.ratingAndReviews?.map((eachRatingAndReview) => (
              <div
                key={eachRatingAndReview?._id}
                className="px-4 py-4 mx-8 flex flex-col gap-4 w-80 h-52 bg-bg-light-blue"
              >
                <div className="flex gap-2 items-center">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={user.userImage}
                      alt="userImage"
                    />
                  </div>
                  <div>
                    <p className="text-light-white">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-gray-white">{user.email}</p>
                  </div>
                </div>
                <p className="text-sm text-light-white">
                  {eachRatingAndReview?.review.length > 150
                    ? eachRatingAndReview?.review.slice(0, 150) + "..."
                    : eachRatingAndReview?.review}
                </p>
                <div className="flex gap-2 items-center">
                  <h1 className="text-yellow-500 pt-1">
                    {eachRatingAndReview?.rating}
                  </h1>
                  <Rating
                    SVGstyle={{ display: "inline-block" }}
                    size={20}
                    allowFraction
                    readonly
                    initialValue={eachRatingAndReview?.rating}
                  />
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Course;
