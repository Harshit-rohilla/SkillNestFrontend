import { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import { apiConnector } from "../api/apiConnector";
import { courseURL } from "../api/courseApi";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { MdCurrencyRupee } from "react-icons/md";
import Footer from "../components/common/Footer";
// import Marquee from "react-fast-marquee";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Mousewheel, Navigation } from "swiper/modules";
import { Rating } from "react-simple-star-rating";
import "swiper/css/navigation";
import { changeUserData } from "../redux/slices/authSlice";

const Catalog = () => {
  const [categoryData, setCategoryData] = useState({});
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [topSellingCourses, setTopSellingCourses] = useState([]);
  const [categoryCourse, setCategoryCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const { catalogName } = useParams();

  const getCategoryData = async () => {
    setLoading(true);
    try {
      // //console.log("data we are sending", catalogName);

      const response = await apiConnector("post", courseURL.getCategoryData, {
        categoryName: catalogName,
      });
      if (response?.data?.success) {
        // //console.log(response?.data?.data?.categoryData.course);
        // //console.log(response?.data?.data?.otherCategoryData);
        // //console.log(response.data.data.otherCategoryData);
        setCategoryData(response.data.data.categoryData);
        setRelatedCourses(response.data.data.otherCategoryData);
        setTopSellingCourses(response.data.data.topSellingCourses);
        setCategoryCourse(response.data.data.categoryData.course);
      }
    } catch (error) {
      //console.log(error);
      if (error.status === 401) {
        localStorage.removeItem("user");
        toast.success("session expired");
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
    getCategoryData();
  }, [catalogName]);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex flex-col bg-bg-blue">
          {loading ? (
            <div className="flex-1 flex justify-center items-center">
              <span className="loader"></span>
            </div>
          ) : (
            <>
              {/* first light div */}
              <div className="w-full bg-bg-light-blue">
                <div className=" w-11/12 flex flex-col gap-2 max-w-[1260px] mx-auto py-12">
                  <h1 className="text-2xl md:text-3xl text-light-white font-medium">
                    {categoryData?.name}
                  </h1>
                  <p className="text-gray-white text-sm md:text-base md:max-w-[80%]">
                    {categoryData?.description}
                  </p>
                </div>
              </div>
              {/* dark div or course on category starts here */}
              <div className="w-11/12 flex flex-col mb-14 gap-2 max-w-[1260px] mx-auto py-6">
                <h1 className="text-2xl text-light-white font-medium">
                  Courses on {catalogName}
                </h1>
                {categoryCourse.length === 0 ? (
                  <span className="text-gray-white">
                    No course found for this category
                  </span>
                ) : (
                  <Swiper
                    navigation={true}
                    breakpoints={{
                      0: { slidesPerView: 1 },
                      768: { slidesPerView: 3 },
                    }}
                    className="w-full"
                    direction="horizontal"
                    modules={[Mousewheel, Navigation]}
                    spaceBetween={15}
                    mousewheel
                  >
                    {categoryCourse.map((eachCourse) => (
                      <SwiperSlide key={eachCourse._id}>
                        <Link to={`/course/${eachCourse._id}`}>
                          <div className="flex flex-col">
                            <div className="w-full h-70 mb-2">
                              <img
                                className="h-full w-full object-cover"
                                src={eachCourse.thumbnail}
                                alt="thumbnail"
                              />
                            </div>
                            <h1 className="text-light-white text-lg font-medium">
                              {eachCourse.title}
                            </h1>
                            {/* rating stars*/}
                            {eachCourse.ratingAndReviews.length === 0 ? (
                              <h2 className="text-light-white">No Ratings</h2>
                            ) : (
                              <div className="flex gap-2 items-end">
                                <h2 className="text-yellow-500">
                                  {(
                                    eachCourse.ratingAndReviews.reduce(
                                      (acc, cv) => acc + cv.rating,
                                      0
                                    ) / eachCourse.ratingAndReviews.length
                                  ).toFixed(1)}
                                </h2>
                                <Rating
                                  SVGstyle={{ display: "inline-block" }}
                                  size={20}
                                  allowFraction
                                  readonly
                                  initialValue={(
                                    eachCourse.ratingAndReviews.reduce(
                                      (acc, cv) => acc + cv.rating,
                                      0
                                    ) / eachCourse.ratingAndReviews.length
                                  ).toFixed(1)}
                                />
                                <p className="text-gray-white">{`(${
                                  eachCourse.ratingAndReviews.length
                                } ${
                                  eachCourse.ratingAndReviews.length > 1
                                    ? "ratings"
                                    : "rating"
                                })`}</p>
                              </div>
                            )}

                            <p className="flex justify-start text-light-white items-center">
                              <MdCurrencyRupee />
                              <span>{eachCourse.price}</span>
                            </p>
                          </div>
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  // <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
                  //   {categoryCourse.map((eachCourse) => (<Link key={eachCourse._id} to={`/course/${eachCourse._id}`}><div  className="flex flex-col gap-1">
                  //       <div className="w-full h-70">
                  //           <img className="h-full w-full object-cover" src={eachCourse.thumbnail} alt="thumbnail" />
                  //       </div>
                  //       <h1 className="text-light-white text-lg font-medium">{eachCourse.title}</h1>
                  //       {/* rating stars will come here */}
                  //       <p className="flex justify-start text-light-white items-center"><MdCurrencyRupee/><span>{eachCourse.price}</span></p>
                  //   </div></Link>))}
                  // </div>
                )}
              </div>
              {/* top selling courses div starts here */}
              <div className="w-11/12 flex flex-col mb-14 gap-2 max-w-[1260px] mx-auto py-6">
                <h1 className="text-2xl text-light-white font-medium">
                  Top Selling Courses
                </h1>
                {topSellingCourses.length === 0 ? (
                  <span className="text-gray-white">
                    No course found for this category
                  </span>
                ) : (
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
                    {topSellingCourses.map((eachCourse) => (
                      <Link
                        key={eachCourse._id}
                        to={`/course/${eachCourse._id}`}
                      >
                        <div className="flex flex-col">
                          <div className="w-full h-70 mb-2">
                            <img
                              className="h-full w-full object-cover"
                              src={eachCourse.thumbnail}
                              loading="lazy"
                              alt="thumbnail"
                            />
                          </div>
                          <h1 className="text-light-white text-lg font-medium">
                            {eachCourse.title}
                          </h1>
                          {/* rating stars will come here */}
                          {eachCourse.ratingAndReviews.length === 0 ? (
                            <h2 className="text-light-white">No Ratings</h2>
                          ) : (
                            <div className="flex gap-2 items-end">
                              <h2 className="text-yellow-500">
                                {(
                                  eachCourse.ratingAndReviews.reduce(
                                    (acc, cv) => acc + cv.rating,
                                    0
                                  ) / eachCourse.ratingAndReviews.length
                                ).toFixed(1)}
                              </h2>
                              <Rating
                                SVGstyle={{ display: "inline-block" }}
                                size={20}
                                allowFraction
                                readonly
                                initialValue={(
                                  eachCourse.ratingAndReviews.reduce(
                                    (acc, cv) => acc + cv.rating,
                                    0
                                  ) / eachCourse.ratingAndReviews.length
                                ).toFixed(1)}
                              />
                              <p className="text-gray-white">{`(${
                                eachCourse.ratingAndReviews.length
                              } ${
                                eachCourse.ratingAndReviews.length > 1
                                  ? "ratings"
                                  : "rating"
                              })`}</p>
                            </div>
                          )}
                          <p className="flex justify-start text-light-white items-center">
                            <MdCurrencyRupee />
                            <span>{eachCourse.price}</span>
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {/* related courses starts here */}
              <div className="w-11/12 flex flex-col gap-2 max-w-[1260px] mx-auto py-6">
                <h1 className="text-2xl text-light-white font-medium">
                  Related Courses
                </h1>
                {relatedCourses.length === 0 ? (
                  <span className="text-gray-white">
                    No course found for this category
                  </span>
                ) : (
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
                    {relatedCourses.map((eachCourse) => (
                      <Link
                        key={eachCourse._id}
                        to={`/course/${eachCourse._id}`}
                      >
                        <div className="flex flex-col gap-2">
                          <div className="w-full h-70">
                            <img
                              className="h-full w-full object-cover"
                              src={eachCourse.thumbnail}
                              loading="lazy"
                              alt="thumbnail"
                            />
                          </div>
                          <h1 className="text-light-white text-lg font-medium">
                            {eachCourse.title}
                          </h1>
                          {/* rating stars will come here */}
                          {eachCourse?.ratingAndReviews?.length === 0 ? (
                            <h2 className="text-light-white">No Ratings</h2>
                          ) : (
                            <div className="flex gap-2 items-end">
                              <h2 className="text-yellow-500">
                                {(
                                  eachCourse.ratingAndReviews.reduce(
                                    (acc, cv) => acc + cv.rating,
                                    0
                                  ) / eachCourse.ratingAndReviews.length
                                ).toFixed(1)}
                              </h2>
                              <Rating
                                SVGstyle={{ display: "inline-block" }}
                                size={20}
                                allowFraction
                                readonly
                                initialValue={(
                                  eachCourse.ratingAndReviews.reduce(
                                    (acc, cv) => acc + cv.rating,
                                    0
                                  ) / eachCourse.ratingAndReviews.length
                                ).toFixed(1)}
                              />
                              <p className="text-gray-white">{`(${
                                eachCourse.ratingAndReviews.length
                              } ${
                                eachCourse.ratingAndReviews.length > 1
                                  ? "ratings"
                                  : "rating"
                              })`}</p>
                            </div>
                          )}
                          <p className="flex justify-start text-light-white items-center">
                            <MdCurrencyRupee />
                            <span>{eachCourse.price}</span>
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Catalog;
