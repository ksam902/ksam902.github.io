'use client';

import { animate, svg, stagger, utils } from 'animejs';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLElement>(null);

  // Animation for the text typing effect
  useEffect(() => {
    if (textRef.current) {
      // Split text into spans, preserving spaces
      const text = "Hi, I'm Kyle";
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

      // Create a wrapper for text
      const wrapper = document.createElement('div');
      wrapper.className = 'flex relative';

      // Move all spans into the wrapper
      while (textRef.current.firstChild) {
        wrapper.appendChild(textRef.current.firstChild);
      }

      // Add wrapper back to the container
      textRef.current.appendChild(wrapper);

      // Animate characters
      const spans = wrapper.querySelectorAll('span');

      // Create typing animation
      animate(spans, {
        opacity: [0, 1],
        duration: 50,
        easing: 'linear',
        delay: (_, i) => i * 100, // Stagger each character
      });
    }
  }, []);

  // SVG Animation using createDrawable
  useEffect(() => {
    if (svgRef.current) {
      // Animation for SVG paths
      animate(svg.createDrawable('.line'), {
        draw: ['0 0', '0 1', '1 1'],
        ease: 'inOutQuad',
        duration: 3000,
        delay: stagger(100),
        loop: true,
      });
    }
  }, []);

  // JavaScript Object properties animation
  useEffect(() => {
    if (codeRef.current) {
      const myObject = {
        years_of_experience: 100,
        kids: 10,
      };

      animate(myObject, {
        years_of_experience: 10,
        kids: 2,
        modifier: utils.round(0),
        duration: 2000,
        easing: 'easeInOutExpo',
        direction: 'alternate',
        onRender: function () {
          if (codeRef.current) {
            codeRef.current.innerHTML = JSON.stringify({
              years_of_experience: myObject.years_of_experience,
              kids: myObject.kids,
            });
          }
        },
      });
    }
  }, []);

  return (
    <section className="min-h-screen flex items-center bg-white dark:bg-black transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black dark:text-white transition-colors duration-200">
            <div ref={textRef} className="block typing-text relative"></div>
          </h1>
          <p className="mt-6 text-lg sm:text-xl leading-8 text-black dark:text-white transition-colors duration-200 max-w-2xl mx-auto sm:mx-0">
            <code ref={codeRef}>{'{"years_of_experience":100,"kids":10}'}</code>
          </p>
          <div
            ref={svgRef}
            className="mt-10 text-black dark:text-white transition-colors duration-200 mx-auto sm:mx-0"
          >
            <svg viewBox="0 0 304 112" className="w-full max-w-md">
              <g
                stroke="currentColor"
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path
                  className="line"
                  d="M59 90V56.136C58.66 46.48 51.225 39 42 39c-9.389 0-17 7.611-17 17s7.611 17 17 17h8.5v17H42C23.222 90 8 74.778 8 56s15.222-34 34-34c18.61 0 33.433 14.994 34 33.875V90H59z"
                />
                <polyline className="line" points="59 22.035 59 90 76 90 76 22 59 22" />
                <path
                  className="line"
                  d="M59 90V55.74C59.567 36.993 74.39 22 93 22c18.778 0 34 15.222 34 34v34h-17V56c0-9.389-7.611-17-17-17-9.225 0-16.66 7.48-17 17.136V90H59z"
                />
                <polyline className="line" points="127 22.055 127 90 144 90 144 22 127 22" />
                <path
                  className="line"
                  d="M127 90V55.74C127.567 36.993 142.39 22 161 22c18.778 0 34 15.222 34 34v34h-17V56c0-9.389-7.611-17-17-17-9.225 0-16.66 7.48-17 17.136V90h-17z"
                />
                <path
                  className="line"
                  d="M118.5 22a8.5 8.5 0 1 1-8.477 9.067v-1.134c.283-4.42 3.966-7.933 8.477-7.933z"
                />
                <path
                  className="line"
                  d="M144 73c-9.389 0-17-7.611-17-17v-8.5h-17V56c0 18.778 15.222 34 34 34V73z"
                />
                <path
                  className="line"
                  d="M178 90V55.74C178.567 36.993 193.39 22 212 22c18.778 0 34 15.222 34 34v34h-17V56c0-9.389-7.611-17-17-17-9.225 0-16.66 7.48-17 17.136V90h-17z"
                />
                <path
                  className="line"
                  d="M263 73c-9.389 0-17-7.611-17-17s7.611-17 17-17c9.18 0 16.58 7.4 17 17h-17v17h34V55.875C296.433 36.994 281.61 22 263 22c-18.778 0-34 15.222-34 34s15.222 34 34 34V73z"
                />
                <path
                  className="line"
                  d="M288.477 73A8.5 8.5 0 1 1 280 82.067v-1.134c.295-4.42 3.967-7.933 8.477-7.933z"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
