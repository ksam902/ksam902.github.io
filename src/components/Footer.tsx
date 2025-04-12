import Link from 'next/link';
import SocialLinks from './SocialLinks';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="pt-8 text-center text-gray-400 text-sm">
          <p>© {currentYear} Kyle Samson. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
