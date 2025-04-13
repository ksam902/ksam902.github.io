import Navbar from '@/src/components/Navbar';
import Hero from '@/src/components/Hero';
import TechStack from '@/src/components/TechStack';
import Projects from '@/src/components/Projects';
import Footer from '@/src/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <Hero />
        <TechStack />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
