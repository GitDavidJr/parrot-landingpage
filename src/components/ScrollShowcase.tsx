import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const ScrollShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Calculate how far into the viewport the section is
      const start = windowH * 0.95;
      const end = windowH * 0.15;
      const current = rect.top;

      let progress = (start - current) / (start - end);
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && videoRef.current.paused) {
      videoRef.current.play();
    }
  };

  // Antigravity scroll expansion (from inset container to edge-to-edge max width)
  const scale = 0.94 + scrollProgress * 0.06;
  const borderRadius = 28 - scrollProgress * 14;

  return (
    <section id="showcase" ref={containerRef} className="py-8 sm:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Seamless Motion Video Container with Antigravity Scroll Expansion */}
        <div
          className="transition-all duration-300 ease-out origin-center mx-auto relative shadow-2xl overflow-hidden bg-slate-950 border border-slate-800/80"
          style={{
            transform: `scale(${scale})`,
            borderRadius: `${borderRadius}px`,
          }}
        >
          <video
            ref={videoRef}
            src="/videos/parrot-meeting-demo.mp4"
            poster="/videos/parrot-meeting-demo-poster.jpg"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full aspect-video object-cover bg-black cursor-pointer block"
            onClick={toggleMute}
          />

          {/* Minimal Audio Pill Overlay */}
          <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 z-20">
            <button
              onClick={toggleMute}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold backdrop-blur-md transition-all cursor-pointer shadow-lg ${
                isMuted
                  ? 'bg-black/60 hover:bg-black/80 text-white border border-white/10'
                  : 'bg-emerald-500/90 hover:bg-emerald-500 text-white'
              }`}
              title={isMuted ? 'Ativar som' : 'Mutar som'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isMuted ? 'Ativar áudio' : 'Áudio ativo'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
