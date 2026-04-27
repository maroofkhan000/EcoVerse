export default function FeaturedBlog() {
  return (
    <section id="news" className="py-20 px-6 md:px-20 bg-[#f5f0e8] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center reveal">
          {/* Left Side: Cinematic Image */}
          <div className="w-full md:w-1/2 relative group">
            <div className="absolute -inset-4 bg-sage/10 rounded-[60px] blur-2xl group-hover:bg-sage/20 transition-all duration-700"></div>
            <div className="relative h-[400px] md:h-[500px] rounded-[48px] overflow-hidden border border-forest/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1561484930-998b6a7b22e8?auto=format&fit=crop&w=1000&q=80" 
                alt="Heatwave India" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-[0.6rem] font-black uppercase tracking-[2px] text-white border border-white/30 mb-4">
                  <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
                  Breaking News
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Compelling Content */}
          <div className="w-full md:w-1/2 space-y-8">
            <div className="space-y-4">
              <div className="text-[0.7rem] tracking-[4px] uppercase text-forest/40 font-black flex items-center gap-4 before:content-[''] before:inline-block before:w-[30px] before:h-px before:bg-forest/20">
                Climate Alert
              </div>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.05] tracking-[-2px] text-[#0a160f]">
                India Sizzles: <em className="text-forest italic font-normal">19 of 20</em> Hottest Cities Worldwide
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-[#0a160f]/80 text-[1.05rem] leading-relaxed font-medium">
                A staggering new report confirms that this summer, India has become the global epicenter of extreme heat. With 19 out of the 20 hottest cities on Earth currently located within the subcontinent, the call for urban restoration has never been more urgent.
              </p>
              <p className="text-[#0a160f]/60 text-[0.9rem] leading-relaxed">
                From Delhi to Nagpur, asphalt temperatures are reaching record highs. Our mission at EcoVerse is to combat this 'Heat Island Effect' through massive localized afforestation and water body revival. We aren't just planting trees; we're building the life-support systems our cities need to survive.
              </p>
            </div>

            <div className="pt-4">
              <button className="px-10 py-4 bg-[#0a160f] text-white font-bold rounded-2xl text-[0.8rem] uppercase tracking-[2px] transition-all duration-300 hover:bg-forest hover:shadow-2xl hover:scale-[1.05] flex items-center gap-4 group">
                Read Full Analysis 
                <span className="text-xl transition-transform group-hover:translate-x-2">→</span>
              </button>
            </div>

            {/* Author Attribution */}
            <div className="flex items-center gap-4 pt-8 border-t border-forest/10">
              <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center text-xl grayscale">🖋️</div>
              <div>
                <div className="text-[0.75rem] font-black text-forest uppercase tracking-[1px]">Dr. Ananya Sharma</div>
                <div className="text-[0.65rem] text-forest/40 font-bold uppercase tracking-[1px]">Chief Ecologist, EcoVerse</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
