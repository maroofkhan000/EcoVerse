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
import EventSignup from './components/EventSignup';

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
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    
    const observeReveals = (root: HTMLElement | Document = document) => {
      const reveals = root.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      reveals.forEach(r => io.observe(r));
    };

    // Initial scan
    observeReveals();

    // MutationObserver to catch dynamic elements added later (like Firestore events or blog posts)
    const mo = new MutationObserver((mutations) => {
      mutations.forEach(m => {
        m.addedNodes.forEach(node => {
          if (node instanceof HTMLElement) {
            // Check if the node itself should be revealed
            if (node.classList.contains('reveal') || 
                node.classList.contains('reveal-left') || 
                node.classList.contains('reveal-right')) {
              io.observe(node);
            }
            // Also check all its children
            observeReveals(node);
          }
        });
      });
    });

    mo.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/volunteer" element={<VolunteerSignup />} />
        <Route path="/event/:id" element={<EventSignup />} />
      </Routes>
    </>
  );
}

export default App;
