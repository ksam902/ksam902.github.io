import Navbar from '@/src/components/Navbar';
import Hero from '@/src/components/Hero';
import About from '@/src/components/About';
import TechStack from '@/src/components/TechStack';
import Projects from '@/src/components/Projects';
// import Contact from "@/src/components/Contact";
import Footer from '@/src/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        {/* <Contact /> */}
      </main>
      <Footer />
    </div>
  );
}
