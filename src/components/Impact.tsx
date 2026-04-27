export default function Impact() {
  const cards = [
    { label: 'Trees Planted', val: '2.4M', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80', growth: '+12%', color: 'text-forest', desc: 'Active afforestation sites' },
    { label: 'Water Restored', val: '380+', img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80', growth: '+5%', color: 'text-forest', desc: 'Rivers and lakes desilted' },
    { label: 'Impact Offset', val: '15KT', img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80', growth: '+8%', color: 'text-forest', desc: 'E-waste and plastic diverted' },
    { label: 'Active Guardians', val: '50K', img: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=400&q=80', growth: '+15%', color: 'text-forest', desc: 'Verified on-ground volunteers' },
  ];

  return (
    <section id="impact" className="py-16 px-6 md:px-20 bg-[#0a160f] relative overflow-hidden">
      {/* Dynamic Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(74,140,92,0.08)_0%,transparent_50%)] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-16 reveal">
          <div className="text-[0.7rem] tracking-[4px] uppercase text-sage font-medium mb-4 flex items-center justify-center gap-4 before:content-[''] before:inline-block before:w-[36px] before:h-px before:bg-sage/30 after:content-[''] after:inline-block after:w-[36px] after:h-px after:bg-sage/30">
            Real Impact
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[1] tracking-[-2px] mb-6">
            Measurable <em className="text-sage italic font-normal">Restoration</em>
          </h2>
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Stats Cards: Narrower 4-column grid to match Partner card size */}
          <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 reveal">
            {cards.map((card, i) => (
              <div key={i} className="group p-8 bg-[#8ccca4] border border-[#0a160f]/10 rounded-[40px] transition-all duration-500 hover:bg-white hover:border-sage/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-24 h-16 overflow-hidden rounded-xl border border-[#0a160f]/10 group-hover:scale-105 transition-all duration-500 shadow-sm">
                    <img src={card.img} alt={card.label} className="w-full h-full object-cover" />
                  </div>
                  <div className="px-3 py-1 bg-forest/10 text-forest text-[0.6rem] font-black rounded-full border border-forest/20 shadow-sm">
                    {card.growth}
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="text-4xl font-black mb-1 tracking-tight text-[#0a160f]">
                    {card.val}
                  </div>
                  <div className="text-[#0a160f] text-sm font-bold mb-1 uppercase tracking-wider">{card.label}</div>
                  <div className="text-[#0a160f]/50 text-[0.75rem] leading-tight font-medium">{card.desc}</div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Second Row: Social, Network, Transparency & Audit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch reveal">
          {/* Card 1: Social Impact */}
          <div className="bg-[#8ccca4] border border-[#0a160f]/10 p-8 rounded-[48px] relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col transition-all duration-500 hover:bg-white hover:border-sage/50">
            <div className="relative z-10">
              <div className="text-forest text-[0.6rem] uppercase tracking-[3px] font-bold mb-4">Social Impact</div>
              <div className="text-4xl font-black text-[#0a160f] mb-4">1.2M+</div>
              <div className="text-[#0a160f] text-sm font-bold mb-4 uppercase tracking-wider">Lives Benefitted</div>
              <p className="text-[#0a160f]/60 text-[0.85rem] leading-relaxed font-medium">
                Clean water access, local green jobs, and environmental education across 1,200 neighbourhoods.
              </p>
            </div>
            <div className="absolute bottom-[-10px] right-[-10px] text-8xl opacity-[0.03] grayscale pointer-events-none">🌍</div>
          </div>

          {/* Card 2: Guardian Network */}
          <div className="bg-[#8ccca4] border border-[#0a160f]/10 p-8 rounded-[48px] relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col transition-all duration-500 hover:bg-white hover:border-sage/50">
            <div className="relative z-10">
              <div className="text-forest text-[0.6rem] uppercase tracking-[3px] font-bold mb-4">Guardian Network</div>
              <div className="text-4xl font-black text-[#0a160f] mb-6">12K+</div>
              <div className="flex -space-x-3 mb-6">
                {[1,2,3,4].map(n => (
                  <div key={n} className="w-10 h-10 rounded-full border-2 border-[#e5ede5] bg-[#0a160f]/10 flex items-center justify-center text-xs shadow-sm">👤</div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-[#e5ede5] bg-sage text-white flex items-center justify-center text-[0.6rem] font-bold shadow-sm">+50</div>
              </div>
              <p className="text-[#0a160f]/60 text-[0.85rem] leading-relaxed font-medium">
                Verified on-ground protectors committed to long-term site maintenance.
              </p>
            </div>
          </div>

          {/* Card 3: Blockchain Transparency */}
          <div className="bg-[#8ccca4] border border-[#0a160f]/10 p-8 rounded-[48px] relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col transition-all duration-500 hover:bg-white hover:border-sage/50">
            <div className="relative z-10">
              <div className="text-forest text-[0.6rem] uppercase tracking-[3px] font-bold mb-4">Transparency</div>
              <div className="text-4xl font-black text-[#0a160f] mb-4">100%</div>
              <div className="text-[#0a160f] text-sm font-bold mb-4 uppercase tracking-wider">Blockchain Audited</div>
              <p className="text-[#0a160f]/60 text-[0.85rem] leading-relaxed font-medium">
                Every metric is immutably tracked to ensure maximum corporate accountability.
              </p>
            </div>
            <div className="absolute top-4 right-4 w-12 h-12 bg-forest/5 rounded-full flex items-center justify-center text-xl">⛓️</div>
          </div>

          {/* Card 4: Spotlight & Audit */}
          <div className="bg-forest p-8 rounded-[48px] text-white relative overflow-hidden group shadow-xl flex flex-col">
            <div className="relative z-10 h-full flex flex-col">
              <div className="text-[0.6rem] font-black uppercase tracking-[3px] mb-4 opacity-60">Monthly Audit</div>
              <h4 className="font-display text-xl font-black leading-tight mb-6">
                Q1 Sequestration increased by <span className="text-sage">12%</span>.
              </h4>
              <button className="mt-auto w-full py-4 bg-white text-forest rounded-2xl text-[0.65rem] font-bold uppercase tracking-widest hover:bg-sage hover:text-dark transition-all flex items-center justify-center gap-3 shadow-xl">
                <span>Audit</span>
                <span className="text-lg">↓</span>
              </button>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
