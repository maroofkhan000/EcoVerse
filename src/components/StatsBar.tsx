export default function StatsBar() {
  const stats = [
    { num: '2.4M+', label: 'Trees Planted', delay: '0.1s' },
    { num: '380',   label: 'Rivers Restored', delay: '0.2s' },
    { num: '6,200T', label: 'E-Waste Collected', delay: '0.3s' },
    { num: '50K+',  label: 'Community Members', delay: '0.4s' },
  ];

  return (
    <div className="bg-gradient-to-r from-moss to-forest border-y border-fern/30 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`flex flex-col items-center justify-center pt-5.4 pb-10 px-4 text-center opacity-0 translate-y-5
              ${i < stats.length - 1 ? 'border-r border-fern/20' : ''}
              ${i === 1 ? 'md:border-r border-fern/20' : ''}
            `}
            style={{ animation: `statReveal 0.8s ease forwards ${stat.delay}` }}
          >
            <span className="font-mono text-[2rem] font-bold text-gold leading-none mb-2">{stat.num}</span>
            <span className="text-[0.72rem] tracking-[2px] uppercase text-cream/55">{stat.label}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes statReveal { to { opacity:1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
