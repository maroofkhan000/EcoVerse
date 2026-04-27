import engagementBg from '../image/engagement_bg.png';
import eventPlantation from '../image/event_plantation.png';
import eventBeach from '../image/event_beach.png';
import eventCycling from '../image/event_cycling_city.png';

export default function Engagement() {
  const events = [
    {
      date: '03',
      month: 'May',
      img: eventCycling,
      title: 'Green City Cycling Rally',
      tag: 'Cycling',
      location: 'Connaught Place, Delhi',
      time: '6:00 AM',
      color: 'bg-river'
    },
    {
      date: '08',
      month: 'May',
      img: eventPlantation,
      title: 'Yamuna Riverbank Plantation',
      tag: 'Plantation',
      location: 'Yamuna Ghat, Delhi',
      time: '7:00 AM',
      color: 'bg-fern'
    },
    {
      date: '15',
      month: 'May',
      img: eventBeach,
      title: 'Juhu Beach Cleanup Drive',
      tag: 'Cleanup',
      location: 'Juhu Beach, Mumbai',
      time: '8:00 AM',
      color: 'bg-sage'
    }
  ];

  return (
    <section id="events" className="py-16 px-6 md:px-20 bg-[#294235] relative overflow-hidden">
      {/* Realistic AI-Generated Background with Cinematic Overlay */}
      <div className="absolute inset-0 opacity-20 select-none pointer-events-none">
        <img 
          src={engagementBg} 
          alt="Environmental Action"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/85 to-dark"></div>
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="text-center mb-16 reveal">
          <div className="text-[0.7rem] tracking-[4px] uppercase text-sage font-medium mb-4 flex items-center justify-center gap-4 before:content-[''] before:inline-block before:w-[36px] before:h-px before:bg-sage/30 after:content-[''] after:inline-block after:w-[36px] after:h-px after:bg-sage/30">
            Stay Active
          </div>
          <h2 className="font-display text-[clamp(2.2rem,5.5vw,4rem)] font-black leading-[1.05] tracking-[-1.5px] mb-5">
            Upcoming   Events
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <div 
              key={i} 
              className="group relative bg-[#e5ede5] border border-[#0a160f]/10 rounded-[40px] overflow-hidden transition-all duration-500 hover:bg-[#dbe4db] hover:border-sage/50 hover:-translate-y-2 reveal flex flex-col h-full shadow-[0_20px_50px_rgba(0,0,0,0.05)] max-w-[480px] mx-auto w-full"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Card Header Image */}
              <div className="h-[230px] w-full overflow-hidden relative border-b border-[#0a160f]/10">
                <img 
                  src={event.img} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute bottom-4 left-6 px-3 py-1 bg-white/60 backdrop-blur-md rounded-full text-[0.55rem] tracking-[2px] uppercase text-[#0a160f] font-bold border border-[#0a160f]/10">
                  {event.tag}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                {/* Date in lower portion */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl font-black text-forest leading-none">{event.date}</span>
                  <span className="text-[0.75rem] uppercase tracking-[2px] text-[#0a160f]/40 font-bold">{event.month}</span>
                </div>

                <h3 className="font-display text-xl font-bold text-[#0a160f] mb-6 group-hover:text-forest transition-colors leading-tight">
                  {event.title}
                </h3>
                
                <div className="space-y-4 mb-8 mt-auto">
                  <div className="flex items-center gap-4 text-[0.95rem] text-[#0a160f]/60 font-medium">
                    <span className="text-forest text-lg">📍</span>
                    {event.location}
                  </div>
                  <div className="flex items-center gap-4 text-[0.95rem] text-[#0a160f]/60 font-medium">
                    <span className="text-forest text-lg">⏰</span>
                    {event.time}
                  </div>
                </div>
                
                <button className="w-full py-4 bg-forest text-white rounded-2xl text-xs font-bold hover:bg-sage hover:text-dark transition-all shadow-lg hover:shadow-sage/20">
                  Register for Event
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
