import Navbar from '@/src/components/Navbar';
import Hero from '@/src/components/Hero';
import TechStack from '@/src/components/TechStack';
import Projects from '@/src/components/Projects';
import About from '@/src/components/About';
import SocialLinks from '@/src/components/SocialLinks';

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <SocialLinks />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
      </main>
      <Navbar />
    </div>
  );
}
