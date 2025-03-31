import Link from 'next/link';
import SocialLinks from './SocialLinks';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-bold text-white">
              Kyle Samson
            </Link>
            <p className="mt-4 text-gray-300 max-w-md">
              Development Tech Lead specializing in modern web technologies.
              Building high-performance, scalable applications.
            </p>
            <div className="mt-6">
              <SocialLinks />
            </div>
          </div>

          <div>
            <h3 className="text-base font-medium">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/#about" className="text-gray-300 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#tech-stack" className="text-gray-300 hover:text-white">
                  Tech Stack
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="text-gray-300 hover:text-white">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-medium">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-300">
                <span>kyle@example.com</span>
              </li>
              <li className="text-gray-300">
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {currentYear} Kyle Samson. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 