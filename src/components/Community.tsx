import communityImg from '../image/community-planting-joyful-teamwork-outdoors_53876-1137960.avif';

export default function Community() {
  const cards = [
    { img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80', title: 'Neighborhood Recycling', text: 'Weekly neighbourhood recycling drives with segregated collection points. Earn credits for every kilogram you contribute.', link: 'Register Pickup →' },
    { img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80', title: 'Plantation Workshops', text: 'Hands-on saplings and seed-bombing workshops led by ecologists. Learn what to plant for maximum biodiversity.', link: 'Register Free →' },
    { img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80', title: 'School Outreach', text: 'Climate curriculum and nature walks across 400+ schools. Building values of the generation that will inherit this planet.', link: 'Partner With Us →' },
    { img: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=600&q=80', title: 'Eco Documentation', text: 'Volunteer photographers documenting environmental changes in your city. Share stories that spark action.', link: 'Join the Team →' },
  ];

  return (
    <section id="community" className="py-16 px-6 md:px-20 bg-[#294235] relative overflow-hidden">
      {/* Organic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fern/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sage/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="text-center max-w-[800px] mx-auto mb-20 reveal">
          <div className="text-[0.7rem] tracking-[4px] uppercase text-sage font-medium mb-6 flex items-center justify-center gap-4 before:content-[''] before:inline-block before:w-[36px] before:h-px before:bg-sage/30 after:content-[''] after:inline-block after:w-[36px] after:h-px after:bg-sage/30">
            Our Community
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black text-white leading-[1.05] tracking-[-2px] mb-8">
            The Heart of 
            <em className="text-sage italic font-normal"> Restoration</em>
          </h2>
          
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div key={i} className="group relative p-8 bg-[#e5ede5] border border-[#0a160f]/10 rounded-[48px] transition-all duration-500 hover:bg-white hover:border-sage/50 hover:-translate-y-2 reveal flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.05)] max-w-[480px] mx-auto w-full">
              {/* Subtle top light effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-forest/10 to-transparent"></div>
              
              <div className="w-full h-[230px] mb-6 relative overflow-hidden rounded-3xl border border-[#0a160f]/10 border-b border-[#0a160f]/10">
                <img 
                  src={card.img} 
                  alt={card.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <h3 className="font-display text-lg font-bold text-[#0a160f] mb-3 group-hover:text-sage transition-colors">
                {card.title}
              </h3>
              
              <p className="text-[#0a160f]/85 text-[0.85rem] leading-relaxed mb-6 flex-1 font-medium">
                {card.text}
              </p>
              
              <a 
                href="#" 
                className="inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[2px] text-[#0a160f] hover:text-sage transition-colors group/link"
              >
                {card.link}
                <span className="transform transition-transform group-hover/link:translate-x-1">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
