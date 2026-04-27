export default function Restoration() {
  return (
    <section id="restoration" className="min-h-screen grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
      <div className="relative overflow-hidden group h-[400px] md:h-auto">
        <img 
          src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&q=80" 
          alt="River restoration" 
          className="w-full h-full object-cover block transition-transform duration-800 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(42,100,150,0.25)_0%,transparent_70%)] animate-rippleAnim"></div>
      </div>
      <div className="bg-gradient-to-br from-[#0d2a3a] to-forest py-[100px] px-6 md:px-[70px] flex flex-col justify-center">
        <div className="reveal-left">
          <div className="text-[0.7rem] tracking-[3px] uppercase text-sage mb-3 flex items-center gap-3 before:content-[''] before:inline-block before:w-[30px] before:h-px before:bg-sage">
            Restoration
          </div>
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] font-black leading-[1.1] tracking-[-1px] text-sky mb-5">
            Rivers & Lakes<br/>Come Alive
          </h2>
          <p className="text-[1rem] leading-[1.75] text-cream/65 max-w-[500px]">
            Water is the bloodstream of our planet. We're treating it with the reverence it deserves — through science, community, and compassion.
          </p>
        </div>
        <div className="mt-12 flex flex-col gap-6 reveal">
          {[
            { icon: '🌊', title: 'River Desilting & Cleaning', text: 'Manual and mechanical removal of pollutants, plastic waste, and industrial sludge from riverbanks and channels.' },
            { icon: '💧', title: 'Lake Bioremediation', text: 'Using natural microorganisms to break down toxins in stagnant lakes and restore dissolved oxygen levels.' },
            { icon: '🐟', title: 'Aquatic Biodiversity Revival', text: 'Reintroducing native fish, amphibians, and aquatic plants to rebuild thriving freshwater ecosystems.' },
            { icon: '📊', title: 'Realtime Water Monitoring', text: 'IoT-based sensors deployed in 120+ water bodies to track pH, turbidity, temperature, and pollutant levels.' }
          ].map((item, i) => (
            <div key={i} className="flex gap-5 p-6 bg-white/5 border border-[#2a6496]/20 rounded-xl transition-all duration-300 relative overflow-hidden group hover:bg-[#2a6496]/10 hover:translate-x-1.5 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-river before:scale-y-0 before:origin-bottom before:transition-transform before:duration-400 hover:before:scale-y-100">
              <span className="text-[2rem] shrink-0 mt-0.5">{item.icon}</span>
              <div>
                <div className="font-display text-[1.1rem] font-bold text-mint mb-1.5">{item.title}</div>
                <p className="text-[0.84rem] text-cream/60 leading-[1.6]">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
