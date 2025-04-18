import Form from "../components/common/Form"
import Footer from "../components/common/Footer"
import Navbar from "../components/common/Navbar"
import { IoMdChatbubbles } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { BsGlobeEuropeAfrica } from "react-icons/bs";
import { useSelector } from "react-redux";
import Marquee from "react-fast-marquee";
import { Rating } from "react-simple-star-rating";

function ContactUs(){
    const allRatingAndReview=useSelector((store)=>store.global.ratingAndReview)
    return(
        <>
        <Navbar/>
        <div className="w-full flex flex-col bg-bg-blue py-20">
            {/* section 1 */}
            <div className="w-11/12 max-w-[1260px] flex flex-col md:flex-row md:justify-center gap-16 mx-auto">
                <div className="bg-bg-light-blue md:self-start rounded-lg py-10 pl-10 md:pr-30 flex flex-col gap-10">
                    <div className="flex gap-2 ">
                        <IoMdChatbubbles size={20} className="text-gray-white mt-1"/>
                        <div>
                            <h1 className="font-semibold text-xl text-light-white ">Chat with us</h1>
                            <p className="text-gray-white">Our friendly team is here to help.</p>
                            <p className="text-gray-white">harshitrohilla105@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex gap-2 ">
                        <IoCall size={20} className="text-gray-white mt-1"/>
                        <div>
                            <h1 className="font-semibold text-xl text-light-white ">Visit us</h1>
                            <p className="text-gray-white">Come and say hello at our office HQ.</p>
                            <p className="text-gray-white">Here is the location/ address</p>
                        </div>
                    </div>
                    <div className="flex gap-2 ">
                        <BsGlobeEuropeAfrica size={20} className="text-gray-white mt-1"/>
                        <div>
                            <h1 className="font-semibold text-xl text-light-white ">Call us</h1>
                            <p className="text-gray-white">Mon - Fri From 8am to 5pm</p>
                            <p className="text-gray-white">+123 456 7890</p>
                        </div>
                    </div>
                </div>
                <Form border={true}/>
            </div>
            {/* review panel */}
            <div className="w-11/12 max-w-[1260px] mx-auto">
            <div className="py-20 flex flex-col gap-10">
                    <h1 className="text-3xl text-pale text-center">Reviews from other learners</h1>
                    <Marquee gradientColor="#1d1d2b" gradient speed={80} className="mb-10">
                        <div className="flex gap-6">
                        {allRatingAndReview.map((eachRatingAndReview)=><div key={eachRatingAndReview?._id} className="px-4 py-4 mx-8 flex flex-col justify-between w-[300px] h-52 bg-bg-light-blue">
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
                            <p className="text-sm text-light-white">{eachRatingAndReview?.review.length>120?eachRatingAndReview?.review.slice(0,120)+"...":eachRatingAndReview?.review}</p>
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
        <Footer/>
        </>
    )
}
export default ContactUs