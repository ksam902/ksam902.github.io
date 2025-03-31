import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/90 dark:bg-secondary/90 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              Kyle Samson
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
            <Link href="/#about" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white px-3 py-2 text-sm font-medium">
              About
            </Link>
            <Link href="/#tech-stack" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white px-3 py-2 text-sm font-medium">
              Tech Stack
            </Link>
            <Link href="/#projects" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white px-3 py-2 text-sm font-medium">
              Projects
            </Link>
            <Link href="/#contact" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white px-3 py-2 text-sm font-medium">
              Contact
            </Link>
          </div>
          <div className="sm:hidden flex items-center">
            {/* Mobile menu button */}
            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 