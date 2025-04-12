'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { useTheme } from '@/src/providers/ThemeProvider';
import SocialLinks from './SocialLinks';
// import anime from 'animejs/lib/anime.es.js';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('');
  const logoRef = useRef<HTMLDivElement>(null);

  const sections = useMemo(
    () => [
      { id: 'about', label: 'About' },
      { id: 'tech-stack', label: 'Tech Stack' },
      { id: 'projects', label: 'Projects' },
    ],
    []
  );

  // useEffect(() => {
  //   const animation = anime({
  //     targets: logoRef.current,
  //     scale: [1, 1.1],
  //     opacity: [0.8, 1],
  //     easing: 'easeInOutSine',
  //     duration: 1500,
  //     loop: true,
  //     direction: 'alternate'
  //   });

  //   return () => animation.pause();
  // }, []);

  const handleScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(`#${targetId}`);
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.querySelector(`#${section.id}`);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const topOffset = top + window.pageYOffset;
          const bottomOffset = bottom + window.pageYOffset;

          if (scrollPosition >= topOffset && scrollPosition <= bottomOffset) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    handleScrollSpy(); // Initial check

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [sections]);

  return (
    <nav className="fixed left-0 top-0 h-full w-24 bg-white/90 dark:bg-secondary/90 backdrop-blur-md z-50 border-r border-gray-200 dark:border-gray-800 flex flex-col items-center py-8">
      <div ref={logoRef} className="w-12 h-12 mb-16">
        <Image src="/svgs/react.svg" alt="Logo" width={48} height={48} className="w-full h-full" />
      </div>

      <div className="flex flex-col items-center space-y-12">
        {sections.map(({ id, label }) => (
          <Link
            key={id}
            href={`#${id}`}
            onClick={e => handleScroll(e, id)}
            className={`group relative text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white text-sm font-medium transition-colors duration-200 ${
              activeSection === id ? 'text-primary dark:text-white' : ''
            }`}
          >
            <div className="relative">
              <span className="[writing-mode:vertical-lr] rotate-180 inline-block pb-2 group-hover:border-b-2 group-hover:border-black dark:group-hover:border-white">
                {label}
              </span>
              {activeSection === id && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[1px] h-full bg-primary dark:bg-white transform rotate-90" />
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-auto">
        <SocialLinks />
        <button
          onClick={toggleTheme}
          className="rounded-md text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
