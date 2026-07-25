import { useEffect, useRef } from 'react';

export function TimecodeWidget() {
  const timeRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let animId: number;
    const updateTimer = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const ms = String(Math.floor(now.getMilliseconds() / 40)).padStart(2, '0');
      if (timeRef.current) {
        timeRef.current.textContent = `${h}:${m}:${s}:${ms}`;
      }
      animId = requestAnimationFrame(updateTimer);
    };
    animId = requestAnimationFrame(updateTimer);

    const handleScroll = () => {
      const html = document.documentElement;
      const body = document.body;
      const scrollTop = html.scrollTop || body.scrollTop;
      const scrollHeight = html.scrollHeight || body.scrollHeight;
      const clientHeight = html.clientHeight;
      const percent = scrollTop / (scrollHeight - clientHeight || 1);
      const totalSeconds = percent * 5400;
      const hrs = Math.floor(totalSeconds / 3600);
      const mins = Math.floor((totalSeconds % 3600) / 60);
      const secs = Math.floor(totalSeconds % 60);
      if (frameRef.current) {
        frameRef.current.textContent = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-[5vw] z-[5001] font-mono-subtitle text-[#c9a84c] text-[12px] tracking-[0.2em] bg-[#0a0a0a]/80 backdrop-blur-md px-4 py-2 border border-[#f5f0e8]/10 hidden sm:flex items-center gap-3">
      <span className="inline-block w-2 h-2 rounded-full bg-[#e63946] animate-pulse" />
      <span>
        REC <span ref={timeRef}>00:00:00:00</span>
      </span>
      <span className="text-[#f5f0e8]/30">|</span>
      <span className="text-[#f5f0e8]/70">
        FRAME: <span ref={frameRef}>00:00:00</span>
      </span>
    </div>
  );
}
