"use client";

import "@/styles/globals.css";

import Hero from "@/components/ui/Hero";
import HowWeWork from "@/components/ui/HowWeWork";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Feature from '@/components/ui/Featured';
import TimelineStorySection from "@/components/ui/StoryTimeline";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full overflow-hidden relative">
      <Navbar />
      <Hero />
      <Feature />
      <TimelineStorySection />
      <div className="relative w-full h-auto">
          <HowWeWork />
      </div>
        <Footer />
    </div>
  );
}
