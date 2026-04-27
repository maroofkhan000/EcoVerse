export default function FloatingLeaves() {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-1 overflow-hidden">
      <span className="absolute -top-[60px] text-[18px] opacity-0 animate-leafFall" style={{ left: '5%', animationDuration: '12s', animationDelay: '0s', fontSize: '14px' }}>🍃</span>
      <span className="absolute -top-[60px] text-[18px] opacity-0 animate-leafFall" style={{ left: '15%', animationDuration: '15s', animationDelay: '2s', fontSize: '20px' }}>🌿</span>
      <span className="absolute -top-[60px] text-[18px] opacity-0 animate-leafFall" style={{ left: '25%', animationDuration: '10s', animationDelay: '4s', fontSize: '12px' }}>🍃</span>
      <span className="absolute -top-[60px] text-[18px] opacity-0 animate-leafFall" style={{ left: '35%', animationDuration: '14s', animationDelay: '1s', fontSize: '18px' }}>🌱</span>
      <span className="absolute -top-[60px] text-[18px] opacity-0 animate-leafFall" style={{ left: '50%', animationDuration: '11s', animationDelay: '3s', fontSize: '16px' }}>🍀</span>
      <span className="absolute -top-[60px] text-[18px] opacity-0 animate-leafFall" style={{ left: '60%', animationDuration: '13s', animationDelay: '5s', fontSize: '22px' }}>🍃</span>
      <span className="absolute -top-[60px] text-[18px] opacity-0 animate-leafFall" style={{ left: '70%', animationDuration: '16s', animationDelay: '0.5s', fontSize: '14px' }}>🌿</span>
      <span className="absolute -top-[60px] text-[18px] opacity-0 animate-leafFall" style={{ left: '80%', animationDuration: '9s', animationDelay: '2.5s', fontSize: '19px' }}>🍃</span>
      <span className="absolute -top-[60px] text-[18px] opacity-0 animate-leafFall" style={{ left: '90%', animationDuration: '12s', animationDelay: '4.5s', fontSize: '15px' }}>🌱</span>
      <span className="absolute -top-[60px] text-[18px] opacity-0 animate-leafFall" style={{ left: '45%', animationDuration: '17s', animationDelay: '6s', fontSize: '21px' }}>🍀</span>
    </div>
  );
}
