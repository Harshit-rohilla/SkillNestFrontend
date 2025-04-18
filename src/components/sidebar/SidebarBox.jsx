import React from 'react'
import { NavLink } from 'react-router-dom'
import * as Icons from "react-icons/vsc";


export default function SidebarBox({obj}) {
    const ShowIcon=Icons[obj.icon]
  return (
    <>
        <NavLink className={({isActive})=>`${isActive?"py-2 pl-4 font-medium duration-200 w-full flex bg-[#073E5A] border-l-[3px] text-sky-blue gap-2 items-center":"py-2 pl-4 font-medium text-gray-white w-full duration-200 border-l-[3px] border-bg-light-blue flex gap-2 items-center"}`} to={obj.path}><ShowIcon/>{obj.name}</NavLink>
    </>
  )
}
