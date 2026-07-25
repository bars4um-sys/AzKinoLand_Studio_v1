import { useEffect, useRef } from 'react';

export function CursorSpotlight() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const visibleRef = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion || isCoarsePointer) return;

    const cursor = cursorRef.current;
    const spotlight = spotlightRef.current;
    if (!cursor || !spotlight) return;

    const updateDom = () => {
      const { x, y } = posRef.current;
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
      cursor.style.opacity = visibleRef.current ? '1' : '0';
      spotlight.style.background = `radial-gradient(circle 320px at ${x}px ${y}px, rgba(201, 168, 76, 0.12) 0%, rgba(10, 10, 10, 0) 100%)`;
      spotlight.style.opacity = visibleRef.current ? '1' : '0';
    };

    const scheduleUpdate = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          updateDom();
          rafRef.current = null;
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      visibleRef.current = true;
      scheduleUpdate();
    };

    const handleMouseLeave = () => {
      visibleRef.current = false;
      scheduleUpdate();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[10000] border border-[#c9a84c] rounded-full transition-opacity duration-200 ease-out flex items-center justify-center -translate-x-1/2 -translate-y-1/2 opacity-0"
        style={{ width: 32, height: 32, backgroundColor: 'rgba(201, 168, 76, 0.05)' }}
      >
        <div className="w-1 h-1 bg-[#c9a84c] rounded-full" />
      </div>
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 opacity-0"
      />
    </>
  );
}
