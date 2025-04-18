const Instruction=()=>{
    return(
        <>
        <div className="py-8  bg-bg-light-blue flex flex-col gap-4 px-6 self-start rounded-md max-w-[420px]">
            <h1 className="text-light-white text-xl font-medium ">
              Course Upload Tips
            </h1>
            <div>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li className="text-gray-white">
                  <span>Set the Course Price option or make it free.</span>
                </li>
                <li className="text-gray-white">
                  <span>
                    Standard size for the course thumbnail is 1024x576.
                  </span>
                </li>
                <li className="text-gray-white">
                  <span>Video section controls the course overview video.</span>
                </li>
                <li className="text-gray-white">
                  <span>
                    Course Builder is where you create & organize a course.
                  </span>
                </li>
                <li className="text-gray-white">
                  <span>
                    Add Topics in the Course Builder section to create lessons,
                    quizzes, and assignments.
                  </span>
                </li>
                <li className="text-gray-white">
                  <span>
                    Information from the Additional Data section shows up on the
                    course single page.
                  </span>
                </li>
                <li className="text-gray-white">
                  <span>Make Announcements to notify any important</span>
                </li>
                <li className="text-gray-white">
                  <span>Notes to all enrolled students at once.</span>
                </li>
              </ul>
            </div>
          </div>
        </>
    )
}

export default Instruction