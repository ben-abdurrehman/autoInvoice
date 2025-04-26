"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import Mission from "@/assets/Mission.png";
import PointingArrowLeft  from "@/assets/SVGs/Pointing-Arrow-Round-Left.svg";


export default function MilestoneSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="font-['SatoshiVariable'] w-full sm:h-[100vh] lg:h-[70vh] relative flex items-center justify-center z-20 py-16 px-6">
      <Image className="absolute xl:right-[-7%] 2xl:right-[-4%] bottom-[-25%] -rotate-12 xl:h-[30vh] 2xl:h-[36vh] select-none z-0 w-auto opacity-30 overflow-hidden object-fill" src={PointingArrowLeft} alt="Background" />
      <div className="flex flex-col lg:flex-row items-center lg:justify-evenly py-16 w-[90%] md:w-5/6 lg:w-4xl xl:w-5xl 2xl:w-7xl">
        <div className="z-40 bg-gray-200 rounded-lg w-full h-full md:w-[90%] lg:w-[45%] xl:w-2/5">
          <Image src={Mission} alt="Mission" className="shadow-lg w-full h-full xl:h-96 md:hover:translate-y-[-8px] md:hover:translate-x-[-8px] transition-transform rounded-lg" />
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-5 lg:w-[45%] xl:w-2/5 text-center md:text-left mt-10 md:mt-10 lg:mt-0 lg-12">
          <p className="text-sm text-center lg:text-left text-[#211951] uppercase">We’ve helped hundreds of companies</p>
          <h2 className="text-center lg:text-left text-2xl  md:text-3xl 2xl:text-4xl font-bold text-gray-900 mt-2 leading-tight">
            <span className="lg:block">We’re only just getting </span>started on our journey
          </h2>

          <div className="grid grid-cols-1 text-center md:grid-cols-2 md:gap-x-40 lg:gap-x-5 md:gap-y-5 lg:grid-cols-2 gap-y-5 mt-4">
            {[{ end: 23, suffix: "+", text: "Projects Completed" },
              { end: 1.69, suffix: "M", text: "Secured worldwide" },
              { end: 43, suffix: "", text: "Professional Members" },
              { end: 200, suffix: "+", text: "5-star Reviews" }].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1 }}
                className="bg-gray-100 p-5 lg:p-2 xl:p-5 rounded-2xl" 
              >
                <CountUp end={item.end} suffix={item.suffix} /> <span> {item.text} </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CountUp({ end, suffix = "" }) {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      let start = 0;
      const interval = setInterval(() => {
        start += Math.ceil(end / 50);
        if (start >= end) {
          start = end;
          clearInterval(interval);
        }
        setCount(start);
      }, 50); // Adjust speed here (smaller = faster)
  
      return () => clearInterval(interval);
    }, [end]);

  return <span className="text-[#211951]  md:text-3xl 2xl:text-4xl text-center font-bold mb-3 block">{count}{suffix}</span>;
}
