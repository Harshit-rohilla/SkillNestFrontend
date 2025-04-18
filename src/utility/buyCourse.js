import toast from "react-hot-toast";
import { apiConnector } from "../api/apiConnector";
import { paymentUrl } from "../api/paymentApi";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export const buyCourse = async (courses, userDetails, navigate) => {
  const toastId = toast.loading("loading...");
  try {
    const scriptRes = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!scriptRes) {
      toast.error("script failed to load");
    }
    const orderRes = await apiConnector("post", paymentUrl.createOrder, {
      courses,
    });
    // //console.log("orderRes is", orderRes);
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: orderRes.data.data.amount,
      currency: "INR",
      name: "EdTech",
      description: "Buy these course",
      order_id: orderRes.data.data.id,
      prefill: {
        name: userDetails.firstName,
        email: userDetails.email,
      },

      handler: function (response) {
        sendPaymentSuccessMail(
          response["razorpay_payment_id"],
          orderRes.data.data.id,
          orderRes.data.data.amount / 100
        );
        verifyPayment(response, courses, navigate);
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("payment failed");
      //console.log(error);
    });
    toast.dismiss(toastId);
  } catch (error) {
    toast.error(error?.response?.data?.message || "An error occurred", {
      id: toastId,
    });
  }
};
async function sendPaymentSuccessMail(paymentId, orderId, amount) {
  try {
    const res = await apiConnector("post", paymentUrl.paymentMail, {
      paymentId,
      orderId,
      amount,
    });
    // toast.success("payment mail send")
  } catch (error) {
    //console.log(error);
  }
}

async function verifyPayment(response, courses, navigate) {
  const toastId = toast.loading("verifying payment...");
  try {
    //console.log("data we are sending", { ...response, courses });
    const res = await apiConnector("post", paymentUrl.verifySignature, {
      ...response,
      courses,
    });
    if (res.data.success) {
      toast.success("payment verified", { id: toastId });
      navigate("/dashboard/enrolled-courses");
    }
  } catch (error) {
    //console.log(error);
    toast.error(
      error?.response?.data?.message || "payment verification failed"
    );
  }
}
