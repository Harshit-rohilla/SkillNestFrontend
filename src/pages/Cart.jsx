import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, setCartData } from "../redux/slices/cartSlice";
import { apiConnector } from "../api/apiConnector";
import { courseURL } from "../api/courseApi";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { buyCourse } from "../utility/buyCourse";
import { Link } from "react-router-dom";
import { changeUserData } from "../redux/slices/authSlice";
import { Rating } from "react-simple-star-rating";
// !when user buy course from cart on successful buying empty the cart

const Cart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((store) => store.cart.cartData);
  const [loading, setLoading] = useState(false);
  const user = useSelector((store) => store.auth.userData);
  const navigate = useNavigate();
  const [allCourseId, setAllCourseId] = useState([]);

  useEffect(() => {
    const dummyData = cartData.map((course) => course._id);
    setAllCourseId(dummyData);
  }, [cartData]);

  function handleBuy() {
    //console.log(allCourseId);

    if (user.accountType === "student") {
      buyCourse(allCourseId, user, navigate);
    }
  }

  const getCartData = async () => {
    setLoading(true);
    try {
      const response = await apiConnector("get", courseURL.getCartData);
      if (response?.data?.success) {
        //console.log(response.data.data);
        dispatch(setCartData(response.data.data.cart));
      }
    } catch (error) {
      if (error.status === 401) {
        localStorage.removeItem("user");
        toast.success("session expired");
        navigate("/login");
        dispatch(changeUserData(null));
      } else {
        toast.error(error?.response?.data?.message || "couldn't fetch cart");
      }
      //console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  async function removeCourse(id) {
    dispatch(removeFromCart(id));
    try {
      const response = await apiConnector(
        "post",
        courseURL.removeCourseFromCart,
        { courseId: id }
      );
    } catch (error) {
      if (error.status === 401) {
        localStorage.removeItem("user");
        toast.success("session expired");
        navigate("/login");
        dispatch(changeUserData(null));
      } else {
        toast.error(
          error?.response?.data?.message || "couldn't remove course from cart"
        );
      }
      //console.log(error);
    }
  }
  return (
    <>
      <div className="flex-1 bg-bg-blue">
        {/* main div */}
        {loading ? (
          <div className="h-full w-full flex justify-center items-center">
            <span className="loader"></span>
          </div>
        ) : cartData.length ? (
          <div className="w-11/12 max-w-[1000px] mx-auto h-full flex flex-col pt-6">
            <h1 className="text-3xl text-light-white font-semibold mb-6">
              Cart
            </h1>
            <p className="mb-2 text-light-white">
              {cartData.length} Course(s) in Cart
            </p>
            <div className="py-4 border-t-[1px] border-gray-white flex flex-col md:flex-row md:justify-between">
              {/* left div */}
              <div className="flex flex-col w-full gap-8 md:w-[75%]">
                {cartData.map((eachCourse) => (
                  <div
                    key={eachCourse._id}
                    className="flex flex-col md:flex-row md:justify-between"
                  >
                    {/* left div */}
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="h-32 w-44 rounded-md">
                        <img
                          className="h-full w-full object-cover rounded-md"
                          src={eachCourse.thumbnail}
                          alt="thumbnail"
                        />
                      </div>
                      <div className="flex flex-col gap-2 pr-4">
                        <Link to={`/course/${eachCourse._id}`}>
                          <p className="text-lg font-medium text-light-white">
                            {eachCourse.title}
                          </p>
                        </Link>
                        <p className="text-gray-white">
                          {eachCourse.instructor.firstName}{" "}
                          {eachCourse.instructor.lastName}
                        </p>
                        {eachCourse?.ratingAndReviews?.length === 0 ? (
                          <h2 className="text-gray-white">No Ratings</h2>
                        ) : (
                          <div className="flex gap-2 items-center">
                            <h2 className="text-yellow-500 pt-1">
                              {(
                                eachCourse?.ratingAndReviews?.reduce(
                                  (acc, cv) => acc + cv.rating,
                                  0
                                ) / eachCourse?.ratingAndReviews?.length
                              ).toFixed(1)}
                            </h2>
                            <Rating
                              SVGstyle={{ display: "inline-block" }}
                              size={20}
                              allowFraction
                              readonly
                              initialValue={(
                                eachCourse?.ratingAndReviews.reduce(
                                  (acc, cv) => acc + cv.rating,
                                  0
                                ) / eachCourse?.ratingAndReviews.length
                              ).toFixed(1)}
                            />
                            <p className="text-gray-white pt-1">{`(${
                              eachCourse?.ratingAndReviews.length
                            } ${
                              eachCourse?.ratingAndReviews.length > 1
                                ? "ratings"
                                : "rating"
                            })`}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* right div */}
                    <div className="flex items-center justify-between md:block">
                      <button
                        onClick={() => {
                          removeCourse(eachCourse._id);
                        }}
                        className="px-4 order-2 md:order-1 flex cursor-pointer font-medium mb-2 rounded-md justify-center items-center gap-1 py-2 bg-bg-light-blue text-sky-blue"
                      >
                        <FaRegTrashAlt />
                        <span>Remove</span>
                      </button>
                      <span className="text-lg order-1 md:order-2 font-semibold text-sky-blue">
                        RS. {eachCourse.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {/* right div */}
              <div className="bg-bg-light-blue rounded-md  md:self-start py-4 flex flex-col gap-4 px-4">
                <div>
                  <span className="text-gray-white text-2xl">Total: </span>
                  <span className="text-2xl text-sky-blue font-medium">
                    Rs {cartData.reduce((acc, course) => acc + course.price, 0)}
                  </span>
                </div>
                <button
                  onClick={handleBuy}
                  className="bg-sky-blue cursor-pointer rounded-md text-light-white font-medium px-4 py-2"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full w-full flex justify-center items-center">
            <span className="text-3xl font-semibold text-light-white">
              No Items Added
            </span>
          </div>
        )}
      </div>
    </>
  );
};
export default Cart;
