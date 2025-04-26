// src/components/AnimatedText.js
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const AnimatedText = ({ words }) => {
  const [currentWord, setCurrentWord] = useState(0);
  const textRef = useRef([]);

  useEffect(() => {
    const animate = () => {
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: () => gsap.utils.random(-100, 100),
          x: () => gsap.utils.random(-100, 100),
          rotate: () => gsap.utils.random(-180, 180),
          scale: 0,
          skewX: () => gsap.utils.random(-45, 45),
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          skewX: 0,
          duration: 1.8,
          ease: 'power4.out',
          stagger: {
            each: 0.06,
            from: 'center'
          },
        }
      );
    };

    animate();
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    gsap.killTweensOf(textRef.current);
    textRef.current.forEach((el) => el && (el.style.opacity = 0));
    gsap.delayedCall(0.05, () => {
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: () => gsap.utils.random(-100, 100),
          x: () => gsap.utils.random(-100, 100),
          rotate: () => gsap.utils.random(-180, 180),
          scale: 0,
          skewX: () => gsap.utils.random(-45, 45),
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          skewX: 0,
          duration: 1.8,
          ease: 'power4.out',
          stagger: {
            each: 0.06,
            from: 'center'
          },
        }
      );
    });
  }, [currentWord]);

  return (
    <div className="flex justify-center items-center">
      <h1 className="text-center text-3xl md:text-[44px] lg:text-5xl 2xl:text-6xl font-black font-['SatoshiVariable']">
        {words[currentWord].split('').map((char, i) => (
          <span
            key={i}
            ref={(el) => (textRef.current[i] = el)}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default AnimatedText;



{/* <h1 className="text-center text-3xl md:text-[44px] lg:text-5xl 2xl:text-6xl font-black font-['SatoshiVariable']"></h1> */}