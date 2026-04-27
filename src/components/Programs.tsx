import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import plantationBefore from '../image/plantationnew.jpg';
import plantationAfter from '../image/plantation_after_v3.png';
import riverBefore from '../image/river_before.jpg';
import riverAfter from '../image/river_after.png';
import beachBefore from '../image/before_beach.png';
import beachAfter from '../image/beach3.jpg';

export default function Programs() {
  const [dynamicPrograms, setDynamicPrograms] = useState<any[]>([]);

  const featuredPrograms = [
    {
      tag: 'Plantation Drive', 
      name: 'Million Tree Initiative',
      desc: "Restoring earth's green lungs through massive afforestation. Join us in planting hope, one sapling at a time, for a cooler, greener future.",
      isSlider: true,
      before: plantationBefore,
      after: plantationAfter,
      icon: '🌳',
    },
    {
      tag: 'River Restoration', 
      name: 'Living Rivers Project',
      desc: "Revitalizing urban waterways through natural filtration and debris removal. Witness the return of biodiversity to our local rivers.",
      isSlider: true,
      before: riverBefore,
      after: riverAfter,
      icon: '💧',
      afterPos: 'bg-[center_22%]'
    },
    {
      tag: 'Beach Cleanup', 
      name: 'Coastal Guard Project',
      desc: "Clearing our shores of plastic pollution and restoring marine habitats. Join our weekly drives to keep our oceans healthy and clean.",
      isSlider: true,
      before: beachBefore,
      after: beachAfter,
      icon: '🏖️',
      afterPos: 'bg-center'
    },
  ];

  useEffect(() => {
    const q = query(collection(db, 'programs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Map Firebase fields to ProgramCard fields
        name: doc.data().title,
        tag: doc.data().description,
        before: doc.data().initialImg,
        after: doc.data().finalImg,
        isSlider: true, // New programs are sliders by default
      }));
      setDynamicPrograms(docs);
    });
    return () => unsubscribe();
  }, []);

  const allPrograms = [...featuredPrograms, ...dynamicPrograms];

  return (
    <section id="programs" className="py-16 px-6 md:px-20 bg-[#0a160f] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-moss/10 rounded-full blur-[110px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-forest/20 rounded-full blur-[90px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      <div className="mb-12 reveal text-center flex flex-col items-center">
        <div className="text-[0.7rem] tracking-[4px] uppercase text-sage font-medium mb-4 flex items-center gap-4 before:content-[''] before:inline-block before:w-[36px] before:h-px before:bg-sage/30 after:content-[''] after:inline-block after:w-[36px] after:h-px after:bg-sage/30">
          Our Initiatives
        </div>
        <h2 className="font-display text-[clamp(2.2rem,5.5vw,4rem)] font-black leading-[1.05] tracking-[-1.5px] mb-5">
          Healing the<br/>
          <em className="text-sage italic font-normal">heart of our planet</em>
        </h2>
      </div> 

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {allPrograms.map((prog, i) => (
          <ProgramCard key={prog.id || i} prog={prog} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProgramCard({ prog, index }: { prog: any, index: number }) {
  const [sliderPos, setSliderPos] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsAnimating(true);
        setTimeout(() => {
          setSliderPos(99); // Stop at 99% to keep the slider line visible
          setTimeout(() => setIsAnimating(false), 3500);
        }, 400 + (index * 300));
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className="program-card relative h-[520px] overflow-hidden group reveal cursor-pointer rounded-[48px] border border-white/5 max-w-[480px] mx-auto w-full"
    >
      {/* Background Image / Slider */}
      <div className="absolute inset-0 select-none overflow-hidden group/slider">
        {/* Clean Image (Base) */}
        <div 
          className={`absolute inset-0 bg-cover ${prog.afterPos || 'bg-center'}`}
          style={{ backgroundImage: `url('${prog.after}')` }}
        ></div>
        
        {/* Dirty Image (Overlay - Clipped) */}
        <div 
          className={`absolute inset-0 bg-cover bg-center border-r-[3px] border-sage shadow-[10px_0_40px_rgba(0,0,0,0.6)] z-10 ${isAnimating ? 'transition-all duration-[3500ms] linear' : ''}`}
          style={{ 
            backgroundImage: `url('${prog.before}')`,
            clipPath: `inset(0 0 0 ${sliderPos}%)` 
          }}
        ></div>

        {/* Slider Handle (Decorative) */}
        <div 
          className={`absolute top-0 bottom-0 w-1 bg-sage z-20 pointer-events-none transition-opacity duration-300 group-hover/slider:opacity-100 ${isAnimating ? 'transition-all duration-[3500ms] linear' : ''}`}
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-sage rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.4)]">
            <div className="flex gap-1">
              <div className="w-1 h-4 bg-dark/40 rounded-full"></div>
              <div className="w-1 h-4 bg-dark/40 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Hidden Range Input for smooth control */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 appearance-none"
        />

        {/* Labels */}
        <div className="absolute top-6 left-6 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full text-[0.65rem] font-bold uppercase tracking-[2px] text-white/80 z-20 pointer-events-none border border-white/10">Initial</div>
        <div className="absolute top-6 right-6 px-3 py-1.5 bg-sage/60 backdrop-blur-md rounded-full text-[0.65rem] font-bold uppercase tracking-[2px] text-white z-20 pointer-events-none border border-white/20">Restored</div>
      </div>
      
      {/* Gradient Overlays - clipped to restored image area */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent z-20 pointer-events-none ${isAnimating ? 'opacity-0' : 'opacity-80'}`}
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      ></div>

      {/* Content Container - clipped to restored image area */}
      <div 
        className={`absolute inset-0 p-8 md:p-12 flex flex-col justify-end pointer-events-none z-30 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <div className="transform transition-transform duration-500 ease-out group-hover:translate-y-0">
          <div className="flex items-center gap-4 mb-5">
            <span className="text-4xl filter drop-shadow-lg group-hover:scale-125 transition-transform duration-500">{prog.icon}</span>
            <div className="h-px flex-1 bg-white/20"></div>
          </div>
          
          <div className="text-[0.7rem] tracking-[3px] uppercase text-gold font-bold mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
            {prog.tag}
          </div>
          
          <h3 className="font-display text-[1.8rem] md:text-[2.2rem] font-bold text-white mb-4 leading-tight group-hover:text-sage transition-colors duration-300">
            {prog.name}
          </h3>
          
          <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-[150px] group-hover:opacity-100">
            {prog.desc && (
              <p className="text-[0.95rem] text-cream/80 leading-relaxed mb-6 border-l-2 border-sage/40 pl-4">
                {prog.desc}
              </p>
            )}
            <div className="text-[0.8rem] text-sage/80 font-medium tracking-[2px] uppercase flex items-center gap-2">
              <span className="w-8 h-px bg-sage/30"></span>
              Slide to compare
            </div>
          </div>
        </div>
      </div>

      {/* Hover Shine Effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
    </div>
  );
}
