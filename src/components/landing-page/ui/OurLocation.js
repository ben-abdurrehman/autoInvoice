"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image from "next/image";

import WorldSvgMap from "@/assets/Patterns/WorldSvgMap.png";
import { IoIosCloseCircle } from "react-icons/io"; 

import locations from './data/objects/Features'; // Assuming you have a locations.js file with the location data


gsap.registerPlugin(ScrollTrigger);


export default function OurLocations() {

  // const imageRef = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  // const imageInView = useInView(imageRef, { once: true, margin: "-100px" });
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;

    gsap.fromTo(
      sectionRef.current,
      { backgroundColor: "#ffffff" },
      {
        backgroundColor: "#000000",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play reverse play reverse",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      headingRef.current,
      { color: "#1F2937" },
      {
        color: "#ffffff",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "top 40%",
          toggleActions: "play reverse play reverse",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="w-full h-full py-16 px-6 text-center">
      <h2 ref={headingRef} className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-gray-800">Our Locations</h2>
      <p className="text-gray-500 mt-2">Say hello to our friendly team at one of these locations.</p>

      <div className="relative w-[90%] md:w-5/6 lg:w-4/5 xl:w-5xl 2xl:w-7xl p-3 md:p-10 mx-auto mt-8 bg-contain bg-no-repeat bg-center rounded-lg"
          //  style={{ backgroundImage: `url(${WorldSvgMap.src})`, filter: "drop-shadow(0 0 0.75rem #211951)",  height: "50vh", backgroundColor: "#f7f7f7" }}
           >
           <div>
              <Image
                src={WorldSvgMap}
                alt="World Map"
                className="w-full h-[50vh] object-contain rounded-lg drop-shadow-[0_0_1px_rgba(0,0,0,0.7)] select-none"
              />
            </div>
        {locations.map((location) => (
          <span key={location.id}
                className="absolute flex size-2 cursor-pointer"
                style={{ top: location.coordinates.top, left: location.coordinates.left }}
                onClick={() => setSelectedLocation(location)}>
            <span className="absolute h-3 w-3 animate-ping rounded-full bg-purple-400"></span>
            <span className="relative inline-flex size-2 rounded-full bg-purple-500"></span>
          </span>
        ))}

        {selectedLocation && (
          <div className="font-['SatoshiVariable'] absolute flex flex-col items-center justify-center bg-white shadow-lg p-4 rounded-lg text-center w-44 "
               style={{
                 top: `calc(${selectedLocation.coordinates.top} - 50px)`,
                 left: `calc(${selectedLocation.coordinates.left} + 20px)`,
               }}>
            <button className="absolute right-2 top-2 text-red-400" onClick={() => setSelectedLocation(null)}>
              <IoIosCloseCircle className="w-5 h-5" />
            </button>
            <Image className="w-7 h-7" src={selectedLocation.img} alt="Flag" />
            <strong className="text-[#0A6A30] block">{selectedLocation.name}</strong>
          </div>
        )}
      </div>

      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-[90%] md:w-5/6 lg:w-4/5 xl:w-5xl 2xl:w-7xl mx-auto text-gray-800">
        <div className="text-center p-4 rounded-lg md:p-0 md:rounded-none">
          <h3 className="font-semibold text-white">Operations/HR</h3>
          <p className="text-sm text-gray-400">Our friendly team is here to help.</p>
          <a href="mailto:jahanzaib@devtechfusion.com" className="text-gray-400 hover:text-gray-200 text-sm">jahanzaib@devtechfusion.com</a>
        </div>
        <div className="text-center p-4 rounded-lg md:p-0 md:rounded-none">
          <h3 className="font-semibold text-white">Business Development</h3>
          <p className="text-sm text-gray-400">Questions or queries? Get in touch!</p>
          <a href="mailto:sales@devtechfusion.com" className="text-gray-400 hover:text-gray-200 text-sm">sales@devtechfusion.com</a>
        </div>
        <div className="text-center p-4 rounded-lg md:p-0 md:rounded-none">
          <h3 className="font-semibold text-white">Technology</h3>
          <p className="text-sm text-gray-400">Questions or queries? Get in touch!</p>
          <a href="mailto:ahmad@devtechfusion.com" className="text-gray-400 hover:text-gray-200 text-sm">ahmad@devtechfusion.com</a>
        </div>
      </div>
    </section>
  );
}
