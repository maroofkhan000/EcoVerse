export default function EWaste() {
  return (
    <section id="ewaste" className="py-[120px] px-6 md:px-[60px] bg-[linear-gradient(to_bottom,rgba(13,31,21,1)_0%,rgba(20,20,10,0.95)_100%),url('https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=1400&q=80')] bg-center bg-cover bg-fixed">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-20 items-center">
        <div className="relative h-[500px]">
          <div className="absolute border border-[#c9a84c]/15 rounded-full animate-ringExpand w-[200px] h-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [animation-duration:6s]"></div>
          <div className="absolute border border-[#c9a84c]/15 rounded-full animate-ringExpand w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [animation-duration:8s] [animation-delay:1s]"></div>
          <div className="absolute border border-[#c9a84c]/15 rounded-full animate-ringExpand w-[420px] h-[420px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [animation-duration:10s] [animation-delay:2s]"></div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] bg-[radial-gradient(circle,rgba(201,168,76,0.2)_0%,transparent_70%)] rounded-full flex items-center justify-center text-[4rem] animate-coreGlow">
            🔋
          </div>
          
          <div className="absolute w-[100px] h-[100px] bg-[#0d1f15]/90 border border-[#c9a84c]/30 rounded-xl flex flex-col items-center justify-center gap-1 top-[10%] left-[5%]">
            <span className="font-mono text-[1.4rem] text-gold font-bold">62M</span>
            <span className="text-[0.6rem] uppercase tracking-[1px] text-cream/50 text-center">Tonnes/yr<br/>generated</span>
          </div>
          <div className="absolute w-[100px] h-[100px] bg-[#0d1f15]/90 border border-[#c9a84c]/30 rounded-xl flex flex-col items-center justify-center gap-1 bottom-[10%] right-[5%]">
            <span className="font-mono text-[1.4rem] text-gold font-bold">17%</span>
            <span className="text-[0.6rem] uppercase tracking-[1px] text-cream/50 text-center">Formally<br/>recycled</span>
          </div>
          <div className="absolute w-[100px] h-[100px] bg-[#0d1f15]/90 border border-[#c9a84c]/30 rounded-xl flex flex-col items-center justify-center gap-1 top-[60%] left-0">
            <span className="font-mono text-[1.4rem] text-gold font-bold">6.2T</span>
            <span className="text-[0.6rem] uppercase tracking-[1px] text-cream/50 text-center">We've<br/>collected</span>
          </div>
        </div>
        
        <div className="reveal-right">
          <div className="text-[0.7rem] tracking-[3px] uppercase text-sage mb-3 flex items-center gap-3 before:content-[''] before:inline-block before:w-[30px] before:h-px before:bg-sage">
            E-Waste
          </div>
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] font-black leading-[1.1] tracking-[-1px] text-gold mb-5">
            Dead Devices,<br/>Living Planet
          </h2>
          <p className="text-[1rem] leading-[1.75] text-cream/65 w-full mb-10">
            The world generates 62 million tonnes of e-waste annually. Only 17% is formally recycled. We're fixing that — collection drive by drive, city by city.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: '📱', title: 'Mobile & Tablets', text: 'Old phones, tablets, and accessories safely disassembled and processed.' },
              { icon: '💻', title: 'Laptops & PCs', text: 'Computers, monitors, and peripherals — stripped and recycled responsibly.' },
              { icon: '🔌', title: 'Cables & Chargers', text: 'Recovering precious copper and preventing insulation fires in landfills.' },
              { icon: '🏭', title: 'Appliances', text: 'Fridges, microwaves, and electronics — certified zero-landfill recycling.' }
            ].map((drive, i) => (
              <div key={i} className="p-6 bg-white/5 border border-[#c9a84c]/15 rounded-2xl transition-all duration-400 hover:bg-[#c9a84c]/5 hover:border-[#c9a84c]/40 hover:-translate-y-1">
                <span className="text-[1.8rem] mb-3 block">{drive.icon}</span>
                <h4 className="font-display text-[1rem] text-gold mb-1.5">{drive.title}</h4>
                <p className="text-[0.8rem] text-cream/55 leading-[1.6]">{drive.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
