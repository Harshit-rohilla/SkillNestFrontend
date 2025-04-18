import Navbar from "../components/common/Navbar"
import { NavLink, Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa6";
import Btn from "../components/common/Btn";
import banner from "../assets/Images/banner.mp4"
import {TypeAnimation} from "react-type-animation"
import Box from "../components/home/Box";
import bghome from "../assets/Images/bghome.svg"
import timeline from "../assets/Images/TimelineImage.png"
import logo1 from "../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../assets/TimeLineLogo/Logo4.svg"
import plan from "../assets/Images/Plan_your_lessons.svg"
import know from "../assets/Images/Know_your_progress.svg"
import compare from "../assets/Images/Compare_with_others.svg"
import instructor from "../assets/Images/Instructor.png"
import Footer from "../components/common/Footer"
import { useSelector } from "react-redux";
import Marquee from "react-fast-marquee";
import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router-dom";


function Home(){
    const allRatingAndReview=useSelector((store)=>store.global.ratingAndReview)
    const user=useSelector((store)=>store.auth.userData)
    const navigate=useNavigate()
    return(
        <>
        <Navbar/>
        {/* black background part-1 */}
        <div className="w-full bg-jetblack text-pale">
            <div className="md:w-[1260px] flex flex-col justify-center items-center mx-auto">
                {/* first section */}
                <div className="w-full mt-16 gap-6 flex flex-col items-center justify-center">
                    <button onClick={()=>{user?navigate("/dashboard/my-profile"):navigate("/signup")}} className="rounded-3xl drop-shadow-xl hover:scale-95 transition-transform duration-300 px-4 py-2 flex justify-center items-center gap-2 bg-black"><p>Become an Instructor</p><FaArrowRight/></button>
                    <p className="text-3xl">Empower Your Future with<span className="text-[#D0894F]"> Coding Skills</span></p>
                    <p className="w-2/3 text-center text-darkpale">With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a
                    wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.</p>
                    <div className="flex gap-4"><NavLink><Btn text="Learn More"/></NavLink><NavLink><Btn text="Book a Demo" color="dark"/></NavLink></div>
                </div>
                {/* video section */}
                <div className="w-4/5 h-[515px] relative shadow-[2px_-2px_30px_rgba(220,255,255,0.3)]  mt-16 ">
                    <div className="absolute top-5 left-5 h-full w-full bg-white"></div>
                    <video src={banner} autoPlay muted loop className="object-cover absolute  h-full w-full"></video>
                </div>
                {/* second section */}
                <div className="flex relative justify-center gap-14 w-full mt-10 items-center py-16">
                    <div className="py-4 px-2 w-[37%] flex flex-col gap-4">
                        <h1 className="text-3xl">Unlock your <span className="text-[#D0894F]">coding potential </span>
                        with our online courses.</h1>
                        <p className="text-darkpale">Our courses are designed and taught by industry experts who
                            have years of experience in coding and are passionate about
                            sharing their knowledge with you.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <Btn text="Try it Yourself" arrow="yes"/>
                            <Btn text="Learn More" color="dark"/>
                        </div>
                    </div>
                    <div className="border border-[rgba(255,255,255,0.4)] py-4 px-2 w-[37%] flex justify-items-start gap-2 bg-[rgba(100,100,100,0.3)] backdrop-blur-sm ">
                    <div className="">
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                        <p>7</p>
                        <p>8</p>
                        <p>9</p>
                    </div>
                    <TypeAnimation className="w-[90%]"
                        sequence={[
                            `<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<linkrel="stylesheethref="styles.css"></head>\n<body>\n<h1><ahref="/">Header</a></h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a></nav>\n</body>`, 
                            1500,  // Pause for 1.5 seconds after typing
                            '',    // Erase everything
                            500,   // Pause for 0.5 seconds before restarting
                        ]}
                        speed={50} // Typing speed (milliseconds per character)
                        wrapper="pre" // Ensures formatting is preserved
                        repeat={Infinity} // Infinite loop
                        />
                    </div>
                </div>
                {/* third section */}
                <div className="flex relative justify-center gap-14 w-full mt-10 items-center py-16">
                    <div className="border border-[rgba(255,255,255,0.4)] py-4 px-2 w-[37%] flex justify-items-start gap-2 bg-[rgba(100,100,100,0.3)] backdrop-blur-sm ">
                    <div className="">
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                        <p>7</p>
                        <p>8</p>
                        <p>9</p>
                    </div>
                    <TypeAnimation className="w-[90%]"
                        sequence={[
                            `<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<linkrel="stylesheethref="styles.css"></head>\n<body>\n<h1><ahref="/">Header</a></h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a></nav>\n</body>`, 
                            1500,  // Pause for 1.5 seconds after typing
                            '',    // Erase everything
                            500,   // Pause for 0.5 seconds before restarting
                        ]}
                        speed={50} // Typing speed (milliseconds per character)
                        wrapper="pre" // Ensures formatting is preserved
                        repeat={Infinity} // Infinite loop
                        deletionSpeed={100}
                        />
                    </div>
                    <div className="py-4 px-2 w-[37%] flex flex-col gap-4">
                        <div>
                            <h1 className="text-3xl">Start<span className="text-[#D0894F]"> coding</span></h1>
                            <h1 className="text-[#D0894F] text-3xl">in seconds</h1>
                        </div>
                        <p className="text-darkpale">Our courses are designed and taught by industry experts who
                            have years of experience in coding and are passionate about
                            sharing their knowledge with you.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <Btn text="Continue Lesson" arrow="yes"/>
                            <Btn text="Learn More" color="dark"/>
                        </div>
                    </div>
                </div>
                {/* fourth section */}

            </div>
            <div className="w-full bg-jetblack text-pale">
                <div className="md:w-[1260px] flex pt-24 mt-5 gap-2  flex-col justify-center items-center mx-auto">
                    <h1 className="text-3xl font-medium">Unlock the <span className="text-secondary ">Power of Code</span></h1>
                    <p className="text-darkpale ">Learn to Build Anything You Can Imagine</p>
                    <div className="flex justify-center items-center gap-8 translate-y-[30%]">
                        <Box heading="Learn HTML" content="This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more." color="light"/>
                        <Box heading="Learn CSS" content="This course explores advanced topics in HTML5 and CSS3, including animations, transitions, and layout techniques"/>
                        <Box heading="Responsive Web design" content="This course teaches responsive web design techniques, allowing web pages to adapt to different devices and screen sizes"/>
                    </div>
                    
                </div>
                <div className="w-full flex justify-center items-center py-28 gap-4 bg-gray-100" style={{backgroundImage:`url(${bghome})`}}>
                    <Btn text="Explore Full Catalog" arrow="yes"/>
                    <Btn text="Learn More" color="dark"/>
                </div>            
            </div>
        </div>
        {/* white background part 1*/}
        <div className="w-full bg-[rgb(240,240,240)] text-darkblue">
            <div className="w-[1260px] pt-16 flex flex-col justify-center items-center mx-auto">
                {/* section 1 */}
                <div className="flex">
                    <div className="text-3xl w-1/2  pl-20 pr-16 py-8 font-medium">Get the skills you need for a <span className="text-secondary">job that is in demand</span></div>
                    <div className="text-lightblue w-1/2 py-8 flex flex-col gap-6">
                        <p className="pr-14">The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                        <div><Btn text="Learn More"/></div>
                    </div>
                </div>
                {/* section 2 */}
                <div className="w-full flex">
                    {/* left part of section 2 */}
                    <div className="w-[40%]  flex flex-col pl-20 gap-14 pt-5">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full  h-10 w-10 bg-white flex items-center justify-center">
                                <img src={logo1} alt="" />
                            </div>
                            <div>
                                <p className="text-darkblue font-semibold">Leadership</p>
                                <p className="text-lightblue text-xs">Fully committed to the success company</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="rounded-full  h-10 w-10 bg-white flex items-center justify-center">
                                <img src={logo2} alt="" />
                            </div>
                            <div>
                                <p className="text-darkblue font-semibold">Leadership</p>
                                <p className="text-lightblue text-xs">Fully committed to the success company</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="rounded-full  h-10 w-10 bg-white flex items-center justify-center">
                                <img src={logo3} alt="" />
                            </div>
                            <div>
                                <p className="text-darkblue font-semibold">Leadership</p>
                                <p className="text-lightblue text-xs">Fully committed to the success company</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="rounded-full  h-10 w-10 bg-white flex items-center justify-center">
                                <img src={logo4} alt="" />
                            </div>
                            <div>
                                <p className="text-darkblue font-semibold">Leadership</p>
                                <p className="text-lightblue text-xs">Fully committed to the success company</p>
                            </div>
                        </div>
                    </div>
                    {/* right part of section 2 */}
                    <div className="w-[60%] ">
                        <div className="w-[80%] h-[85%] ">
                            <img src={timeline} alt="img" loading="lazy" className="w-full shadow-[15px_15px_0px_white] h-full object-cover"/>
                            <div className="w-[60%] mx-auto -translate-y-1/2 flex justify-evenly gap-4 items-center py-8 px-4 bg-[rgb(1,74,50)]">
                                <div className="flex  gap-2 justify-center items-center">
                                    <div className="text-3xl text-white">10 </div>
                                    <div>
                                        <div className="text-xs text-[rgb(5,167,123)]">YEARS</div>
                                        <div className="text-xs text-[rgb(5,167,123)]">EXPERIENCE</div>
                                    </div>
                                </div>
                                <div className="w-0.5 h-6 rounded-4xl bg-[rgba(240,240,240,0.7)]"></div>
                                <div className="flex gap-2 justify-center items-center">
                                    <div className="text-3xl text-white">250 </div>
                                    <div>
                                        <div className="text-xs text-[rgb(5,167,123)]">TYPES OF</div>
                                        <div className="text-xs text-[rgb(5,167,123)]">COURSES</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                {/* section 3 */}
                <div className="w-full flex justify-center items-center flex-col py-24 gap-3">
                    <h1 className="text-3xl w-1/2 text-center font-medium">Your swiss knife for <span className="text-secondary">learning any language</span></h1>
                    <p className="text-lightblue w-1/2 text-center ">Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
                    {/* images part */}
                    <div className="flex  mt-7">
                        <div className="w-[330px] h-auto relative z-10  translate-x-[25%]">
                            <img className="w-full h-full" src={know} loading="lazy" alt="img1" />
                        </div>
                        <div className="w-[380px] h-auto relative z-20 ">
                            <img className="w-full h-full" src={compare} loading="lazy" alt="img2"/>
                        </div>
                        <div className="w-[380px] relative z-30 h-auto  -translate-x-[30%]">
                            <img className="w-full h-full" src={plan} loading="lazy" alt="img3" />
                        </div>
                    </div>
                    <div>
                        <Btn text="Learn More"/>
                    </div>
                </div>
            
            </div>          
        </div>
        {/* black background part 2 */}
        <div className="w-full bg-jetblack">
            <div className="w-11/12 max-w-[1260px] py-24 mx-auto">
                <div className="w-full flex flex-col md:flex-row md:justify-center gap-24">
                    <div className="md:w-1/2 flex justify-end">
                        <div className="w-full md:w-[500px] relative">
                            <img className="object-cover relative z-20 w-full h-auto" src={instructor} loading="lazy" alt="instructor image " />
                            <div className="h-full w-full absolute z-10 bg-white -left-4 -top-4"></div>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex flex-col justify-center gap-4 pr-16">
                        <div className="text-3xl">
                            <p className="text-pale">Become an</p>
                            <p className="text-secondary">instructor</p>
                        </div>
                        <p className="text-base text-darkpale ">Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                        <div onClick={()=>{user?navigate("/dashboard/my-profile"):navigate("/signup")}} className="mt-4"><Btn text="Start Teaching Today" arrow="yes"/></div>
                    </div>
                </div>
                <div className="py-20 flex flex-col gap-10">
                    <h1 className="text-3xl text-pale text-center">Reviews from other learners</h1>
                    <Marquee speed={80} className="mb-10">
                        <div className="flex gap-6">
                        {allRatingAndReview.map((eachRatingAndReview)=><div key={eachRatingAndReview?._id} className="px-4 py-4 mx-8 flex flex-col justify-between w-80 h-52 bg-[#353535]">
                            <div>
                            <div className="flex gap-2 items-center mb-2">
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                                <img className="w-full h-full object-cover" src={eachRatingAndReview.user.userImage} alt="userImage" />
                            </div>
                            <div>
                                <p className="text-light-white">{eachRatingAndReview.user.firstName}{" "}{eachRatingAndReview.user.lastName}</p>
                                <p className="text-sm text-gray-white">{eachRatingAndReview.user.email}</p>
                            </div>
                            </div>
                            <p className="text-sm text-light-white">{eachRatingAndReview?.review.length>150?eachRatingAndReview?.review.slice(0,150)+"...":eachRatingAndReview?.review}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                            <h1 className="text-yellow-500 pt-1">{eachRatingAndReview?.rating}</h1>
                            <Rating SVGstyle={{ display: "inline-block" }} size={20} allowFraction readonly initialValue={eachRatingAndReview?.rating}/>
                            </div>
                        </div>)}
                        </div>
                    </Marquee>
                </div>
                
            </div>
        </div>
        {/* footer */}
        <Footer/>
        </>
    )
}
export default Home