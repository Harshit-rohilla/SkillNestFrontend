import FooterBox from "./FooterBox"
import {FooterLink2} from "../../data/footer-links"
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer(){
    return(
        <>
        <div className="w-full bg-[rgb(22,29,41)]">
            <div className="md:w-[1260px] mx-auto  ">
                {/* first section */}
                <div className="w-full gap-8 md:gap-0 flex flex-col md:flex-row py-10 border-b-[1px]  border-[#2C333F]">
                    {/* left part of first section*/}
                    <div className="md:w-1/2 flex justify-evenly">
                        {/* first div */}
                        <div className="flex flex-col gap-4 text-[#6E727F] text-xs">
                            {/* second div */}
                            <div className="flex flex-col gap-2">
                                <h1 className="text-lg text-[#AFB2BF] font-medium">Company</h1>
                                <p className="hover:text-[#AFB2BF] cursor-pointer">About</p>
                                <p className="hover:text-[#AFB2BF] cursor-pointer">Careers</p>
                                <p className="hover:text-[#AFB2BF] cursor-pointer">Affiliates</p>
                            </div>
                            {/* third div */}
                            <div className="flex text-lg gap-2">
                                <Link><FaYoutube className="hover:text-[#AFB2BF] cursor-pointer"/></Link>
                                <Link><FaFacebook className="hover:text-[#AFB2BF] cursor-pointer"/></Link>
                                <Link><FaTwitter className="hover:text-[#AFB2BF] cursor-pointer"/></Link>
                                <Link><FaGoogle className="hover:text-[#AFB2BF] cursor-pointer"/></Link>
                            </div>
                        </div>
                        {/* second div */}
                        <div className="flex flex-col gap-4 text-[#6E727F] text-xs">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-lg text-[#AFB2BF] font-medium">Resources</h1>
                                <p className="hover:text-[#AFB2BF] cursor-pointer">Articles</p>
                                <p className="hover:text-[#AFB2BF] cursor-pointer">Blog</p>
                                <p className="hover:text-[#AFB2BF] cursor-pointer">Chart Sheet</p>
                                <p className="hover:text-[#AFB2BF] cursor-pointer">Code challenges</p>
                                <p className="hover:text-[#AFB2BF] cursor-pointer">Docs</p>
                                <p className="hover:text-[#AFB2BF] cursor-pointer">Projects</p>
                                <p className="hover:text-[#AFB2BF] cursor-pointer">Videos</p>
                                <p className="hover:text-[#AFB2BF] cursor-pointer">Workspaces</p>
                            </div>
                            <div className="flex flex-col gap-2 font-medium">
                                <h1 className="text-lg text-[#AFB2BF] cursor-pointer">Support</h1>
                                <p className="hover:text-[#AFB2BF] cursor-pointer">Help Center</p>
                            </div>
                        </div>
                        {/* third div */}
                        <div className="flex flex-col gap-4 text-[#6E727F] text-xs">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-lg text-[#AFB2BF] cursor-pointer font-medium">Plans</h1>
                                <p className="hover:text-[#AFB2BF] cursor-pointer">Paid membership</p>
                                <p className="hover:text-[#AFB2BF] cursor-pointer">For Students</p>
                                <p className="hover:text-[#AFB2BF] cursor-pointer">Business solutions</p>
                            </div>
                            <div className="flex flex-col gap-2 font-medium">
                                <h1 className="text-lg text-[#AFB2BF] cursor-pointer">Community</h1>
                                <p className="hover:text-[#AFB2BF] cursor-pointer">Forums</p>
                                <p className="hover:text-[#AFB2BF] cursor-pointer">Chapters</p>
                                <p className="hover:text-[#AFB2BF] cursor-pointer">Events</p>
                            </div>
                        </div>
                        
                    </div>
                    {/* right part of first section*/}
                    <div className="md:w-1/2 flex justify-evenly md:border-l-[1px] md:border-[#2C333F]">
                        {FooterLink2.map((obj,index)=>(<FooterBox key={index} obj={obj}/>))}
                    </div>
                </div>
                {/* second section */}
                <div className="flex flex-col md:flex-row py-5 items-center gap-2 md:gap-0 md:justify-between">
                     <div className="flex text-xs text-[#6E727F] gap-2">
                        <p className="border-r-[1px] px-2 font-semibold border-[#2C333F]">Privacy Policy</p>
                        <p className="border-r-[1px] px-2 font-semibold border-[#2C333F]">Cookie Policy</p>
                        <p className="font-semibold">Terms</p>
                     </div>
                     <div className="text-xs font-medium text-[#6E727F]">Made with ♥ by Harshit © 2025 SkillNest</div>       
                </div>
            </div>
        </div>
        </>
    )
}
export default Footer