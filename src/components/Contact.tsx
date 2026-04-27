export default function Contact() {
  return (
    <section id="contact" className="py-12 md:py-16 px-6 md:px-20 bg-[#294235] relative overflow-hidden">
      {/* Cinematic Background Glows */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(74,140,92,0.08)_0%,transparent_50%)] pointer-events-none"></div>

      <div className="max-w-[850px] mx-auto relative z-10">
        <div className="text-center mb-6 reveal">
          <div className="text-[0.55rem] tracking-[4px] uppercase text-sage font-medium mb-2 flex items-center justify-center gap-4 before:content-[''] before:inline-block before:w-[30px] before:h-px before:bg-sage/30 after:content-[''] after:inline-block after:w-[30px] after:h-px after:bg-sage/30">
            Get in Touch
          </div>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-black leading-[1.1] tracking-[-1px] mb-4 text-white">
            Let's build a <em className="text-sage italic font-normal">greener</em> future
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch reveal">
          {/* Contact Details Card: Premium Compact Refactoring */}
          <div className="lg:col-span-5 bg-[#dbe4db] border border-[#0a160f]/10 p-6 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] flex flex-col transition-all duration-700 relative overflow-hidden group/main">
            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse"></div>
                <h3 className="text-[0.6rem] uppercase tracking-[3px] text-[#0a160f]/60 font-black">Reach Out</h3>
              </div>
              
              <div className="space-y-3">
                {[
                  { icon: '📧', label: 'Email', val: 'hello@ecoverse.org', sub: '24/7 Response' },
                  { icon: '📞', label: 'Call', val: '+91 98765 43210', sub: 'Mon-Sat Support' },
                  { icon: '📍', label: 'Hub', val: 'New Delhi - 110001', sub: 'Green Block' }
                ].map((item, i) => (
                  <div key={i} className="group/item p-3.5 bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl flex items-center gap-4 transition-all duration-500 hover:bg-white hover:shadow-lg hover:-translate-y-0.5">
                    <div className="w-9 h-9 bg-[#0a160f] rounded-xl flex items-center justify-center text-md shadow-lg transition-transform duration-500 group-hover/item:rotate-[10deg] group-hover/item:scale-110">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[0.5rem] uppercase tracking-[1px] text-[#0a160f]/40 font-black mb-0.5">{item.label}</div>
                      <div className="text-[#0a160f] font-display font-bold text-[0.8rem] leading-tight">{item.val}</div>
                      <div className="text-[0.6rem] text-[#0a160f]/30 font-bold">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#0a160f]/10 relative z-10">
              <div className="flex gap-2">
                {['𝕏', 'LinkedIn', 'Instagram'].map(social => (
                  <button key={social} className="flex-1 py-2.5 bg-[#0a160f] text-white rounded-xl text-[0.55rem] font-black uppercase tracking-[2px] transition-all duration-300 hover:bg-sage hover:text-dark hover:shadow-lg hover:scale-[1.05]">
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form Card: Compact Professional */}
          <div className="lg:col-span-7 bg-[#0a160f] p-6 md:p-8 rounded-[32px] shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-6">Drop a Message</h3>
              
              <form className="space-y-3.5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[0.5rem] uppercase tracking-[2px] text-white/40 font-bold ml-1">Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white outline-none focus:border-sage transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[0.5rem] uppercase tracking-[2px] text-white/40 font-bold ml-1">Email</label>
                    <input type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white outline-none focus:border-sage transition-all" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[0.5rem] uppercase tracking-[2px] text-white/40 font-bold ml-1">Subject</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white/60 outline-none focus:border-sage transition-all appearance-none">
                    <option>General Inquiry</option>
                    <option>Partnership Interest</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[0.5rem] uppercase tracking-[2px] text-white/40 font-bold ml-1">Message</label>
                  <textarea rows={2} placeholder="How can we collaborate?" className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white outline-none focus:border-sage transition-all resize-none"></textarea>
                </div>

                <button className="w-full py-3.5 bg-sage text-dark font-black rounded-xl text-sm transition-all duration-300 hover:bg-white hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(74,140,92,0.3)]">
                  Send Message 🌿
                </button>
              </form>
            </div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-bl-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
