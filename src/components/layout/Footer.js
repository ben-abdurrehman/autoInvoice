// import "@/styles/globals.css";
// import autoInvoiceLogo from "@/assets/all-variations/4-removedbg-Croped.png";
'use client';


import Image from "next/image";
import { FaFacebookF, FaGithub, FaDribbble, FaLinkedinIn } from "react-icons/fa";
import { TbScissors } from "react-icons/tb";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full font-roboto flex flex-col items-center justify-center bg-slate-950  transition-all py-10 px-6">
      <main className="flex flex-col items-center justify-center  bg-black z-10 pt-5 pb-10 px-6 rounded-2xl animate-shadow-glow">
        <div className="w-full md:w-5/6 lg:w-4/5 xl:w-5xl 2xl:w-7xl mx-auto grid grid-cols-1 gap-8 items-center text-white">
          <div className="flex flex-col space-y-6">
            <div className="relative flex flex-col items-left">
              <div className="relative border-dashed border-b border-gray-300 w-full flex py-5 justify-start items-center">
                <TbScissors className="absolute text-white -left-3 w-5 h-5 top-[93%]"/>
                <h2 className="text-stroke text-left font-poppins text-2xl md:text-5xl 2xl:text-7xl my-5 font-bold text-white">
                  AutoInvoice
                </h2>
              </div>
              <p className="text-gray-300 mt-5 text-sm md:text-base">
                Design amazing digital experiences that create more happy in the world.
              </p>
            </div>

            {/* <nav className="flex flex-wrap justify-start sm:justify-center md:justify-start gap-4 sm:gap-6 text-sm md:text-base text-gray-400 font-medium">
              <a href="#" className="hover:text-white">About Us</a>
              <a href="#" className="hover:text-white">Services</a>
              <a href="#" className="hover:text-white">Why Us</a>
              <a href="#" className="hover:text-white">Projects</a>
              <a href="#" className="hover:text-white">Testimonials</a>
              <a href="#" className="hover:text-white">Team</a>
              <a href="#" className="hover:text-white">Contact</a>
            </nav> */}
          </div>
        </div>

        <div className="w-full md:w-5/6 lg:w-4/5 xl:w-5xl 2xl:w-7xl flex flex-col md:flex-row items-center justify-between pt-10 border-t-[1px] border-gray-200 text-sm mt-8 px-2">
          <span className="text-center md:text-left text-gray-30 text-gray-400">© 2025 DTF. All rights reserved.</span>
          <div className="flex justify-center space-x-4 mt-4 md:mt-0 ">
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaXTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaLinkedinIn /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaFacebookF /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaGithub /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaDribbble /></a>
          </div>
        </div>
      </main>
      <style jsx>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
         @keyframes shadowGlow {
          0% {
            box-shadow: 0 0 1px 1px #ec4899;
          }
          25% {
            box-shadow: 0 0 1px 1px #8b5cf6;
          }
          50% {
            box-shadow: 0 0 1px 1px #f43f5e;
          }
          75% {
            box-shadow: 0 0 1px 1px #8b5cf6;
          }
          100% {
            box-shadow: 0 0 1px 1px #ec4899;
          }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradientMove 10s ease infinite;
        }
        .bg-border-gradient {
          background: linear-gradient(270deg, #ec4899, #8b5cf6, #f43f5e);
          background-size: 600% 600%;
          animation: gradientMove 8s ease infinite;
        }
        .animate-shadow-glow {
          animation: shadowGlow 6s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}
