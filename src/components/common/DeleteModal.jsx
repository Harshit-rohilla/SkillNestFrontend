function DeleteModal({modalVisibility,setModalVisibility,deleteSection,clickOnSection,deleteSubSection}){
    return(
        <>
        <div onClick={()=>{setModalVisibility((prev)=>!prev)}} className={`fixed ${modalVisibility?"flex":"hidden"} left-0 top-0 w-full h-full justify-center items-center backdrop-blur-md z-50`}>
                <div onClick={(e)=>{e.stopPropagation()}} className='py-6 rounded-lg bg-bg-blue px-6 flex flex-col gap-1 border-[1px] border-[rgba(240,240,240,0.2)]'>
                    <h1 className='text-3xl font-semibold text-light-white'>{clickOnSection?"Delete this Section?":"Delete this subsection?"}</h1>
                    <p className='text-gray-white'>{clickOnSection?"All the lectures in this section will be deleted":"The lecture in this subsection will be deleted"}</p>
                    <div className='flex justify-start gap-4 mt-4'>
                        <button onClick={clickOnSection?deleteSection:deleteSubSection} className='px-4 py-2 rounded-md cursor-pointer bg-sky-blue text-light-white font-medium'>Delete</button>
                        <button onClick={()=>{setModalVisibility((prev)=>!prev)}} className='px-4 py-2 cursor-pointer rounded-md bg-gray-white text-black font-medium'>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DeleteModal