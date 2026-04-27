import { useState } from 'react';

export default function Donate() {
  const [activeAmount, setActiveAmount] = useState('1000');
  const [customAmount, setCustomAmount] = useState('');

  const amounts = [
    { value: '500', label: '₹500', impact: 'Plants 10 native saplings' },
    { value: '1000', label: '₹1000', impact: 'Cleans 20kg of river plastic' },
    { value: '2500', label: '₹2500', impact: 'Supports Buying Equipments' },
    { value: 'custom', label: 'Custom', impact: 'Every rupee fuels the mission' },
  ];

  return (
    <section id="donate" className="py-24 px-6 md:px-20 bg-[#0d1a0d] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(74,140,92,0.06)_0%,transparent_50%)] pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-16 reveal">
          <div className="text-[0.7rem] tracking-[4px] uppercase text-sage font-medium mb-4 flex items-center justify-center gap-4 before:content-[''] before:inline-block before:w-[36px] before:h-px before:bg-sage/30 after:content-[''] after:inline-block after:w-[36px] after:h-px after:bg-sage/30">
            Support the Mission
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[1.05] tracking-[-2px] mb-8">
            Fuel the <em className="text-sage italic font-normal">Restoration</em>
          </h2>
          <p className="text-white/60 text-[1.1rem] leading-relaxed max-w-[650px] mx-auto">
            Your contribution directly powers on-ground ecosystem recovery. 100% of funds are audited and traceable.
          </p>
        </div>

        <div className="max-w-[1000px] mx-auto reveal">
          <div className="bg-white/[0.03] border border-white/5 rounded-[60px] p-8 md:p-16 backdrop-blur-xl relative overflow-hidden group">
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
               <span className="px-4 py-1.5 bg-white text-[#0a160f] text-[0.65rem] font-bold uppercase tracking-[2px] rounded-full border border-white/20">✓ 80G Tax Exempted</span>
               <span className="px-4 py-1.5 bg-white text-[#0a160f] text-[0.65rem] font-bold uppercase tracking-[2px] rounded-full border border-white/10">★ Monthly Audited</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left: Interactive Tiers */}
              <div className="space-y-4">
                {amounts.map((amt) => (
                  <button
                    key={amt.value}
                    onClick={() => setActiveAmount(amt.value)}
                    className={`group/btn w-full flex items-center justify-between p-6 rounded-3xl border transition-all duration-500 ${
                      activeAmount === amt.value 
                        ? 'bg-white border-white text-dark scale-[1.02] shadow-2xl' 
                        : 'bg-white/5 border-white/10 text-white/50 hover:bg-[#b5d8c0] hover:text-[#0a160f] hover:border-[#b5d8c0]'
                    }`}
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-xl font-black">{amt.label}</span>
                      <span className={`text-[0.65rem] uppercase tracking-[1px] font-bold transition-colors duration-500 ${activeAmount === amt.value ? 'text-dark/60' : 'text-sage group-hover/btn:text-dark/60'}`}>
                        {amt.impact}
                      </span>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-500 ${activeAmount === amt.value ? 'border-dark' : 'border-white/20 group-hover/btn:border-dark/30'}`}>
                      {activeAmount === amt.value && <div className="w-2.5 h-2.5 bg-dark rounded-full"></div>}
                    </div>
                  </button>
                ))}

                {activeAmount === 'custom' && (
                  <div className="relative animate-fadeIn">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 font-bold">₹</span>
                    <input 
                      type="number" 
                      placeholder="Enter custom amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-sage transition-colors"
                    />
                  </div>
                )}
              </div>

              {/* Right: Summary & Action */}
              <div className="text-center lg:text-left">
                <div className="mb-10">
                   <div className="text-[0.65rem] uppercase tracking-[3px] text-sage font-black mb-2">Impact Summary</div>
                   <h3 className="text-3xl font-display font-bold text-white mb-6">
                     You are contributing <span className="text-sage">₹{activeAmount === 'custom' ? (customAmount || '0') : activeAmount}</span>
                   </h3>
                   <p className="text-cream/40 text-sm leading-relaxed italic">
                     "This contribution will directly fund the logistics and community wages required for {amounts.find(a => a.value === activeAmount)?.impact.toLowerCase()}."
                   </p>
                </div>

                <button className="w-full py-6 bg-sage text-dark font-black rounded-2xl text-lg transition-all duration-300 hover:bg-white hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(74,140,92,0.3)]">
                  Donate ₹{activeAmount === 'custom' ? (customAmount || '0') : activeAmount} Now 🌱
                </button>
                
                <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4 transition-all duration-500">
                  <div className="text-[0.65rem] font-bold uppercase tracking-[2px] text-white/80">Securely Powered by</div>
                  <div className="flex gap-3">
                    <span className="px-3 py-1 border border-white/30 rounded-md text-[0.6rem] font-black text-white bg-white/5">UPI</span>
                    <span className="px-3 py-1 border border-white/30 rounded-md text-[0.6rem] font-black text-white bg-white/5">VISA</span>
                    <span className="px-3 py-1 border border-white/30 rounded-md text-[0.6rem] font-black text-white bg-white/5">RUPAY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
