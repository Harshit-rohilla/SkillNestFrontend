import { HiUsers } from "react-icons/hi";
import { FaProjectDiagram } from "react-icons/fa";

function Box({heading,content,color="dark"}){

    return(
        <>
        <div className="relative">
            <div className={`pt-4 relative z-20 flex flex-col gap-2 pb-1 w-80 ${color==="dark"?"bg-[#505052]":"bg-white"}`}>
                <h1 className={`px-4 text-lg font-medium ${color==="dark"?"text-white":"text-black"}`}>{heading}</h1>
                <p className={`px-4 ${color==="dark"?"text-darkblue":"text-lightblue"}`}>{content}</p>
                <div className="flex mt-12 justify-between items-center border-[#c5c7d4] py-2 px-4 border-dashed border-t-[1px]">
                    <div className={`flex items-center gap-2 ${color==="dark"?"text-[rgb(0,0,0)]":"text-[rgb(10,90,114)]"}`}>
                        <HiUsers/>
                        <p>Beginner</p>
                    </div>
                    <div className={`flex items-center gap-2 ${color==="dark"?"text-[rgb(0,0,0)]":"text-[rgb(10,90,114)]"}`}>
                        <FaProjectDiagram/>
                        <p className="">6 Lessons</p>
                    </div>
                </div>
            </div>
            <div className={color!=="dark"?"h-full w-full bg-[rgb(255,214,10)] absolute top-2.5 left-2.5 z-10":""}></div>
        </div>
        
        </>
    )
}
export default Box