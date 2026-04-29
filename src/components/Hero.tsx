import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroBgImage from '../image/haathi3.png';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <motion.div 
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(13,31,21,0.55) 0%, rgba(13,31,21,0.05) 45%, rgba(13,31,21,0.75) 100%), url(${heroBgImage})` }}
      ></motion.div>

      {/* Heading — top of screen, clear of elephants */}
      <motion.div
        className="relative z-10 text-center w-full px-6 pt-56"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <h1 className="font-display text-[clamp(2.6rem,6vw,5rem)] font-black leading-[1] tracking-tight text-white mb-0 drop-shadow-lg">
          Restore the&nbsp;<em className="text-sage italic">Living</em>
          <span className="block text-mint mt-1">Earth</span>
        </h1>
      </motion.div>

      {/* Buttons — pinned to bottom, below the elephant scene */}
      <motion.div
        className="absolute bottom-7 left-0 right-0 z-10 flex gap-4 justify-center flex-wrap px-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      >
        <a href="#programs" className="no-underline">
          <button className="px-9 py-4 bg-fern text-white border-none rounded-full font-sans text-[0.92rem] font-medium cursor-pointer transition-all duration-300 relative overflow-hidden group hover:bg-moss hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(45,90,61,0.5)]">
            <span className="relative z-10">Explore Programs</span>
            <div className="absolute top-1/2 left-1/2 w-0 h-0 bg-white/15 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-600 group-hover:w-[300px] group-hover:h-[300px]"></div>
          </button>
        </a>

        <Link to="/blog" className="no-underline">
          <button className="px-9 py-4 bg-transparent text-cream border border-cream/35 rounded-full font-sans text-[0.92rem] cursor-pointer transition-all duration-300 hover:border-sage hover:text-mint hover:bg-fern/10">
            Our Stories
          </button>
        </Link>
      </motion.div>
    </section>
  );
}
