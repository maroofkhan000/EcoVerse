import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, onSnapshot, Timestamp } from 'firebase/firestore';
import engagementBg from '../image/engagement_bg.png';
import { EVENT_IMAGE_BY_TAG, STATIC_EVENTS } from '../data/events';
import type { EventData } from '../types';

function getTimestampValue(value: unknown) {
  return value && typeof value === 'object' && 'toMillis' in value
    ? (value as Timestamp).toMillis()
    : 0;
}

export default function Engagement() {
  const [dynamicEvents, setDynamicEvents] = useState<EventData[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'events'),
      snap => {
        const events: EventData[] = snap.docs.map(d => {
          const data = d.data() as EventData;
          return {
            id: d.id,
            date: data.date || '--',
            month: data.month || '---',
            img: data.img || EVENT_IMAGE_BY_TAG[data.tag] || STATIC_EVENTS[2].img,
            title: data.title || 'Upcoming Event',
            tag: data.tag || 'Event',
            location: data.location || 'Location to be announced',
            time: data.time || 'Time to be announced',
            description: data.description || '',
            createdAt: data.createdAt,
            isStatic: false,
          };
        });
        
        // Sort: Newest first, fallback to 0 if createdAt is missing
        events.sort((a, b) => getTimestampValue(b.createdAt) - getTimestampValue(a.createdAt));
        setDynamicEvents(events);
      },
      err => console.error('Firestore events error:', err)
    );
    return () => unsub();
  }, []);

  // Robustness: ensure all elements with 'reveal' class eventually become visible
  useEffect(() => {
    const timer = setTimeout(() => {
      const reveals = document.querySelectorAll('#events .reveal');
      reveals.forEach(r => r.classList.add('visible'));
    }, 1500); // 1.5s fallback to show everything if observer fails
    return () => clearTimeout(timer);
  }, [dynamicEvents]);

  const allEvents = [...dynamicEvents, ...STATIC_EVENTS];

  return (
    <section id="events" className="py-16 px-6 md:px-20 bg-[#294235] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-20 select-none pointer-events-none">
        <img src={engagementBg} alt="Environmental Action" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/85 to-dark"></div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="text-center mb-16 reveal">
          <div className="text-[0.7rem] tracking-[4px] uppercase text-sage font-medium mb-4 flex items-center justify-center gap-4 before:content-[''] before:inline-block before:w-[36px] before:h-px before:bg-sage/30 after:content-[''] after:inline-block after:w-[36px] after:h-px after:bg-sage/30">
            Stay Active
          </div>
          <h2 className="font-display text-[clamp(2.2rem,5.5vw,4rem)] font-black leading-[1.05] tracking-[-1.5px] mb-5 text-white">
            Upcoming Events
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allEvents.map((event, i) => (
            <div
              key={event.id}
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
                {/* Date */}
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
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[0.95rem] text-[#0a160f]/60 font-medium">
                    <span className="text-forest text-lg">⏰</span>
                    {event.time}
                  </div>
                </div>

                <Link
                  to={`/event/${event.id}`}
                  state={event.isStatic ? event : undefined}
                  className="w-full py-4 bg-forest text-white rounded-2xl text-xs font-bold hover:bg-sage hover:text-dark transition-all shadow-lg hover:shadow-sage/20 text-center block no-underline"
                >
                  Register for Event
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {allEvents.length === 0 && (
          <div className="text-center py-20 text-white/40 font-display italic">
            No upcoming events at the moment. Check back soon!
          </div>
        )}
      </div>
    </section>
  );
}
