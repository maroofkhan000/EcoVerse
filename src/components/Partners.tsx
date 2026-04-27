export default function Partners() {
  const currentPartners = [
    { name: 'EcoStream Corp', type: 'Technology Partner', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=120&h=120&q=80' },
    { name: 'GreenBank India', type: 'Financial Partner', logo: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=120&h=120&q=80' },
    { name: 'UrbanRoots', type: 'Logistics Partner', logo: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=120&h=120&q=80' },
    { name: 'BioSphere Tech', type: 'Auditing Partner', logo: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=120&h=120&q=80' },
    { name: 'TerraFoundation', type: 'Impact Partner', logo: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=120&h=120&q=80' },
    { name: 'AquaShield', type: 'Resource Partner', logo: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=120&h=120&q=80' },
  ];

  const benefits = [
    { title: 'CSR Compliance', desc: 'Fully audited projects that meet all corporate social responsibility mandates and environmental standards.' },
  ];

  return (
    <section id="partners" className="py-10 px-6 md:px-20 bg-[#21372a] relative overflow-hidden">
      {/* Vibrant Multi-Colored Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sage/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-river/3 rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-6 reveal">
          <div className="text-[0.7rem] tracking-[4px] uppercase text-sage font-medium mb-3 flex items-center justify-center gap-4 before:content-[''] before:inline-block before:w-[36px] before:h-px before:bg-sage/30 after:content-[''] after:inline-block after:w-[36px] after:h-px after:bg-sage/30">
            Collaborations
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.05] tracking-[-2px] mb-2">
            Powering Change <em className="text-sage italic font-normal">Together</em>
          </h2>
        </div>

        {/* Logo Wall */}
        <div className="mb-16 reveal">
          <div className="text-center text-cream/20 text-[0.65rem] uppercase tracking-[3px] font-bold mb-6">Trusted By Industry Leaders</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { ...currentPartners[0], glow: 'group-hover:shadow-[0_0_40px_rgba(74,140,92,0.15)]', border: 'hover:border-sage/40' },
              { ...currentPartners[1], glow: 'group-hover:shadow-[0_0_40px_rgba(196,163,115,0.15)]', border: 'hover:border-gold/40' },
              { ...currentPartners[2], glow: 'group-hover:shadow-[0_0_40px_rgba(74,140,92,0.15)]', border: 'hover:border-fern/40' },
              { ...currentPartners[3], glow: 'group-hover:shadow-[0_0_40px_rgba(78,142,168,0.15)]', border: 'hover:border-river/40' },
              { ...currentPartners[4], glow: 'group-hover:shadow-[0_0_40px_rgba(196,163,115,0.15)]', border: 'hover:border-gold/40' },
              { ...currentPartners[5], glow: 'group-hover:shadow-[0_0_40px_rgba(78,142,168,0.15)]', border: 'hover:border-river/40' },
            ].map((partner, i) => (
              <div key={i} className={`group p-6 bg-[#7db88a] border border-[#0a160f]/10 rounded-[32px] flex flex-col items-center justify-center text-center transition-all duration-500 hover:bg-white hover:border-sage/50 ${partner.border} ${partner.glow} hover:-translate-y-2 shadow-[0_15px_40px_rgba(0,0,0,0.05)]`}>
                <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border border-[#0a160f]/10 transition-all duration-500 group-hover:scale-110 shadow-xl">
                  <img src={partner.logo} alt={partner.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-[#0a160f] font-display font-bold text-sm mb-1 transition-opacity leading-tight">{partner.name}</div>
                <div className="text-[0.55rem] text-forest font-bold uppercase tracking-[1.2px]">{partner.type}</div>
              </div>
            ))}
          </div>
        </div>


        <div className="reveal mt-16">
          {/* Wide Landscape CTA Card */}
          <div className="max-w-[1000px] mx-auto">
            <div className="px-8 md:px-12 py-0 md:py-0 bg-[#e5ede5] border border-[#0a160f]/10 rounded-[60px] relative overflow-hidden group shadow-[0_30px_100px_rgba(0,0,0,0.1)] transition-all duration-500 hover:shadow-[0_40px_120px_rgba(0,0,0,0.15)]">
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="w-full h-48 md:h-[230px] rounded-[40px] overflow-hidden border border-[#0a160f]/10 shadow-inner order-2 md:order-1 my-4">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
                    alt="Ready to Lead" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                <div className="text-center md:text-left order-1 md:order-2 py-4">
                  <h4 className="font-display text-2xl md:text-3xl font-black text-[#0a160f] mb-4 leading-tight">Ready to lead the way?</h4>
                  <p className="text-[#0a160f]/60 text-[0.9rem] leading-relaxed mb-6 font-medium max-w-[360px]">
                    Scale your environmental impact through our verified projects. Let's design a custom restoration strategy for your organization.
                  </p>
                  
                  <button className="w-full md:w-auto px-10 py-4 bg-[#0a160f] text-white font-bold rounded-2xl text-[0.8rem] uppercase tracking-[2px] transition-all duration-300 hover:bg-[#1a2e23] hover:scale-[1.02] hover:shadow-2xl flex items-center justify-center gap-3">
                    <span>Become a Partner</span>
                    <span className="text-xl">→</span>
                  </button>
                </div>
              </div>
              
              <div className="absolute top-[-40px] right-[-40px] w-80 h-80 bg-forest/5 rounded-full pointer-events-none group-hover:scale-110 transition-transform"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
