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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    setIsMobileMenuOpen(false);
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

  // Close mobile menu when screen size changes to md or larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Mobile Hamburger Menu
  const MobileMenu = () => (
    <>
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-6 right-6 z-50 p-2 rounded-md bg-white/90 dark:bg-secondary/90 shadow-md"
        aria-label="Toggle mobile menu"
      >
        {!isMobileMenuOpen ? (
          <svg
            className="w-6 h-6 text-gray-600 dark:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-gray-600 dark:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-white/95 dark:bg-secondary/95 backdrop-blur-md z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <div className="w-16 h-16 mb-8">
            <Image
              src="/svgs/react.svg"
              alt="Logo"
              width={64}
              height={64}
              className="w-full h-full"
            />
          </div>

          {sections.map(({ id, label }) => (
            <Link
              key={id}
              href={`#${id}`}
              onClick={e => handleScroll(e, id)}
              className={`text-xl font-medium px-4 py-2 relative ${
                activeSection === id
                  ? 'text-primary dark:text-white'
                  : 'text-gray-600 dark:text-gray-300'
              } group`}
            >
              {label}
              <div
                className={`absolute left-0 bottom-1 h-[1px] bg-black dark:bg-white transition-all duration-300 ${
                  activeSection === id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              ></div>
            </Link>
          ))}

          <div className="mt-8 flex flex-col items-center space-y-6">
            <SocialLinks />
            <button
              onClick={toggleTheme}
              className="pt-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        </div>
      </div>
    </>
  );

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <nav className="hidden md:flex fixed left-0 top-0 h-full w-24 bg-white/90 backdrop-blur-md z-50 border-r border-gray-200 flex-col items-center py-8">
      <div ref={logoRef} className="w-12 h-12 mb-16">
        <Image src="/avatar2.webp" alt="Logo" width={60} height={60} className="w-full h-full" />
      </div>

      <div className="flex flex-col items-center space-y-12">
        {sections.map(({ id, label }) => (
          <Link
            key={id}
            href={`#${id}`}
            onClick={e => handleScroll(e, id)}
            className={`group relative text-gray-600 hover:text-primary text-sm font-medium transition-colors duration-200 ${
              activeSection === id ? 'text-primary' : ''
            }`}
          >
            <div className="relative">
              <span className="[writing-mode:vertical-lr] rotate-180 inline-block">{label}</span>
              <div
                className={`absolute inset-0 flex items-center justify-center pointer-events-none ${
                  activeSection === id ? 'after:h-full' : 'after:h-0 group-hover:after:h-full'
                } after:w-[1px] after:bg-black dark:after:bg-white after:absolute after:left-1/2 after:top-0 after:transition-all after:duration-300 ${
                  activeSection === id ? '' : 'after:origin-top'
                }`}
              ></div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-4">
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

  return (
    <>
      <MobileMenu />
      <DesktopSidebar />
    </>
  );
};

export default Navbar;
