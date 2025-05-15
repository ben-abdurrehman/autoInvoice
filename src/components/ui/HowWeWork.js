"use client";

import Image from "next/image";

import values from "@/data/objects/Values";
// import Grains from "@/assets/Grains.png";
import Blob from "@/assets/FloatingAssets/Blob.png";

export default function HowWeWork() {

  return (
    <section
      id="about"
      className="font-roboto bg-gradient-to-bl from-black via-slate-950 to-slate-950 w-full relative py-28  overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <h2 className="text-stroke font-poppins text-2xl md:text-8xl 2xl:text-9xl mb-10 font-bold text-center text-white">
          Who we are BTW?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 w-[90%] md:w-4/5 lg:w-4xl xl:w-5xl 2xl:w-7xl mx-auto relative z-10">
        {values.map((value, index) => (
          <div
            key={index}
            className={`${index === 0 || index === 3 ? "col-span-1" : (index === 1 || index === 2 ? "col-span-2" : "")}  flex flex-col border border-gray-400 bg-transparent backdrop-blur-3xl items-start space-y-3 p-7 rounded-xl`}
          >
            {/* <Image src={value.icon} alt={value.title} className="w-12 h-12" /> */}
            <h3 className="text-lg font-bold text-white">{value.title}</h3>
            <p className="text-gray-400">{value.description}</p>
          </div>
        ))}
      </div>

      {/* <Image
        src={Grains}
        alt="Grains"
        className="absolute inset-0 object-cover -z-40 w-full h-full opacity-40"
      /> */}
      <Image
        src={Blob}
        alt="Blob"
        className="absolute inset-0 object-cover -z-30 w-full h-full opacity-40"
      />
    </section>
  );
}
