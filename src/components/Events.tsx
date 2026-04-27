export default function Events() {
  const events = [
    { day: '03', month: 'May', name: 'Green City Cycling Rally', loc: 'Connaught Place, Delhi', time: '6:00 AM', badge: 'Cycling', badgeClass: 'bg-[#2a6496]/20 text-[#87c0e8] border-[#2a6496]/30' },
    { day: '08', month: 'May', name: 'Yamuna Riverbank Plantation', loc: 'Yamuna Ghat, Delhi', time: '7:00 AM', badge: 'Plantation', badgeClass: 'bg-fern/20 text-sage border-fern/30' },
    { day: '15', month: 'May', name: 'Hussain Sagar Lake Drive', loc: 'Hussain Sagar, Hyderabad', time: '8:00 AM', badge: 'Cleanup', badgeClass: 'bg-[#c9a84c]/15 text-gold border-[#c9a84c]/25' },
    { day: '22', month: 'May', name: 'E-Waste Collection Drive', loc: 'Indiranagar, Bengaluru', time: '9:00 AM', badge: 'E-Waste', badgeClass: 'bg-[#8b6f47]/20 text-sand border-[#8b6f47]/30' },
    { day: '01', month: 'Jun', name: 'Forest Trail Cycling — Monsoon Edition', loc: 'Sanjay Gandhi NP, Mumbai', time: '6:30 AM', badge: 'Cycling', badgeClass: 'bg-[#2a6496]/20 text-[#87c0e8] border-[#2a6496]/30' },
    { day: '05', month: 'Jun', name: 'World Environment Day Mega Drive', loc: 'Pan-India, 24 Cities', time: 'All Day', badge: 'Flagship', badgeClass: 'bg-fern/20 text-sage border-fern/30' },
  ];

  return (
    <section id="events" className="py-[120px] px-6 md:px-[60px] bg-dark">
      <div className="reveal">
        <div className="text-[0.7rem] tracking-[3px] uppercase text-sage mb-3 flex items-center gap-3 before:content-[''] before:inline-block before:w-[30px] before:h-px before:bg-sage">
          Events
        </div>
        <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] font-black leading-[1.1] tracking-[-1px]">
          Upcoming <em className="text-sage italic">Events</em>
        </h2>
      </div>
      
      <div className="mt-[60px] grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-[60px] items-start">
        <div className="flex flex-col gap-[3px] reveal-left">
          {events.map((ev, i) => (
            <div key={i} className="flex items-center gap-6 p-6 md:px-7 bg-white/5 border-l-[3px] border-transparent transition-all duration-300 cursor-pointer hover:bg-fern/10 hover:border-fern md:hover:pl-9">
              <div className="text-center shrink-0 min-w-[52px]">
                <div className="font-mono text-[1.8rem] text-gold font-bold leading-none">{ev.day}</div>
                <div className="text-[0.65rem] tracking-[2px] uppercase text-cream/40 mt-1">{ev.month}</div>
              </div>
              <div className="flex-1">
                <div className="font-display text-[1.05rem] text-cream mb-1">{ev.name}</div>
                <div className="text-[0.78rem] text-cream/45 flex flex-wrap gap-x-4 gap-y-1">
                  <span>📍 {ev.loc}</span>
                  <span>⏰ {ev.time}</span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-[0.65rem] tracking-[1px] uppercase shrink-0 border ${ev.badgeClass}`}>
                {ev.badge}
              </div>
            </div>
          ))}
        </div>
        
        <div className="sticky top-[100px] bg-gradient-to-br from-moss/40 to-[#0d1f15]/80 border border-fern/20 rounded-[24px] overflow-hidden reveal-right">
          <div className="h-[220px] bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80')] bg-center bg-cover relative after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:from-[#0d1f15]/80 after:to-transparent after:to-60%"></div>
          <div className="p-7">
            <div className="text-[0.65rem] tracking-[2px] uppercase text-sage mb-2">Featured Event</div>
            <div className="font-display text-[1.5rem] font-bold text-white mb-3">World Environment Day Mega Drive 2026</div>
            <p className="text-[0.84rem] text-cream/60 leading-[1.6] mb-6">Our biggest event of the year — 24 cities, 10,000 volunteers, 100,000 saplings, and a nationwide chain of action for our rivers, forests, and skies.</p>
            <button className="w-full p-3.5 bg-fern text-white border-none rounded-xl font-sans text-[0.88rem] font-medium cursor-pointer transition-colors hover:bg-sage">
              Register Now — Free Entry
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
