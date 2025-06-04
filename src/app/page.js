"use client";

import "@/styles/globals.css";

import Hero from "@/components/landing-page/ui/Hero";
import HowWeWork from "@/components/landing-page/ui/HowWeWork";
import Navbar from "@/components/landing-page/layout/Navbar";
import Footer from "@/components/landing-page/layout/Footer";
import Feature from '@/components/landing-page/ui/Featured';
import TimelineStorySection from "@/components/landing-page/ui/StoryTimeline";




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
