import { useEffect, useState } from 'react';

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let rx = 0, ry = 0;
    let mx = 0, my = 0;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setPosition({ x: mx, y: my });
    };

    const animCursor = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      setRingPosition({ x: rx, y: ry });
      animationFrameId = requestAnimationFrame(animCursor);
    };

    window.addEventListener('mousemove', onMouseMove);
    animCursor();

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const attachListeners = () => {
      document.querySelectorAll('a, button, .program-card, .community-card, .event-row').forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    setTimeout(attachListeners, 500);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
      document.querySelectorAll('a, button, .program-card, .community-card, .event-row').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div 
        className={`cursor ${isHovering ? '!w-5 !h-5' : ''}`} 
        style={{ left: position.x, top: position.y }}
      />
      <div 
        className={`cursor-ring ${isHovering ? '!w-[60px] !h-[60px]' : ''}`} 
        style={{ left: ringPosition.x, top: ringPosition.y }}
      />
    </>
  );
}
