"use client";

import "@/styles/globals.css";

import Hero from "@/components/ui/Hero";
import HowWeWork from "@/components/ui/HowWeWork";
import ContactUs from "@/components/ui/ContactUsSection";
import Feature from '@/components/ui/Featured';
import TimelineStorySection from "@/components/ui/StoryTimeline";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import DottedLine from '@/assets/SVGs/Dotted-Line-for-Section.svg';

import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full overflow-hidden relative">
      <div className="  relative w-full h-screen">
        <Hero />
      </div>
      <Feature />
      <TimelineStorySection />
      <div className="relative w-full h-auto">
          <HowWeWork />
          <ContactUs />
      </div>
    </div>
  );
}
