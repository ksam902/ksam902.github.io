'use client';

import { animate, utils } from 'animejs';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null);
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

  // JavaScript Object properties animation
  useEffect(() => {
    if (codeRef.current) {
      const myObject = {
        version: '36',
        updated_at: '2023-11-15T08:42:17Z',
        current_role: 'Development Technical Lead',
        years_of_experience: 100,
        kids: 10,
        specializations: ['Frontend Architecture', 'Performance Optimization', 'UI/UX'],
        projects_completed: 200,
        soft_skills: [
          'Team Leadership',
          'Mentoring',
          'Technical Communication',
          'Project Planning',
        ],
        debug_level: 'verbose',
      };

      animate(myObject, {
        current_role: 'Development Technical Lead',
        years_of_experience: 10,
        kids: 2,
        projects_completed: 50,
        modifier: utils.round(0),
        duration: 2000,
        easing: 'easeInOutExpo',
        direction: 'alternate',
        onRender: function () {
          if (codeRef.current) {
            codeRef.current.innerHTML =
              '// about-me.json \n' +
              JSON.stringify(
                {
                  version: myObject.version,
                  updated_at: myObject.updated_at,
                  current_role: 'Development Technical Lead',
                  years_of_experience: myObject.years_of_experience,
                  specializations: myObject.specializations,
                  soft_skills: myObject.soft_skills,
                  projects_completed: myObject.projects_completed,
                  debug_level: myObject.debug_level,
                  kids: myObject.kids,
                },
                null,
                2
              );
          }
        },
      });
    }
  }, []);

  return (
    <section className="min-h-screen flex items-center bg-white dark:bg-black transition-colors duration-200">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black dark:text-white transition-colors duration-200">
            <div ref={textRef} className="block typing-text relative h-12"></div>
          </h1>
          <div className="mt-6 text-lg sm:text-xl leading-8 text-black dark:text-white transition-colors duration-200 max-w-2xl mx-auto sm:mx-0">
            <pre className="text-left bg-gray-800 dark:bg-gray-900 rounded-md p-4 overflow-x-auto">
              <code
                ref={codeRef}
                className="text-green-400 dark:text-green-300 font-mono text-sm"
              >{`// about-me.json
{
  "version": "36",
  "updated_at": "2023-11-15T08:42:17Z",
  "current_role": "Development Technical Lead",
  "years_of_experience": 100,
  "specializations": [
    "Frontend Architecture",
    "Performance Optimization",
    "UI/UX"
  ],
  "soft_skills": [
    "Team Leadership",
    "Mentoring",
    "Technical Communication",
    "Project Planning"
  ],
  "projects_completed": 200,
  "debug_level": "verbose",
  "kids": 10
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
