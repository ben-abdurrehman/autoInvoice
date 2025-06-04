"use client";
import { useEffect } from "react";

const ParticlesBackground = () => {
  useEffect(() => {
    const checkAndLoadParticles = () => {
      if (window.tsParticles && window.tsParticles.load) {
        window.tsParticles.load("tsparticles", {
          fullScreen: { enable: false },
          background: { color: "transparent" },
          particles: {
            number: { value: 50 },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 3 },
            move: {
              enable: true,
              speed: 1,
              outModes: { default: "bounce" },
            },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
            modes: { repulse: { distance: 100 } },
          },
          detectRetina: true,
        });
        clearInterval(poll);
      }
    };

    const poll = setInterval(checkAndLoadParticles, 100); // poll every 100ms
    return () => clearInterval(poll);
  }, []);

  return (
    <div
      id="tsparticles"
      className="absolute inset-0 z-10 w-full h-full"
    />
  );
};

export default ParticlesBackground;
