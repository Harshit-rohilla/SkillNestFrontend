import React from "react";
import Step1 from "../components/add_course/Step1";
import Instruction from "../components/add_course/Instruction";
import { useSelector } from "react-redux";
import Step2 from "../components/add_course/Step2"
import Step3 from "../components/add_course/Step3"
import { IoCheckmarkSharp } from "react-icons/io5";


export default function AddCoursePage() {
    const currentStep=useSelector((store)=>store.addCourse.step)
    const allStep=[{id:1,title:"Course Information"},{id:2,title:"Course Builder"},{id:3,title:"Publish"}]
  return (
    <>
      <div className="flex-1 bg-bg-blue">
        {/* mail container */}
        <div className="min-h-full w-11/12 max-w-[1260px] flex justify-center gap-8 pt-6 mx-auto">
        {/* step container */}
        <div>
          <div className="flex justify-between mb-6">
          {allStep.map((obj,index)=><div key={index} className="flex w-40 flex-col gap-1 items-center"><div className={`rounded-full flex justify-center items-center h-8 w-8 ${currentStep===obj.id?"bg-sky-blue text-light-white":"bg-bg-light-blue text-gray-white"}`}>{currentStep>obj.id?<IoCheckmarkSharp/>:obj.id}</div><div className={`${currentStep===obj.id?"text-sky-blue text-sm":"text-gray-white text-sm"}`}>{obj.title}</div></div>)}
          </div>
          {currentStep===1?<Step1/>:currentStep===2?<Step2/>:<Step3/>}
        </div>
        <Instruction/>
        </div>
      </div>
      
    </>
  );
}
