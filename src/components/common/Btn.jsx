import { FaArrowRight } from "react-icons/fa6";

function Btn({ text, color = "light",arrow="no" }) {
  return (
    <>
      <button
        className={
          color === "dark"
            ? "py-2 px-4 flex gap-2 justify-center items-center cursor-pointer font-medium rounded-lg bg-black text-pale hover:scale-95 transition-transform duration-300"
            : "py-2 px-4 flex gap-2 justify-center items-center cursor-pointer font-medium rounded-lg bg-orange-500 text-black hover:scale-95 transition-transform duration-300"
        }
      >
        {text}{arrow==="yes"?<FaArrowRight/>:null}
      </button>
    </>
  );
}

export default Btn;
