// "use client";

// import { useRef } from "react";
// import { FiArrowUpRight } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { useInView } from "framer-motion";
// import project from "./Projects";
// import Image from "next/image";

// export default function ProjectShowcasing() {
//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

//   const fadeUp = {
//     hidden: { opacity: 0, y: 50 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.25,
//         duration: 0.8,
//         ease: "easeOut",
//       },
//     }),
//   };

//   return (
//     <section
//       ref={sectionRef}
//       id="projects"
//       className="font-['SatoshiVariable'] w-full py-28 px-4 sm:px-6 lg:px-8 text-center"
//     >
//       <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-gray-900">
//         Innovation & Results
//       </h2>
//       <p className="text-gray-500 font-['Inter'] text-lg mt-2 mb-10">
//         Driving progress with creative solutions and tangible impact.
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 w-[90%] md:w-5/6 lg:w-4xl xl:w-5xl 2xl:w-7xl mx-auto">
//         {project.map((caseStudy, index) => (
//           <motion.div
//             key={index}
//             className="relative bg-[#211951] rounded-[10px] w-full h-ful"
//             variants={fadeUp}
//             initial="hidden"
//             animate={isInView ? "visible" : "hidden"}
//             custom={index}
//           >
//             <div className=" bg-white h-56 rounded-[10px] border border-[#211951] flex flex-col sm:flex-row items-start justify-between space-y-4 sm:space-y-0 sm:space-x-6 2xl:w-full p-6 transition-transform md:hover:translate-y-[-8px] md:hover:translate-x-[-8px]">
//             <div className="w-full sm:w-auto flex flex-col items-center sm:items-start text-center sm:text-left space-y-2">
//               <span className="md:text-xs lg:text-lg font-bold text-black">
//                 {caseStudy.category}
//               </span>
//               <h3 className="text-2xl md:text-xl lg:text-2xl 2xl:text-3xl font-extrabold text-gray-900">
//                 {caseStudy.title}
//               </h3>
//               <button className="bg-gray-200 rounded-xl p-3 transition hover:bg-gray-300">
//                 <FiArrowUpRight className="text-gray-900 text-lg" />
//               </button>
//             </div>

//             <div className="w-[200px] h-[140px] rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden">
//               {caseStudy.image ? (
//                 <Image
//                   src={caseStudy.image}
//                   alt={caseStudy.title}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span className="text-gray-400">Image Placeholder</span>
//               )}
//             </div>
//           </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }


"use client";

import { useLayoutEffect, useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import project from "./data/objects/Projects";
import Image from "next/image";

import PointingArrowRight  from "@/assets/SVGs/Pointing-Arrow-Round-Right .svg";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectShowcasing() {
  const trackWrapperRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const wrapper = trackWrapperRef.current;
      
      // Calculate total horizontal scroll distance
      const trackWidth = track.scrollWidth;
      const wrapperWidth = wrapper.offsetWidth;
      const horizontalScrollDistance = trackWidth - wrapperWidth;
  
      gsap.to(track, {
        x: -horizontalScrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${horizontalScrollDistance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (project.length - 1),
            duration: { min: 0.2, max: 0.3 },
            delay: 0.1,
            ease: "power1.inOut"
          },
          invalidateOnRefresh: true 
        }
      });
    }, trackWrapperRef);
  
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      className="font-['SatoshiVariable'] relative w-full py-20 px-4 sm:px-6 lg:px-0 text-center"
    >
      <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-gray-900">
        Innovation & Results
      </h2>
      <p className="text-gray-500 font-['Inter'] text-lg mt-2 mb-10">
        Driving progress with creative solutions and tangible impact.
      </p>

      <div
        ref={trackWrapperRef}
        className="relative w-full h-[100vh] overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex w-full h-full items-center"
        >
          {project.map((caseStudy, index) => (
            <div
              key={index}
              className="min-w-[90vw] md:min-w-[100vw] px-4"
            >
              <div className="bg-white rounded-[10px] flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 p-6">
                <div className="w-full sm:w-[50%] flex flex-col items-center sm:items-start text-center sm:text-left space-y-2">
                  <span className="md:text-xs lg:text-lg font-bold text-black">
                    {caseStudy.category}
                  </span>
                  <h3 className="text-2xl md:text-xl lg:text-7xl 2xl:text-8xl font-extrabold text-gray-900">
                    {caseStudy.title}
                  </h3>
                  <button className="bg-gray-200 rounded-xl p-3 transition hover:bg-gray-300">
                    <FiArrowUpRight className="text-gray-900 text-lg" />
                  </button>
                </div>

                <div className="w-[40%] h-full rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden">
                  {caseStudy.image ? (
                    <Image
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">Image Placeholder</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      <Image className="absolute h-[40vh] left-[-10%] bottom-[-15%] lg:left-[-20%] lg:bottom-[-15%] xl:left-[-10%] xl:bottom-[-10%] 2xl:left-[-12%] 2xl:bottom-[-15%] select-none  lg:h-[40vh] 2xl:h-[40vh] z-0 w-auto opacity-30 overflow-hidden object-fill" src={PointingArrowRight} alt="Background" />
      </div>
    </section>
  );
}