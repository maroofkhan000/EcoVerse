export default function Recycling() {
  const steps = [
    { num: '01', title: 'Register Your Household', text: 'Sign up and get a free EcoKit — segregation bags, a collection schedule, and your green credit account.' },
    { num: '02', title: 'Sort & Store Weekly', text: 'Separate dry waste (plastic, paper, metal, glass) from wet waste. Our guides make it simple and fast.' },
    { num: '03', title: 'Schedule a Pickup', text: 'Book a doorstep collection via our app or website. Our certified collectors weigh and scan everything.' },
    { num: '04', title: 'Earn Green Credits', text: 'Earn points redeemable for discounts, sapling kits, or donations to your chosen eco-cause.' },
    { num: '05', title: 'Track Your Impact', text: 'Your dashboard shows CO₂ saved, trees equivalent, and water conserved — every month, in real numbers.' },
  ];

  return (
    <section id="recycling" className="py-[120px] px-6 md:px-[60px] bg-gradient-to-b from-[#0d1a0d] to-dark relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mt-[60px]">
        <div className="relative h-[500px] flex items-center justify-center reveal-left">
          <div className="absolute rounded-full border border-dashed border-fern/30 w-[160px] h-[160px] animate-orbitSpin" style={{animationDuration: '8s'}}>
            <div className="absolute w-2.5 h-2.5 bg-fern rounded-full -top-1.5 left-[calc(50%-5px)] shadow-[0_0_10px_var(--color-fern)]"></div>
          </div>
          <div className="absolute rounded-full border border-dashed border-fern/30 w-[280px] h-[280px] animate-orbitSpinReverse" style={{animationDuration: '14s'}}>
            <div className="absolute w-2.5 h-2.5 bg-fern rounded-full -top-1.5 left-[calc(50%-5px)] shadow-[0_0_10px_var(--color-fern)]"></div>
          </div>
          <div className="absolute rounded-full border border-dashed border-fern/30 w-[400px] h-[400px] animate-orbitSpin" style={{animationDuration: '22s'}}>
            <div className="absolute w-2.5 h-2.5 bg-fern rounded-full -top-1.5 left-[calc(50%-5px)] shadow-[0_0_10px_var(--color-fern)]"></div>
          </div>
          <div className="relative z-10 text-[5rem] animate-recycleSpin">♻️</div>
        </div>
        
        <div className="reveal-right">
          <div className="text-[0.7rem] tracking-[3px] uppercase text-sage mb-3 flex items-center gap-3 before:content-[''] before:inline-block before:w-[30px] before:h-px before:bg-sage">
            Recycling Program
          </div>
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] font-black leading-[1.1] tracking-[-1px] mb-5">
            Community<br/>
            <em className="text-sage italic">Recycling Hub</em>
          </h2>
          <p className="text-[1rem] leading-[1.75] text-cream/65 w-full mb-9">
            Our hyper-local recycling network covers 1,200 neighbourhoods. Here's how it works:
          </p>
          
          <div className="flex flex-col gap-5">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-5 items-start p-5 md:px-6 bg-white/5 rounded-[14px] transition-all duration-300 hover:bg-fern/10 hover:translate-x-2">
                <div className="font-mono text-[0.75rem] text-sage bg-fern/15 w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  {step.num}
                </div>
                <div>
                  <h4 className="font-display text-[1rem] text-mint mb-1">{step.title}</h4>
                  <p className="text-[0.82rem] text-cream/55 leading-[1.6]">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
