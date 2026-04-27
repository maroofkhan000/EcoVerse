import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Image as ImageIcon, Type, PenTool, Flame, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import indiaImg from '../image/india_hq.png';

export default function Blog() {
  const [showEditor, setShowEditor] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="min-h-screen bg-[#f5f0e8] font-sans selection:bg-sage/30">
      {/* Premium Blog Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-forest/10 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <Link 
            to="/"
            className="w-10 h-10 rounded-full flex items-center justify-center text-forest hover:bg-forest/5 transition-all group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div className="h-6 w-px bg-forest/10 hidden md:block"></div>
          <div className="flex flex-col">
            <span className="text-[0.6rem] uppercase tracking-[2px] text-forest/40 font-black">
              {showEditor ? 'Editor Mode' : 'EcoVerse Stories'}
            </span>
            <span className="text-[0.8rem] text-forest font-bold">The Green Narrative</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!showEditor ? (
            <button 
              onClick={() => setShowEditor(true)}
              className="px-6 py-2.5 bg-forest text-white rounded-xl text-[0.75rem] font-bold uppercase tracking-[2px] transition-all hover:bg-[#1a2e23] hover:shadow-xl hover:scale-[1.05] flex items-center gap-2"
            >
              Write Story <PenTool className="w-3 h-3" />
            </button>
          ) : (
            <button className="px-6 py-2.5 bg-sage text-dark rounded-xl text-[0.75rem] font-bold uppercase tracking-[2px] transition-all hover:bg-white hover:shadow-xl hover:scale-[1.05] flex items-center gap-2">
              Write Blog <Send className="w-3 h-3" />
            </button>
          )}
        </div>
      </nav>

      <main className="max-w-[1200px] mx-auto py-12 px-6">
        {showEditor ? (
          <div className="max-w-[900px] mx-auto">
            {/* Metadata & Controls */}
            <div className="flex items-center gap-4 mb-12">
              <select className="bg-white border border-forest/10 rounded-xl px-4 py-2 text-[0.7rem] font-black uppercase tracking-[1px] text-forest outline-none">
                <option>Climate Alert</option>
                <option>Restoration</option>
                <option>Community</option>
              </select>
              <div className="text-[0.7rem] text-forest/30 font-bold uppercase tracking-[1px]">Draft Mode</div>
              <button onClick={() => setShowEditor(false)} className="ml-auto text-[0.6rem] font-black uppercase tracking-[2px] text-forest/40 hover:text-forest transition-colors">Cancel</button>
            </div>

            <textarea
              placeholder="Title of your impact story..."
              className="w-full bg-transparent border-none outline-none text-[clamp(2rem,6vw,4rem)] font-display font-black text-forest placeholder:text-forest/10 resize-none leading-[1.1] tracking-tight mb-8"
              rows={2}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="flex items-center gap-2 mb-8 p-2 bg-white rounded-2xl border border-forest/5 shadow-sm overflow-x-auto">
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 5 }}
                onClick={() => {
                  const newContent = content + '\n## New Heading\n';
                  setContent(newContent);
                }}
                className="flex items-center gap-2 px-4 py-2 text-[0.6rem] font-black uppercase tracking-[2px] text-forest/70 hover:text-forest hover:bg-forest/5 rounded-xl transition-all"
              >
                <Type className="w-4 h-4" /> Heading
              </motion.button>
              
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 5, delay: 0.2 }}
                onClick={() => {
                  const newContent = content + '\n> Your inspiring quote here...\n';
                  setContent(newContent);
                }}
                className="flex items-center gap-2 px-4 py-2 text-[0.6rem] font-black uppercase tracking-[2px] text-forest/70 hover:text-forest hover:bg-forest/5 rounded-xl transition-all"
              >
                <Type className="w-4 h-4" /> Quote
              </motion.button>

              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 5, delay: 0.4 }}
                onClick={() => {
                  const newContent = content + '\n![Image Description](https://source.unsplash.com/featured/?nature)\n';
                  setContent(newContent);
                }}
                className="flex items-center gap-2 px-4 py-2 text-[0.6rem] font-black uppercase tracking-[2px] text-forest/70 hover:text-forest hover:bg-forest/5 rounded-xl transition-all"
              >
                <ImageIcon className="w-4 h-4" /> Add Image
              </motion.button>
            </div>

            <textarea
              placeholder="Tell the world about your green journey..."
              className="w-full bg-transparent border-none outline-none text-[1.2rem] leading-relaxed text-forest/70 placeholder:text-forest/20 resize-none min-h-[400px] font-medium"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        ) : (
          <div className="space-y-24">
            {/* Featured Story View: Left Image, Right Content */}
            <div className="flex flex-col lg:flex-row gap-16 items-center reveal">
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute -inset-4 bg-red-500/10 rounded-[60px] blur-2xl group-hover:bg-red-500/20 transition-all duration-700"></div>
                <div className="relative h-[450px] lg:h-[600px] rounded-[48px] overflow-hidden border border-red-900/20 shadow-2xl">
                  <img 
                    src={indiaImg} 
                    alt="India Heatwave — Scorching Summer 2026" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/70 via-orange-900/20 to-transparent"></div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-red-600 text-white rounded-full text-[0.6rem] font-black uppercase tracking-[2px]">
                      <Flame className="w-3 h-3 text-orange-300" /> Climate Emergency
                    </span>
                    <span className="text-[0.6rem] text-forest/40 font-bold uppercase tracking-[2px] flex items-center gap-2">
                      <Clock className="w-3 h-3" /> 4 Min Read • Apr 24, 2026
                    </span>
                  </div>
                  <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-black leading-[1.05] tracking-[-2px] text-forest">
                    India's Hotbox Crisis: <em className="not-italic font-black" style={{ color: '#dc2626' }}>95</em> of 100 World's Hottest Cities Are Here
                  </h1>
                </div>

                <div className="space-y-6 text-forest/80 text-[1.05rem] leading-relaxed font-medium">
                  <p>
                    India is at the epicentre of a global heat surge. According to real-time data from AQI.in recorded at 5:00 PM on April 24, 2026, an overwhelming <strong className="text-red-600 font-black">95 out of the world's 100 hottest cities</strong> are located within the subcontinent — a staggering statistic that underscores the severity of the ongoing heatwave.
                  </p>
                  <p className="text-[0.95rem] opacity-80">
                    From central India to the Indo-Gangetic plains, temperatures have soared past <strong>40°C</strong> in dozens of cities, with several locations inching closer to <strong>45°C</strong>. States such as Maharashtra, Telangana, Madhya Pradesh, Uttar Pradesh and Odisha are among the worst affected.
                  </p>
                  <p className="text-[0.9rem] opacity-70">
                    Meteorologists attribute the surge to persistent dry winds, clear skies, and delayed pre-monsoon activity. The India Meteorological Department (IMD) has issued heatwave warnings across several regions — urban heat island effects and shrinking green cover are amplifying the impact.
                  </p>

                  {/* Pull quote */}
                  <blockquote className="border-l-4 border-red-500 pl-5 py-1">
                    <p className="text-forest font-semibold italic text-[1rem]">
                      "For now, India remains the hottest place on Earth — an extraordinary statistic that reflects the immediacy of the current heatwave and the growing challenge of extreme weather in a warming world."
                    </p>
                    <cite className="text-[0.7rem] text-forest/40 font-bold uppercase tracking-[1px] not-italic">— India Today Science Desk, April 24, 2026</cite>
                  </blockquote>
                </div>

                <div className="flex items-center gap-6 pt-8 border-t border-forest/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-xl">🌡️</div>
                    <div>
                      <div className="text-[0.7rem] font-black text-forest uppercase tracking-[1px]">India Today Science Desk</div>
                      <div className="text-[0.6rem] text-forest/40 font-bold uppercase tracking-[1px]">Climate & Science Reporting</div>
                    </div>
                  </div>
                  <a
                    href="https://www.indiatoday.in/science/story/india-turns-into-a-hotbox-95-out-of-100-worlds-hottest-cities-today-are-in-india-2901125-2026-04-24"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto px-5 py-2.5 rounded-xl border border-forest/10 text-[0.65rem] font-black uppercase tracking-[2px] text-forest hover:bg-forest hover:text-white transition-all"
                  >
                    Read Full Article →
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Dynamic Background Ornament */}
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-sage/5 rounded-full blur-[100px] pointer-events-none translate-x-1/3 translate-y-1/3"></div>
      <div className="fixed top-1/2 left-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
}
