import { useEffect, useRef, useState } from 'react';
import { Play, Pause, X } from 'lucide-react';

export function TrailerModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    closeRef.current?.focus();
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Официальный трейлер курса"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-5xl bg-[#0a0a0a] border border-[#c9a84c]/40 overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-4 px-6 border-b border-[#f5f0e8]/10 bg-black">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e63946] animate-ping" />
            <span className="font-mono-subtitle text-xs text-[#c9a84c] tracking-widest">
              OFFICIAL CINEMATIC TRAILER // AZBUKA KINO
            </span>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Закрыть трейлер"
            className="text-[#f5f0e8]/70 hover:text-[#c9a84c] transition-colors p-1 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK-EMNHHnIVPlaX8up1Ri9TFWqmr-Q98iqViBiC9OJkn4O58YuccVSYIgSBeR0qHk6YDuERnaTjqmPp9BTOM6_I5q5yd2LdiJepJv5DTw4q36hR-ywX_OYeIewkx4iILisyXP9N24d92b2gAHRgF7CpeROEvNVHSnQlHhlC2CA5mRxr9n2cNSHLSYsOYREAgS6rn-VH-eUMU2hxkDMqttXoZ3X7RBRpkhzleilr-WceEyOZUpuPx9fxVqefCnmp14BCEWp4n2qF2gq"
            alt="Кадр из трейлера"
            className={`w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-70' : 'opacity-40 grayscale'}`}
            loading="lazy"
            decoding="async"
          />

          <div className="absolute bottom-16 inset-x-8 text-center pointer-events-none">
            <p className="font-mono-subtitle text-sm sm:text-lg text-[#f5f0e8] bg-black/80 inline-block px-4 py-2 border border-[#c9a84c]/30">
              «Мы не просто смотрим кадр. Мы проживаем его светотень и тишину.»
            </p>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Поставить на паузу' : 'Воспроизвести'}
            className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-[#c9a84c]/90 text-[#0a0a0a] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-lg"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-current" />
            ) : (
              <Play className="w-8 h-8 fill-current ml-1" />
            )}
          </button>
        </div>

        <div className="p-4 px-6 bg-black flex justify-between items-center border-t border-[#f5f0e8]/10 text-xs font-mono-subtitle text-[#c9a84c]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Пауза' : 'Воспроизвести'}
              className="hover:text-[#f5f0e8] transition-colors cursor-pointer"
            >
              {isPlaying ? 'PAUSE' : 'PLAY'}
            </button>
            <span className="flex items-center gap-1.5">AUDIO PREVIEW</span>
          </div>

          <span>01:14 / 02:45</span>
        </div>
      </div>
    </div>
  );
}
