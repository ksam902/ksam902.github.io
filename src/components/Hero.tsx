'use client';

import { animate } from 'animejs';
import { useEffect, useRef } from 'react';
import { SparklesCore } from './ui/sparkles';

export function Sparkles() {
  const textRef = useRef<HTMLHeadingElement>(null);

  // Animation for the text typing effect
  useEffect(() => {
    if (textRef.current) {
      // Split text into spans, preserving spaces
      const text = 'Hi, Im Kyle';
      textRef.current.innerHTML = text
        .split(/(\s+)/) // Split by whitespace but keep the spaces
        .map(char => {
          if (char.trim() === '') {
            // Return a space with the same width as a character
            return '<span class="inline-block opacity-0">&nbsp;</span>';
          }
          return char
            .split('')
            .map(c => `<span class="inline-block opacity-0">${c}</span>`)
            .join('');
        })
        .join('');

      // Animate characters
      const spans = textRef.current.querySelectorAll('span');

      // Create typing animation
      animate(spans, {
        opacity: [0, 1],
        duration: 50,
        easing: 'linear',
        delay: (_, i) => i * 100, // Stagger each character
      });
    }
  }, []);

  return (
    <div
      id="hero"
      className="min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      <h1
        ref={textRef}
        className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20"
      >
        {/* Initial content removed, will be populated by animation */}
      </h1>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}

const Hero = () => {
  // textRef and related useEffect removed

  return (
    <section id="home">
      <Sparkles />
    </section>
  );
};

export default Hero;
