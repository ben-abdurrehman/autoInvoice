// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import Client1 from "@/assets/Client1.png";
// import Image from "next/image";

// const testimonials = [
//   {
//     id: 1,
//     img: Client1,
//     role: "Head of Technology",
//     quote:
//       "Experience Speaks for Itself – That is what I felt in my 1st dealing with DevTech Fusion when they gave me the crystal-clear roadmap for our design stage within 3 days of the initial meet-up. They delivered on-time! That is why I consider DevTech Fusion as our Software Technology Partner",
//     name: "Mr. Shahzad Anwar",
//     company: "SecuTech Arabia",
//   },
//   {
//     id: 2,
//     img: Client1,
//     role: "General Manager",
//     quote:
//       "DevTech Fusion has been instrumental in enhancing our digital visibility. Their SEO services were not only strategic but also results-driven. We've seen measurable improvements in our search rankings and online reach thanks to their expertise.",
//     name: "Rauf Anwar",
//     company: "Allied Solutions",
//   },
//   {
//     id: 3,
//     img: Client1,
//     role: "Founder & CEO",
//     quote:
//       "Partnering with DevTech Fusion was a turning point for our online presence. Their store management, content creation, and social media posting helped us connect with our audience more effectively. Their creative approach and consistency brought real growth to our brand.",
//     name: "Ali Raza",
//     company: "Muski Store",
//   },
//   {
//     id: 4,
//     img: Client1,
//     role: "Owner",
//     quote:
//       "DevTech Fusion exceeded our expectations with their Shopify store development and SEO expertise. They built a sleek, user-friendly store that truly represents our brand, and their strategic SEO efforts significantly boosted our traffic and conversions.",
//     name: "Shahaazb Izmir",
//     company: "Skyline Scale Store",
//   },
// ];

// export default function TestimonialSection() {
//   return (
//     <section className="font-['SatoshiVariable'] w-full sm:h-[100vh] lg:h-[90vh] py-28 relative z-20">
//       <div className="text-center mb-10 z-30">
//         <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#212121]">What Our Clients Say</h2>
//       </div>

//       <Swiper
//         modules={[Pagination]}
//         pagination={{ clickable: true }}
//         spaceBetween={50}
//         slidesPerView={1}
//         autoplay={{ delay: 3000, disableOnInteraction: false }}
//         loop={true}
//         className="w-[90%] md:w-5/6 lg:w-4/5 xl:w-5xl 2xl:w-7xl mx-auto"
//       >
//         {testimonials.map((testimonial) => (
//           <SwiperSlide key={testimonial.id}>
//             <div className="h-auto py-10 flex flex-col lg:flex-row items-center justify-center gap-10">
//               <div className="w-full md:w-3/4 lg:w-1/2 z-20 flex justify-center bg-gray-200 rounded-lg">
//                 <Image
//                   src={testimonial.img}
//                   alt="Client"
//                   layout="intrinsic"
//                   className="shadow-md md:hover:translate-y-[-8px] md:hover:translate-x-[-8px] transition-transform rounded-lg"
//                 />
//               </div>

//               <div className="z-30 w-full md:w-3/4 lg:w-1/2 xl:w-2/3 flex flex-col items-start text-center md:text-left">
//                 <p className="text-lg font-bold text-center lg:text-left text-[#211951] uppercase mb-5">
//                   {testimonial.role}
//                 </p>
//                 <blockquote className="text-black text-center lg:text-left md:text-xl xl:text-2xl/snug font-normal leading-relaxed">
//                   “{testimonial.quote}”
//                 </blockquote>
//                 <span className="mt-4 text-center lg:text-left block font-semibold text-gray-900">
//                   {testimonial.name} - <a href="#" className="text-blue-500 hover:underline">{testimonial.company}</a>
//                 </span>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   );
// }



// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, EffectCards, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/effect-cards";
// import Client1 from "@/assets/Client1.png";
// import Image from "next/image";

// const testimonials = [
//   {
//     id: 1,
//     img: Client1,
//     role: "Head of Technology",
//     quote:
//       "Experience Speaks for Itself – That is what I felt in my 1st dealing with DevTech Fusion when they gave me the crystal-clear roadmap for our design stage within 3 days of the initial meet-up. They delivered on-time! That is why I consider DevTech Fusion as our Software Technology Partner",
//     name: "Mr. Shahzad Anwar",
//     company: "SecuTech Arabia",
//   },
//   {
//     id: 2,
//     img: Client1,
//     role: "General Manager",
//     quote:
//       "DevTech Fusion has been instrumental in enhancing our digital visibility. Their SEO services were not only strategic but also results-driven. We've seen measurable improvements in our search rankings and online reach thanks to their expertise.",
//     name: "Rauf Anwar",
//     company: "Allied Solutions",
//   },
//   {
//     id: 3,
//     img: Client1,
//     role: "Founder & CEO",
//     quote:
//       "Partnering with DevTech Fusion was a turning point for our online presence. Their store management, content creation, and social media posting helped us connect with our audience more effectively. Their creative approach and consistency brought real growth to our brand.",
//     name: "Ali Raza",
//     company: "Muski Store",
//   },
//   {
//     id: 4,
//     img: Client1,
//     role: "Owner",
//     quote:
//       "DevTech Fusion exceeded our expectations with their Shopify store development and SEO expertise. They built a sleek, user-friendly store that truly represents our brand, and their strategic SEO efforts significantly boosted our traffic and conversions.",
//     name: "Shahaazb Izmir",
//     company: "Skyline Scale Store",
//   },
// ];

// export default function TestimonialSection() {
//   return (
//     <section className="font-['SatoshiVariable'] overflow-hidden w-full sm:h-[100vh] lg:h-[90vh] py-28 relative z-20">
//       <div className="text-center mb-10 z-30">
//         <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#212121]">What Our Clients Say</h2>
//       </div>

//       <Swiper
//         modules={[Pagination, EffectCards, Autoplay]}
//         effect="cards"
//         grabCursor={true}
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 3000, disableOnInteraction: false }}
//         loop={true}
//         className="w-[90%] h-3/4  md:w-5/6 lg:w-4/5 xl:w-5xl 2xl:w-7xl mx-auto"
//       >
//         {testimonials.map((testimonial) => (
//           <SwiperSlide key={testimonial.id} className="bg-white rounded-lg p-8 shadow-xl">
//             <div className="h-auto flex items-center justify-center gap-6">
//               {/* <div className="w-full flex justify-center bg-gray-200 rounded-lg">
//                 <Image
//                   src={testimonial.img}
//                   alt="Client"
//                   width={300}
//                   height={300}
//                   className="shadow-md transition-transform rounded-lg"
//                 />
//               </div> */}
//               <div className="w-full md:w-3/4 lg:w-1/2 z-20 flex justify-center bg-gray-200 rounded-lg">
//                    <Image
//                      src={testimonial.img}
//                      alt="Client"
//                      layout="intrinsic"
//                      className="shadow-md md:hover:translate-y-[-8px] md:hover:translate-x-[-8px] transition-transform rounded-lg"
//                    />
//                  </div>
//               <div className="w-full flex flex-col items-center text-center">
//                 <p className="text-lg font-bold text-[#211951] uppercase mb-3">
//                   {testimonial.role}
//                 </p>
//                 <blockquote className="text-black md:text-xl xl:text-2xl/snug font-normal leading-relaxed">
//                   “{testimonial.quote}”
//                 </blockquote>
//                 <span className="mt-4 block font-semibold text-gray-900">
//                   {testimonial.name} - <a href="#" className="text-blue-500 hover:underline">{testimonial.company}</a>
//                 </span>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   );
// }

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCards, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import Image from "next/image";

import testimonials from "./data/objects/Testimonials";
import PointingArrowRight  from "@/assets/SVGs/Pointing-Arrow-Round-Right .svg";


export default function TestimonialSection() {
  return (
    <section className="font-['SatoshiVariable'] overflow-hidden w-full sm:h-[100vh] lg:h-[90vh] py-28 relative z-20">
      <Image className="absolute left-[-10%] bottom-[-15%] rotate-12 select-none xl:h-80 2xl:h-[35vh] z-0 w-auto opacity-30 overflow-hidden object-fill" src={PointingArrowRight} alt="Background" />
      
      <div className="text-center mb-10 z-30">
        <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#212121]">What Our Clients Say</h2>
      </div>

      <Swiper
        modules={[EffectCards, Autoplay]} // ❌ Remove Pagination module
        effect="cards"
        grabCursor={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-[90%] xl:h-[45vh] 2xl:h-[50vh] md:w-5/6 lg:w-4/5 xl:w-5xl 2xl:w-7xl mx-auto flex items-center justify-center"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className="bg-black border-1 border-gray-200 rounded-lg p-8 shadow-2xl relative"> {/* Added relative positioning */}
            <div className="h-auto flex items-center justify-center gap-6 relative z-10"> {/* Added relative z-index */}
              <div className="w-full md:w-3/4 lg:w-1/2 z-20 flex justify-center bg-gray-100 rounded-lg">
                <Image
                  src={testimonial.img}
                  alt="Client"
                  layout="intrinsic"
                  className="shadow-md md:hover:translate-y-[-8px] border border-white md:hover:translate-x-[-8px] transition-transform rounded-lg"
                />
              </div>
              <div className="z-30 text-black w-full md:w-3/4 lg:w-1/2 xl:w-2/3 flex flex-col items-start text-center md:text-left">
                <p className="text-lg font-bold text-center lg:text-left text-gray-300 uppercase mb-5">
                  {testimonial.role}
                </p>
                <p className="text-center lg:text-left md:text-xl xl:text-xl 2xl:text-2xl/snug relative z-40">  {/* Increased z-index */}
                  “{testimonial.quote}”
                </p>
                <span className="mt-4 text-center lg:text-left block font-semibold text-gray-400">
                  {testimonial.name} - <a href="#" className="text-blue-500 hover:underline">{testimonial.company}</a>
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

