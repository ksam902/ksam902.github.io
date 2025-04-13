'use client';

import { animate } from 'animejs';
import { useEffect, useMemo, useState } from 'react';
import { CodeBlock } from './ui/code-block';

const About = () => {
  // Memoize initialJsonObject to prevent recreation on every render
  const initialJsonObject = useMemo(
    () => ({
      version: '36',
      updated_at: '2023-11-15T08:42:17Z',
      current_role: 'Development Technical Lead',
      years_of_experience: 100, // Start high for animation
      kids: 10, // Start high for animation
      specializations: ['Frontend Architecture', 'Performance Optimization', 'UI/UX'],
      projects_completed: 200, // Start high for animation
      soft_skills: ['Team Leadership', 'Mentoring', 'Technical Communication', 'Project Planning'],
      debug_level: 'verbose',
    }),
    []
  );

  const [jsonObject, setJsonObject] = useState(initialJsonObject);

  // JavaScript Object properties animation
  useEffect(() => {
    // Use a temporary object for animation targets, starting from initial state
    const animatedObject = { ...initialJsonObject };

    animate(animatedObject, {
      current_role: 'Development Technical Lead', // Target value (remains same)
      years_of_experience: 10, // Target value
      kids: 2, // Target value
      projects_completed: 50, // Target value
      round: 1, // Use animejs's round utility
      duration: 2000,
      easing: 'easeInOutExpo',
      update: function () {
        // Update the state on each animation frame
        setJsonObject(prev => ({
          ...prev,
          // Ensure animated values are rounded integers
          years_of_experience: Math.round(animatedObject.years_of_experience),
          kids: Math.round(animatedObject.kids),
          projects_completed: Math.round(animatedObject.projects_completed),
          // Keep other properties from the initial object
          version: initialJsonObject.version,
          updated_at: initialJsonObject.updated_at,
          current_role: initialJsonObject.current_role,
          specializations: initialJsonObject.specializations,
          soft_skills: initialJsonObject.soft_skills,
          debug_level: initialJsonObject.debug_level,
        }));
      },
    });
  }, [initialJsonObject]); // Empty dependency array ensures this runs only once on mount

  return (
    <section
      id="about"
      className="flex flex-col items-center bg-white dark:bg-black transition-colors duration-200"
    >
      <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden">
        <div className="container text-lg sm:text-xl leading-8 text-black dark:text-white transition-colors duration-200 mx-auto sm:mx-0">
          <CodeBlock
            code={`${JSON.stringify(jsonObject, null, 2)}`}
            language="json"
            filename="about-me.json"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
