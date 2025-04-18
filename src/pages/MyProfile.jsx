import { BiEdit } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function MyProfile(){
  const user=useSelector((store)=>store.auth.userData)
  return(
    <>
    <div className="flex-1 bg-bg-blue">
      {/* main div */}
      <div className="w-11/12 max-w-[900px] mx-auto h-full flex flex-col pt-6 gap-6">
      {/* heading */}
        <h1 className="text-3xl text-light-white font-semibold">My Profile</h1>
        {/* first div */}
        <div className="bg-bg-light-blue rounded-md flex py-6 px-8 items-center justify-between">
          <div className="flex gap-4 items-center">
            <img src={user?`${user.userImage}`:null} alt="" className="w-14 h-14 rounded-full object-cover"/>
            <div>
              <p className="text-light-white font-medium text-lg">{user?`${user.firstName} ${user.lastName}`:"-"}</p>
              <p className="text-gray-white text-sm">{user?`${user.email}`:"-"}</p>
            </div>
          </div>
          <Link className="px-4 py-2 bg-sky-blue text-light-white font-semibold flex justify-center items-center gap-1 rounded-md" to="/dashboard/setting"><span>Edit</span><BiEdit/></Link>
        </div>
        {/* second or about div */}
        <div className="bg-bg-light-blue rounded-md flex py-6 px-8 items-center justify-between">
          <div>
            <h1 className="text-light-white font-medium text-lg">About</h1>
            <p className="text-gray-white text-sm">{(user?.profile?.about)?`${user.profile.about}`:"-"}</p>
          </div>
          <Link className="px-4 py-2 bg-sky-blue text-light-white font-semibold flex justify-center items-center gap-1 rounded-md" to="/dashboard/setting"><span>Edit</span><BiEdit/></Link>
        </div>
        {/* third div */}
        <div className="bg-bg-light-blue rounded-md flex flex-col py-6 px-8 ">
          {/* heading div */}
          <div className="flex items-center justify-between">
            <h1 className="text-light-white font-medium text-lg">Personal Details</h1>
            <Link className="px-4 py-2 bg-sky-blue text-light-white font-semibold flex justify-center items-center gap-1 rounded-md" to="/dashboard/setting"><span>Edit</span><BiEdit/></Link>
          </div>
          {/* last div */}
          <div className="flex gap-14">
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-light-white">First Name</h1>
                <p className="text-sm text-gray-white">{user?`${user.firstName}`:"-"}</p>
              </div>
              <div>
                <h1 className="text-light-white">Email</h1>
                <p className="text-sm text-gray-white">{user?`${user.email}`:"-"}</p>
              </div>
              <div>
                <h1 className="text-light-white">Gender</h1>
                <p className="text-sm text-gray-white">{(user?.profile?.gender)?`${user.profile.gender}`:"-"}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-light-white">Last Name</h1>
                <p className="text-sm text-gray-white">{user?`${user.lastName}`:"-"}</p>
              </div>
              <div>
                <h1 className="text-light-white">Phone Number</h1>
                <p className="text-sm text-gray-white">{user?`${user.contactNumber}`:"-"}</p>
              </div>
              <div>
                <h1 className="text-light-white">Date of Birth</h1>
                <p className="text-sm text-gray-white">{(user?.profile?.dob)?`${new Date(user.profile.dob).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })}`:"-"}</p>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
    </>
  )
}
export default MyProfile