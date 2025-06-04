import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import solutions from "@/data/objects/Solutions";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function TechnologySolutions() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  return (
    <section id="services" className="font-['SatoshiVariable'] w-full flex flex-col gap-10 py-16 px-4 sm:px-6 lg:px-8 2xl:py-40 z-50 text-center">
      <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-gray-900">
        Driving Industries Forward with Innovation
      </h2>
      <p className="text-gray-500 font-['Inter'] 2xl:text-lg">
      We blend industry expertise, advanced IT solutions, and powerful AI technologies to help businesses grow, adapt, and stay ahead in an ever-evolving world.
      </p>
      <div ref={sectionRef} className="bg-white relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[90%] md:w-5/6 lg:w-4xl xl:w-5xl 2xl:w-7xl mx-auto">
        {solutions.map((solution, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
            className="relative bg-gray-200 rounded-[10px] w-full h-full"
          >
            <div className="bg-white rounded-[10px] h-full shadow-[0_0_8px_#00000040] p-6 2xl:p-6 flex flex-col items-start text-left transition-transform md:hover:translate-y-[-8px] md:hover:translate-x-[-8px]">
              <div className="bg-gray-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <FaArrowUpRightFromSquare className="text-gray-600 text-lg" />
              </div>
              <h3 className="text-[22px] font-bold text-gray-900 2xl:text-2xl mb-2">
                {solution.title}
              </h3>
              <p className="text-gray-500 2xl:text-lg">{solution.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

