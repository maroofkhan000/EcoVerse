export default function Journey() {
  const stats = [
    {
      value: '2.4M+',
      label: 'Trees Planted',
      desc: 'Restoring native forests and urban green lungs across 12 states.',
      icon: '🌳',
      color: 'text-fern'
    },
    {
      value: '6,200T',
      label: 'Impact Diverted',
      desc: 'Plastic, pollutants, and hazardous waste prevented from entering ecosystems.',
      icon: '♻️',
      color: 'text-gold'
    },
    {
      value: '380+',
      label: 'Water Bodies Restored',
      desc: 'Rivers and lakes rejuvenated through desilting and bioremediation.',
      icon: '💧',
      color: 'text-river'
    },
    {
      value: '50K+',
      label: 'Active Guardians',
      desc: 'A growing community of dedicated volunteers and environmental advocates.',
      icon: '🤝',
      color: 'text-sage'
    }
  ];

  return (
    <section id="journey" className="py-32 px-6 md:px-20 bg-[#08120a] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(74,140,92,0.08)_0%,transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="reveal-left">
            <div className="text-[0.7rem] tracking-[4px] uppercase text-sage font-medium mb-4 flex items-center gap-4 before:content-[''] before:inline-block before:w-[36px] before:h-px before:bg-sage/30">
              Our Impact
            </div>
            <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[1] tracking-[-2px]">
              A journey of<br/>
              <em className="text-sage italic font-normal">tangible change</em>
            </h2>
          </div>
          <div className="max-w-[400px] text-cream/40 text-[0.95rem] leading-relaxed reveal-right">
            Every number represents a story of restoration. We don't just set goals; we build the infrastructure for long-term environmental resilience.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="group relative reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex flex-col">
                <div className="text-[2.5rem] mb-6 transform group-hover:scale-110 transition-transform duration-500 origin-left">
                  {stat.icon}
                </div>
                
                <div className={`font-display text-[3.5rem] md:text-[4rem] font-black leading-none mb-2 tracking-tighter ${stat.color} transition-all duration-500 group-hover:translate-x-2`}>
                  {stat.value}
                </div>
                
                <div className="text-white font-bold text-lg mb-4 tracking-tight uppercase">
                  {stat.label}
                </div>
                
                <p className="text-cream/40 text-[0.88rem] leading-relaxed max-w-[240px]">
                  {stat.desc}
                </p>

                {/* Subtle progress line */}
                <div className="mt-8 h-px w-full bg-white/5 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-sage/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out`}></div>
                </div>
              </div>

              {/* Hover highlight */}
              <div className="absolute -inset-8 bg-white/[0.02] rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom Achievement Ribbon */}
        <div className="mt-32 p-12 bg-white/[0.03] border border-white/5 rounded-[60px] flex flex-col md:flex-row items-center justify-between gap-10 reveal">
          <div className="flex items-center gap-8">
            <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center text-4xl border border-sage/20">
              🏆
            </div>
            <div>
              <div className="text-white font-bold text-xl mb-1">Global Green Award 2025</div>
              <div className="text-cream/40 text-sm">Recognized for excellence in community-led restoration.</div>
            </div>
          </div>
          <div className="h-px w-full md:w-20 md:h-px bg-white/10"></div>
          <div className="flex items-center gap-8">
            <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center text-4xl border border-gold/20">
              💎
            </div>
            <div>
              <div className="text-white font-bold text-xl mb-1">UN SDG Accredited</div>
              <div className="text-cream/40 text-sm">Official partner for Clean Water & Life on Land.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
