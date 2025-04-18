import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoIosVideocam } from "react-icons/io";


const CourseDetailDropdown=({section})=>{
    return(
        <>
        <div className="w-full border-[1px] border-[rgba(240,240,240,0.2)]">
            {section?.map((eachSection)=><details key={eachSection?._id} open className=" group">
                <summary className="flex justify-between py-2 bg-bg-light-blue px-4">
                    <div className="flex items-center gap-1">
                        <MdOutlineKeyboardArrowDown className="group-open:rotate-180 duration-300"/>
                        <span>{eachSection?.title}</span>
                    </div>
                    <div>
                        {eachSection?.subSection?.length} lecture(s)
                    </div>
                </summary>
                {eachSection?.subSection.map((eachSubSection)=><div key={eachSubSection?._id} className="px-4 py-2 flex gap-1 items-center text-sm">
                    <IoIosVideocam/><span>{eachSubSection.title}</span>
                </div>)}
            </details>)}
        </div>
        </>
    )
}
export default CourseDetailDropdown