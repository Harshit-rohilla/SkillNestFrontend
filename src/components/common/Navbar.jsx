import { NavLink,Link } from "react-router-dom"
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import {  useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useLogout } from "../../custom hook/useLogout";




function Navbar(){
    const dispatch=useDispatch()
    const user=useSelector((store)=>store.auth.userData)
    const catalogData=useSelector((store)=>store.category.allCategories)
    const logout=useLogout()
    const [display,setDisplay]=useState(false)

    return(
        <>
        {/* full width div */}
        <div className="w-full bg-jetblack text-pale border-b-[1px]  border-[#2C333F]">
            {/* navbar width */}
            <div className="w-11/12 max-w-[1260px] mx-auto py-5 flex justify-between items-center">
                {/* logo */}
                <Link to="/"><div className="text-lg font-medium"><span className="text-secondary">Skill</span>Nest</div>
                </Link>
                {/* middle part */}
                <div>
                    <ul className="flex gap-6 justify-center items-center">
                        <NavLink to="/" className={({isActive})=>(isActive?"text-secondary":"hover:text-secondary duration-300")}>Home</NavLink>
                        <div className="relative group">
                            <NavLink className="flex items-center gap-1 duration-300 hover:text-secondary ">Catalog<IoIosArrowUp className="group-hover:rotate-180 duration-300"/></NavLink>
                            {/* triangle part */}
                            {/* <div className="absolute hidden opacity-0 group-hover:opacity-100 duration-300 rotate-45 bg-[#0e131d] h-8 w-8 top-8 left-1/2 z-10 group-hover:block"></div> */}
                            <div className="bg-[#0e131d] opacity-0 group-hover:opacity-100 hidden  text-darkblue duration-300 group-hover:flex flex-col gap-1  items-center w-36 absolute z-20">
                            {catalogData.map((obj,index)=><Link to={`/catalog/${obj.name}`} className="hover:bg-[#1a1f29] text-[#e5e7eb] h-8 duration-200 flex justify-center items-center  text-sm w-full  text-center" key={index}>{obj.name}</Link>)}
                            </div>
                        </div>
                        <NavLink to="/aboutus" className={({isActive})=>(isActive?"text-secondary":"hover:text-secondary duration-300")}>About us</NavLink>
                        <NavLink to="/contactus" className={({isActive})=>(isActive?"text-secondary":"hover:text-secondary duration-300")}>Contact us</NavLink>
                    </ul>
                </div>
                {/* right part */}
                <div className="flex gap-4 justify-center items-center relative">
                    {user?(
                        <>
                        {/* <FiSearch  className="hover:text-secondary duration-300 cursor-pointer" size={20}/> */}
                        {/* show and hide based on user is student or teacher */}
                        {user?.accountType==="student"?<Link to="/dashboard/cart"><PiShoppingCartSimpleBold className="hover:text-secondary duration-300 cursor-pointer" size={20}/></Link>:null}
                        <div onClick={()=>{setDisplay((prev)=>!prev)}} className="flex cursor-pointer items-center">
                            <img  src={user?.userImage} className="rounded-full  h-6 w-6"/>
                            <IoIosArrowDown/>
                        </div>
                        <div onClick={()=>{setDisplay((prev)=>!prev)}} className={`absolute ${display?"flex":"hidden"} top-[150%] right-0 flex-col z-[100] bg-bg-blue border-[1px] border-bg-light-blue`}>
                            <Link to="/dashboard/my-profile" className="py-1.5 px-2 text-sm text-center hover:bg-bg-light-blue text-gray-white">Dashboard</Link>
                            <button onClick={logout} className="py-1.5 px-2 text-sm text-center cursor-pointer hover:bg-bg-light-blue text-gray-white">Logout</button>
                        </div>
                        </>
                    ):(
                        <>
                        <Link to="/login"><button className="px-3 py-1.5 hover:text-secondary hover:border-secondary duration-300 rounded-sm border-[1px] text-sm font-medium cursor-pointer border-darkpale text-darkpale">Log in</button></Link>
                        <Link to="/signup"><button className="px-3 py-1.5 hover:text-secondary hover:border-secondary duration-300 rounded-sm border-[1px] text-sm font-medium cursor-pointer border-darkpale text-darkpale">Sign up</button></Link>
                        </>
                    )}
                    
                    
                </div>

            </div>
            
        </div>
        
        
        </>
    )
}

export default Navbar