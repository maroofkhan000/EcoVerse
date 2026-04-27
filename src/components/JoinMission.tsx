import { Link } from 'react-router-dom';

export default function JoinMission() {
  return (
    <section id="join" className="py-16 px-6 md:px-20 bg-[#0d1a0d] relative overflow-hidden">
      {/* Dynamic background particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-sage/30 blur-xl animate-pulse"
            style={{
              width: Math.random() * 300 + 100 + 'px',
              height: Math.random() * 300 + 100 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 10 + 5 + 's'
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div className="text-center mb-16 reveal">
          <div className="text-[0.7rem] tracking-[4px] uppercase text-sage font-medium mb-4 flex items-center justify-center gap-4 before:content-[''] before:inline-block before:w-[36px] before:h-px before:bg-sage/30 after:content-[''] after:inline-block after:w-[36px] after:h-px after:bg-sage/30">
            Get Involved
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-black leading-[1.05] tracking-[-2px] mb-8">
            Join the <em className="text-sage italic font-normal">Mission</em>
          </h2>
        </div>

        <div className="max-w-[1100px] mx-auto relative reveal">
          <div className="bg-[#e5ede5] border border-[#0a160f]/10 rounded-[60px] overflow-hidden group shadow-[0_30px_100px_rgba(0,0,0,0.05)] w-[75%] md:w-full mx-auto">
            <div className="h-[230px] relative overflow-hidden border-b border-[#0a160f]/10">
              <img 
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Volunteer" 
              />
            </div>

            <div className="p-8 md:p-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-center md:text-left">
                <h3 className="font-display text-3xl md:text-4xl font-bold text-[#0a160f] mb-2">
                  Be the Hands of Change
                </h3>
                <p className="text-[#0a160f]/60 text-[0.95rem] leading-relaxed max-w-[500px] font-medium">
                  Join hands-on restoration projects in your city. Real impact, real people.
                </p>
              </div>

              <Link
                to="/volunteer"
                className="whitespace-nowrap px-10 py-5 bg-forest text-white font-bold rounded-2xl text-md transition-all duration-300 hover:bg-sage hover:text-dark hover:scale-[1.05] hover:shadow-[0_20px_50px_rgba(74,140,92,0.2)]"
              >
                Sign Up to Volunteer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
