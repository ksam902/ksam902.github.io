'use client';

import { animate } from 'animejs';
import { useEffect, useRef } from 'react';

const styles = `
  .typing-cursor {
    position: absolute;
    width: 2px;
    height: 100%;
    background-color: currentColor;
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add styles to document head
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

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

      // Create cursor element
      const cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      textRef.current.appendChild(cursor);

      // Animate characters
      const spans = textRef.current.querySelectorAll('span:not(.typing-cursor)');

      // Create typing animation
      animate(spans, {
        opacity: [0, 1],
        duration: 50,
        easing: 'linear',
        delay: (_, i) => i * 100, // Stagger each character
      });

      // Animate cursor position
      animate(cursor, {
        translateX: [
          0,
          ...Array.from(spans).map((_, i) => {
            const span = spans[i] as HTMLSpanElement;
            return i * span.offsetWidth;
          }),
        ],
        duration: spans.length * 100,
        easing: 'steps(' + spans.length + ')',
      });
    }
  }, []);

  return (
    <section className="min-h-screen flex items-center transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighttransition-colors duration-200">
            <div
              ref={textRef}
              className="block typing-text relative text-black dark:text-white "
            ></div>
          </h1>
          <p className="mt-6 text-lg sm:text-xl leading-8 text-black dark:text-white transition-colors duration-200 max-w-2xl mx-auto sm:mx-0">
            I specialize in building high-performance, scalable web applications using modern
            technologies. With expertise in frontend and backend development, I lead teams to
            deliver exceptional digital experiences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
