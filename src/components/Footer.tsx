export default function Footer() {
  return (
    <>
      <div className="bg-fern py-[50px] px-6 md:px-[60px] flex flex-col md:flex-row items-center justify-between gap-10">
        <div>
          <h3 className="font-display text-[1.6rem] text-white mb-1.5">Stay Rooted with EcoVerse</h3>
          <p className="text-[0.88rem] text-white/70">Monthly impact updates, event alerts, and eco-tips — straight to your inbox.</p>
        </div>
        <div className="flex gap-2 shrink-0 w-full md:w-auto">
          <input 
            type="email" 
            placeholder="your@email.com" 
            className="px-[22px] py-[13px] bg-white/15 border border-white/30 rounded-full text-white font-sans text-[0.88rem] outline-none w-full md:w-[280px] transition-colors focus:bg-white/20 placeholder:text-white/55" 
          />
          <button className="px-7 py-[13px] bg-dark text-mint border-none rounded-full font-sans text-[0.88rem] font-medium cursor-pointer transition-colors hover:bg-forest hover:text-white shrink-0">
            Subscribe 🌿
          </button>
        </div>
      </div>
      
      <footer className="bg-[#060f08] pt-20 px-6 pb-10 md:px-[60px] border-t border-fern/15">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-[60px] mb-[60px]">
          <div>
            <div className="font-display text-[1.8rem] font-black text-mint mb-4">
              Eco<span className="text-gold italic">Verse</span>
            </div>
            <p className="text-[0.84rem] text-cream/45 leading-[1.7] max-w-[280px] mb-7">
              Every action — no matter how small — ripples outward into the living world. Start yours today.
            </p>
            <div className="flex gap-3">
              {['𝕏', 'in', 'ig', 'yt'].map(social => (
                <a key={social} href="#" className="w-[38px] h-[38px] bg-fern/10 border border-fern/20 rounded-full flex items-center justify-center text-[0.9rem] cursor-pointer transition-all duration-300 text-cream hover:bg-fern hover:border-fern hover:-translate-y-1">
                  {social}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="font-mono text-[0.7rem] tracking-[2px] uppercase text-sage mb-5">Programs</h5>
            <ul className="flex flex-col gap-2.5">
              {['Tree Plantation', 'River Restoration', 'Lake Revival', 'E-Waste Drive', 'Community Recycling'].map(link => (
                <li key={link}><a href="#" className="text-cream/50 no-underline text-[0.85rem] transition-colors hover:text-mint">{link}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="font-mono text-[0.7rem] tracking-[2px] uppercase text-sage mb-5">Community</h5>
            <ul className="flex flex-col gap-2.5">
              {['Join as Volunteer', 'Cycling Events', 'School Outreach', 'Partner NGOs', 'Corporate CSR'].map(link => (
                <li key={link}><a href="#" className="text-cream/50 no-underline text-[0.85rem] transition-colors hover:text-mint">{link}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="font-mono text-[0.7rem] tracking-[2px] uppercase text-sage mb-5">Organisation</h5>
            <ul className="flex flex-col gap-2.5">
              {['About Us', 'Impact Reports', 'Press & Media', 'Careers', 'Contact'].map(link => (
                <li key={link}><a href="#" className="text-cream/50 no-underline text-[0.85rem] transition-colors hover:text-mint">{link}</a></li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-fern/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[0.78rem] text-cream/30">
          <span>© 2026 EcoVerse Foundation. All rights reserved.</span>
          <div className="flex items-center gap-2 text-sage">
            🌍 Carbon-neutral website · Powered by renewable energy
          </div>
        </div>
      </footer>
    </>
  );
}
