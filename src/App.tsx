import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import FloatingLeaves from './components/FloatingLeaves';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Programs from './components/Programs';
import Engagement from './components/Engagement';
import Impact from './components/Impact';
import Community from './components/Community';
import JoinMission from './components/JoinMission';
import Donate from './components/Donate';
import Partners from './components/Partners';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Blog from './components/Blog';
import Admin from './components/Admin';
import VolunteerSignup from './components/VolunteerSignup';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Landing() {
  return (
    <>
      <FloatingLeaves />
      <Navbar />
      <main>
        <Hero />
        <Programs />
        <Engagement />
        <Impact />
        <Community />
        <JoinMission />
        <Donate />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Small delay to ensure DOM is ready after route change
    const timer = setTimeout(() => {
      const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
      
      reveals.forEach(r => io.observe(r));
    }, 100);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/volunteer" element={<VolunteerSignup />} />
      </Routes>
    </>
  );
}

export default App;
