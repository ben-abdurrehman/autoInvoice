'use client';

import Image from "next/image";

import Invoice1 from '@/assets/InvoicesTemplates/Invoice1.png'
import Pattern from '@/assets/Patterns/Pattern.png'
// import '@/styles/globals.css';


export default function Hero() {


  return (
    <section className="font-roboto relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white overflow-hidden">
      {/* Animated Gradient Background */}
      {/* <div className="absolute inset-0 z-0 animate-gradient-move bg-gradient-radial from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-3xl"></div> */}

      {/* Content */}
      <div className="relative z-10 text-left flex flex-col items-start justify-center px-6 max-w-2xl">
        {/* <Image src={Pattern} alt="Pattern" className="absolute w-full h-full rounded-xl"/> */}
        <h1 className="font-poppins stroke-1 stroke-white text-5xl md:text-6xl font-bold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
          Create & Download Invoices in Seconds
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 mx-auto">
          AutoInvoice helps freelancers send clean, professional PDF invoices without the bloat.
        </p>
        <div className="font-jost flex justify-center gap-4">
          <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 transition font-semibold">
          Start Invoicing
          </button>
          <button className="px-6 py-3 rounded-2xl border border-white hover:bg-white hover:text-black transition font-semibold">
            Learn More
          </button>
        </div>
      </div>
      <div className="w-auto h-[70vh] relative -right-40 overflow-hidden pointer-events-none rounded-xl p-[2px] bg-border-gradient animate-shadow-glow">
        <Image src={Invoice1} alt="Invoice1" className="w-full h-full rounded-xl"/>
      </div>
      {/* Keyframe style for animated gradient */}
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
            box-shadow: 0 0 1px 5px #ec4899;
          }
          25% {
            box-shadow: 0 0 1px 5px #8b5cf6;
          }
          50% {
            box-shadow: 0 0 1px 5px #f43f5e;
          }
          75% {
            box-shadow: 0 0 1px 5px #8b5cf6;
          }
          100% {
            box-shadow: 0 0 1px 5px #ec4899;
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
    </section>
  );
}
