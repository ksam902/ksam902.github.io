'use client';

import { useEffect, useRef } from 'react';
import { animate, createScope } from 'animejs';

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      scope.current = createScope({ root: containerRef }).add(() => {
        // Animate the construction icon
        animate('.construction-icon', {
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1],
          duration: 2000,
          easing: 'easeInOutQuad',
          loop: true,
        });

        // Animate the title with a typewriter effect
        animate('.title-char', {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 1200,
          delay: (_, i) => i * 100,
          easing: 'easeOutExpo',
        });

        // Animate the message
        animate('.message', {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 1000,
          delay: 1500,
          easing: 'easeOutExpo',
        });

        // Animate the progress bar
        animate('.progress-bar-fill', {
          width: ['0%', '60%'],
          duration: 2000,
          delay: 2000,
          easing: 'easeInOutQuart',
          loop: true,
          direction: 'alternate',
        });
      });

      return () => {
        scope.current?.revert();
      };
    }
  }, []);

  const titleChars = 'Projects Under Construction'.split('').map((char, i) => (
    <span key={i} className="title-char inline-block opacity-0">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="construction-icon text-5xl mb-6">🚧</div>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            {titleChars}
          </h2>

          <p className="message opacity-0 mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Exciting new projects are being built. Check back soon to see my latest work!
          </p>

          <div className="w-full max-w-md mt-10 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div className="progress-bar-fill h-2.5 bg-primary dark:bg-blue-500 rounded-full w-0"></div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
