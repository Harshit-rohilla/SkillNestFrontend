import { useForm } from "react-hook-form";
import { userUrl } from "../../api/userApi";
import { apiConnector } from "../../api/apiConnector";
import toast from "react-hot-toast";
import { changeUserData } from "../../redux/slices/authSlice";

function Form({ border }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  async function afterSubmit(data) {
    const toastId = toast.loading("Submitting data...");
    try {
      const res = await apiConnector("post", userUrl.sendMessage, data);
      reset();
      toast.success("message received", { id: toastId });
    } catch (error) {
      //console.log(error?.response?.data?.message)
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
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(afterSubmit)}
        className={`rounded-lg flex flex-col w-full md:max-w-[500px] ${
          border
            ? "border border-[rgba(230,230,230,0.5)] px-10 py-10 md:py-20"
            : "py-10 md:py-0 px-10"
        }`}
      >
        {/* first and last name fields */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col">
            <label
              className="text-[rgb(240,240,240)] text-sm mb-1"
              htmlFor="firstName"
            >
              First Name<sup className="text-red-700">*</sup>
            </label>
            <input
              {...register("firstName")}
              className="placeholder:text-gray-white bg-bg-light-blue px-2 py-2 rounded-md focus:outline-none text-gray-white mb-4"
              type="text"
              id="firstName"
              placeholder="Enter first name"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-[rgb(240,240,240)] text-sm mb-1"
              htmlFor="lastName"
            >
              Last Name<sup className="text-red-700">*</sup>
            </label>
            <input
              {...register("lastName")}
              className="placeholder:text-gray-white bg-bg-light-blue px-2 py-2 rounded-md focus:outline-none text-gray-white mb-4"
              type="text"
              id="lastName"
              placeholder="Enter last name"
              required
            />
          </div>
        </div>
        {/* email field */}
        <div className="flex flex-col">
          <label
            className="text-[rgb(240,240,240)] text-sm mb-1"
            htmlFor="email"
          >
            Email Address<sup className="text-red-700">*</sup>
          </label>
          <input
            {...register("email")}
            className="placeholder:text-gray-white bg-bg-light-blue px-2 py-2 rounded-md focus:outline-none text-gray-white mb-4"
            type="email"
            id="email"
            placeholder="Enter email address"
            required
          />
        </div>
        {/* text area */}
        <div>
          <label
            className="text-[rgb(240,240,240)] text-sm mb-1"
            htmlFor="message"
          >
            Message<sup className="text-red-700">*</sup>
          </label>
          <textarea
            {...register("message")}
            className="w-full h-30 placeholder:text-gray-white bg-bg-light-blue px-2 py-2 rounded-md focus:outline-none text-gray-white"
            placeholder="Share your thoughts here... We're listening!"
            required
            id="message"
          ></textarea>
        </div>
        <button className="bg-sky-blue text-light-white cursor-pointer text-center py-2 w-full rounded-md mt-4">
          Send Message
        </button>
      </form>
    </>
  );
}
export default Form;
