import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Programs', 'Events', 'Impact', 'Community', 'Join', 'Partners', 'Contact', 'Blog'];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-15 md:py-3 flex items-center justify-between transition-all duration-400 ${
        scrolled || isOpen
          ? 'bg-[#0d1f15]/98 backdrop-blur-xl border-b border-[#4a8c5c]/20' 
          : 'bg-gradient-to-b from-[#0d1f15]/95 to-transparent'
      }`}>
        <Link to="/" className="font-display text-[1.6rem] font-black text-mint tracking-tight z-50 no-underline">
          Eco<span className="text-gold italic">Verse</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-9 list-none items-center">
          {navItems.map((item) => (
            <li key={item}>
              {item === 'Blog' ? (
                <Link 
                  to="/blog"
                  className="text-gold no-underline text-[0.82rem] font-black tracking-widest uppercase relative transition-all duration-300 hover:text-white bg-gold/10 px-4 py-2 rounded-xl hover:bg-gold/20"
                >
                  {item}
                </Link>
              ) : (
                <a 
                  href={`#${item.toLowerCase().replace(' ', '')}`}
                  className="text-[#f5f0e8]/75 no-underline text-[0.82rem] font-medium tracking-wide uppercase relative transition-colors duration-300 hover:text-mint after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-sage after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a href="#donate" className="hidden sm:block">
            <button className="px-8 py-3 bg-fern border-none rounded-full text-white font-sans text-[0.82rem] font-bold tracking-widest cursor-pointer transition-all duration-300 hover:bg-sage hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(74,140,92,0.4)] uppercase">
              Donate
            </button>
          </a>

          {/* Hamburger Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 z-50 p-2"
          >
            <div className={`w-6 h-0.5 bg-mint transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-mint transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-mint transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-[#0d1f15] transition-all duration-500 flex flex-col items-center justify-center gap-8 ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <ul className="list-none flex flex-col items-center gap-6 p-0 m-0">
          {navItems.map((item) => (
            <li key={item} className="reveal-stagger">
              {item === 'Blog' ? (
                <Link 
                  to="/blog"
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-display font-black text-gold hover:text-white transition-colors uppercase tracking-widest"
                >
                  {item}
                </Link>
              ) : (
                <a 
                  href={`#${item.toLowerCase().replace(' ', '')}`}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-display font-black text-white hover:text-mint transition-colors uppercase tracking-widest"
                >
                  {item}
                </a>
              )}
            </li>
          ))}
          <li className="mt-4">
            <a href="#donate" onClick={() => setIsOpen(false)}>
              <button className="px-12 py-4 bg-fern rounded-full text-white font-bold tracking-widest uppercase">
                Donate Now
              </button>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
