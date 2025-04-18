import React, { useState } from 'react'
import Navbar from '../components/common/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import {sidebarLinks} from "../data/dashboard-links"
import SidebarBox from '../components/sidebar/SidebarBox'
import { VscAccount } from "react-icons/vsc";
import { NavLink } from 'react-router-dom'
import { CiSettings } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import { useSelector } from 'react-redux'
import { useLogout } from '../custom hook/useLogout'


export default function Dashboard({user}) {
    const [display, setDisplay]=useState(false)
    const userType=useSelector((store)=>store.auth?.userData?.accountType)
    const logout=useLogout()
  return (
    <>
        <div className='w-full min-h-screen flex flex-col relative'>
            <Navbar/>
            <div className='flex-1 flex'>
                <aside className='min-w-60 pt-6 bg-bg-light-blue'>
                    <NavLink className={({isActive})=>`${isActive?"py-2 pl-4 font-medium w-full flex duration-200 bg-[#073E5A] border-l-[3px]  text-sky-blue gap-2 items-center":"py-2 pl-4 duration-200 w-full text-gray-white flex border-l-[3px] border-bg-light-blue font-medium gap-2 items-center"}`} to="/dashboard/my-profile"><VscAccount/>My Profile</NavLink>

                    {sidebarLinks.map((obj)=>(obj.type===userType?<SidebarBox key={obj.id} obj={obj}/>:null))}

                    <div className='h-[1px] bg-gray-500 w-[90%] mx-auto my-4 rounded-lg'></div>

                    <NavLink className={({isActive})=>`${isActive?"py-2 pl-4 font-medium w-full flex duration-200 bg-[#073E5A] border-l-[3px]  text-sky-blue gap-2 items-center":"py-2 pl-4 duration-200 w-full text-gray-white flex border-l-[3px] border-bg-light-blue font-medium gap-2 items-center"}`} to="/dashboard/setting"><CiSettings size={20}/>Setting</NavLink>

                    <button onClick={()=>{setDisplay((prev)=>!prev)}} className="py-2 pl-4 duration-200 w-full cursor-pointer text-gray-white flex border-l-[3px] border-bg-light-blue font-medium gap-2 items-center"><IoLogOutOutline size={20}/>Log Out</button>
                </aside>
                <Outlet/>
            </div>
            {/* logout Modal */}
            <div onClick={()=>{setDisplay((prev)=>!prev)}} className={`fixed ${display?"flex":"hidden"} left-0 top-0 w-full h-full justify-center items-center backdrop-blur-md z-50`}>
                <div onClick={(e)=>{e.stopPropagation()}} className='py-6 rounded-lg bg-bg-blue px-6 flex flex-col gap-1 border-[1px] border-[rgba(240,240,240,0.2)]'>
                    <h1 className='text-3xl font-semibold text-light-white'>Are you sure?</h1>
                    <p className='text-gray-white'>You will be logged out of your account</p>
                    <div className='flex justify-start gap-4 mt-4'>
                        <button onClick={logout} className='px-4 py-2 rounded-md cursor-pointer bg-sky-blue text-light-white font-medium'>Logout</button>
                        <button onClick={()=>{setDisplay((prev)=>!prev)}} className='px-4 py-2 cursor-pointer rounded-md bg-gray-white text-black font-medium'>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
