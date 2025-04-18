import Navbar from "../components/common/Navbar";
import aboutus1 from "../assets/Images/aboutus1.webp";
import aboutus2 from "../assets/Images/aboutus2.webp";
import aboutus3 from "../assets/Images/aboutus3.webp";
import founding from "../assets/Images/FoundingStory.png";
import Form from "../components/common/Form";
import Footer from "../components/common/Footer";
import Marquee from "react-fast-marquee";
import { Rating } from "react-simple-star-rating";
import { useSelector } from "react-redux";

const AboutUs = () => {
  const allRatingAndReview=useSelector((store)=>store.global.ratingAndReview)
  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col">
        {/* first section light 1 */}
        <section className="w-full bg-bg-light-blue">
          <div className="w-11/12 max-w-[1260px] mx-auto flex flex-col pt-8 gap-2">
            <p className="text-3xl text-light-white text-center w-full mx-auto md:max-w-[700px] mb-2 font-medium">
              Driving Innovation in Online Education for a{" "}
              <span className="text-sky-blue">Brighter Future</span>
            </p>
            <p className="text-gray-white leading-relaxed text-center mx-auto  max-w-[800px]">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
            <div className="flex  translate-y-[20%]  gap-8 justify-center">
              <div className="w-[25%] ">
                <img
                  className="object-cover w-full h-auto"
                  src={aboutus1}
                  alt="img1"
                />
              </div>
              <div className="w-[25%] ">
                <img
                  className="object-cover w-full h-auto"
                  src={aboutus2}
                  alt="img2"
                />
              </div>
              <div className="w-[25%] ">
                <img
                  className="object-cover w-full h-auto"
                  src={aboutus3}
                  alt="img3"
                />
              </div>
            </div>
          </div>
        </section>
        {/* second section dark 1 */}
        <section className="w-full bg-bg-blue border-b-[1px] border-[rgb(240,240,240,0.2)]">
          <div className="w-11/12 max-w-[1260px] mx-auto flex flex-col pt-30 pb-20">
            <p className="text-2xl md:text-3xl text-light-white w-full md:max-w-[80%] font-medium text-center mx-auto">
              We are passionate about revolutionizing the way we learn. Our
              innovative platform{" "}
              <span className="text-sky-blue break-words">
                combines technology, expertise, and community
              </span>{" "}
              to create an{" "}
              <span className="text-sky-blue break-words">
                unparalleled educational experience.
              </span>
            </p>
          </div>
        </section>
        {/* third section dark 2 */}
        <section className="w-full bg-bg-blue py-20">
          <div className="w-11/12 max-w-[1260px] mx-auto flex flex-col gap-10 md:gap-20">
            {/* subSection 1 */}
            <div className="md:flex">
              <div className="w-full md:w-1/2 md:flex md:justify-end ">
                <div className="flex w-full leading-relaxed md:max-w-[93%] flex-col gap-4 ">
                  <h1 className="text-3xl font-semibold bg-gradient-to-r from-red-700 via-red-500 to-orange-700 bg-clip-text text-transparent">
                    Our Founding Story
                  </h1>
                  <p className="text-gray-white ">
                    Our e-learning platform was born out of a shared vision and
                    passion for transforming education. It all began with a
                    group of educators, technologists, and lifelong learners who
                    recognized the need for accessible, flexible, and
                    high-quality learning opportunities in a rapidly evolving
                    digital world.
                  </p>
                  <p className="text-gray-white ">
                    As experienced educators ourselves, we witnessed firsthand
                    the limitations and challenges of traditional education
                    systems. We believed that education should not be confined
                    to the walls of a classroom or restricted by geographical
                    boundaries. We envisioned a platform that could bridge these
                    gaps and empower individuals from all walks of life to
                    unlock their full potential.
                  </p>
                </div>
              </div>
              <div className="hidden w-1/2 md:flex justify-center items-center">
                <div className="max-w-[65%] shadow-[0_0_30px_rgba(185,28,28,0.6)]">
                  <img
                    className="w-full h-auto object-cover"
                    src={founding}
                    loading="lazy"
                    alt="img"
                  />
                </div>
              </div>
            </div>
            {/* subSection 2 */}
            <div className="flex flex-col gap-10 md:gap-0 md:flex-row">
              <div className="w-full md:w-1/2 md:flex md:justify-end ">
                <div className="flex md:max-w-[93%] md:pr-4 flex-col gap-4 ">
                  <h1 className="text-3xl font-semibold bg-gradient-to-r from-sky-700 via-sky-800 to-sky-900 bg-clip-text text-transparent">
                    Our Vision
                  </h1>
                  <p className="text-gray-white leading-relaxed">
                    With this vision in mind, we set out on a journey to create
                    an e-learning platform that would revolutionize the way
                    people learn. Our team of dedicated experts worked
                    tirelessly to develop a robust and intuitive platform that
                    combines cutting-edge technology with engaging content,
                    fostering a dynamic and interactive learning experience.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 md:flex md:justify-end ">
                <div className="flex w-full md:max-w-[90%] md:pr-4 flex-col gap-4">
                  <h1 className="text-3xl font-semibold bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 bg-clip-text text-transparent">
                    Our Mission
                  </h1>
                  <p className="text-gray-white leading-relaxed">
                    our mission goes beyond just delivering courses online. We
                    wanted to create a vibrant community of learners, where
                    individuals can connect, collaborate, and learn from one
                    another. We believe that knowledge thrives in an environment
                    of sharing and dialogue, and we foster this spirit of
                    collaboration through forums, live sessions, and networking
                    opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* fourth section light 2 */}
        <section className="w-full bg-bg-light-blue py-8">
          <div className="flex mx-auto w-11/12 max-w-[1260px] justify-between md:justify-evenly">
            <div className="flex flex-col items-center">
              <h className="text-3xl  font-semibold text-light-white">5K</h>
              <p className="text-gray-white">Active Students</p>
            </div>
            <div className="flex flex-col items-center">
              <h className="text-3xl  font-semibold text-light-white">10+</h>
              <p className="text-gray-white">Mentors</p>
            </div>
            <div className="flex flex-col items-center">
              <h className="text-3xl  font-semibold text-light-white">200+</h>
              <p className="text-gray-white">Courses</p>
            </div>
            <div className="flex flex-col items-center">
              <h className="text-3xl  font-semibold text-light-white">50+</h>
              <p className="text-gray-white">Awards</p>
            </div>
          </div>
        </section>
        {/* fifth section dark 3 */}
        <section className="w-full bg-bg-blue">
          <div className="w-11/12 max-w-[1260px] mx-auto py-20 gap-32 flex flex-col">
            {/* subSection 1 grid section*/}
            <div className="grid grid-cols-1 md:grid-cols-4">
              <div className="col-span-2 flex flex-col py-10 pr-20 gap-4">
                <h1 className="text-3xl font-semibold text-light-white">
                  World-Class Learning for Anyone, Anywhere
                </h1>
                <p className="text-gray-white">
                  Studynotion partners with more than 275+ leading universities
                  and companies to bring flexible, affordable, job-relevant
                  online learning to individuals and organizations worldwide.
                </p>
                <button className="py-2 px-4 hover:scale-95 duration-300 self-start mt-4 rounded-sm font-semibold bg-sky-blue text-light-white">
                  Learn More
                </button>
              </div>
              <div className="bg-bg-light-blue aspect-square  px-10 py-10">
                <h1 className="text-xl font-semibold text-light-white">
                  Curriculum Based on Industry Needs
                </h1>
                <p className="text-gray-white mt-6">
                  Save time and money! The Belajar curriculum is made to be
                  easier to understand and in line with industry needs.
                </p>
              </div>
              <div className="aspect-square bg-[#222232]  px-10 py-10">
                <h1 className="text-xl font-semibold text-light-white">
                  Our Learning Methods
                </h1>
                <p className="text-gray-white mt-6">
                  The learning process uses the namely online and offline.
                </p>
              </div>
              <div className="col-start-2 aspect-square bg-bg-light-blue  px-10 py-10">
                <h1 className="text-xl font-semibold text-light-white">
                  Certification
                </h1>
                <p className="text-gray-white mt-6">
                  You will get a certificate that can be used as a certification
                  during job hunting.
                </p>
              </div>
              <div className="aspect-square bg-[#222232]  px-10 py-10">
                <h1 className="text-xl font-semibold text-light-white">
                  Rating "Auto-grading"
                </h1>
                <p className="text-gray-white mt-6">
                  You will immediately get feedback during the learning process
                  without having to wait for an answer or response from the
                  mentor.
                </p>
              </div>
              <div className="bg-bg-light-blue aspect-square  px-10 py-10">
                <h1 className="text-xl font-semibold text-light-white">
                  Ready to Work
                </h1>
                <p className="text-gray-white mt-6">
                  Connected with over 150+ hiring partners, you will have the
                  opportunity to find a job after graduating from our program.
                </p>
              </div>
            </div>
            {/* subSection 2 */}
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-3xl text-light-white text-center font-semibold">
                Get in Touch
              </h1>
              <p className="text-gray-white text-center">
                We'd love to hear from you, Please fill out this form
              </p>
              <Form border={false}/>
            </div>
            {/* review panel */}
            <div className="w-11/12 max-w-[1260px] mx-auto">
            <div className="pb-20 pt-10 flex flex-col gap-10">
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
        </section>
        
      </div>
      <Footer/>
    </>
  );
};
export default AboutUs;
