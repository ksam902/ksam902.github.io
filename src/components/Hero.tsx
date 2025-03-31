import Link from 'next/link';
import SocialLinks from './SocialLinks';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
            <span className="block">Hi, I&apos;m Kyle</span>
            <span className="block mt-3 text-primary">Development Tech Lead</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto sm:mx-0">
            I specialize in building high-performance, scalable web applications using modern technologies.
            With expertise in frontend and backend development, I lead teams to deliver exceptional digital experiences.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <Link 
              href="/#projects" 
              className="rounded-md bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              View Projects
            </Link>
            <Link 
              href="/#contact" 
              className="rounded-md bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700"
            >
              Contact Me
            </Link>
          </div>
          <div className="mt-12">
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 