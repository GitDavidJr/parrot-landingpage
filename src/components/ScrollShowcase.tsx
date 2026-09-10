import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Video, RefreshCw } from 'lucide-react';

export const ScrollShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeVideo, setActiveVideo] = useState<'meeting' | 'antigravity'>('meeting');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(27);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Calculate how far into the viewport the section is
      const start = windowH * 0.9;
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

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration || 27);
  };

  const switchVideo = (type: 'meeting' | 'antigravity') => {
    setActiveVideo(type);
    if (videoRef.current) {
      videoRef.current.src =
        type === 'meeting'
          ? '/videos/parrot-meeting-demo.mp4'
          : '/videos/antigravity-reference.mp4';
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // Interpolate dimensions based on scrollProgress (0 = framed/smaller, 1 = expanded/immersive)
  const scale = 0.92 + scrollProgress * 0.08;
  const borderRadius = 32 - scrollProgress * 12;

  return (
    <section id="showcase" ref={containerRef} className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/80 mb-4">
            <Video className="w-3.5 h-3.5 text-emerald-600" />
            <span>Demonstração ao Vivo em Chamada Real</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 font-sans">
            Veja o Parrot em ação numa reunião real.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal">
            Conforme você rola a página, o player se expande. Acompanhe a transcrição e tradução
            bidirecional entre San Francisco e São Paulo sem nenhum robô conectado na sala.
          </p>
        </div>

        {/* Video Type Tabs */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            onClick={() => switchVideo('meeting')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeVideo === 'meeting'
                ? 'bg-slate-950 text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${activeVideo === 'meeting' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-300'}`} />
            <span>Reunião Google Meet (Áudio Real + HUD Parrot)</span>
          </button>

          <button
            onClick={() => switchVideo('antigravity')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeVideo === 'antigravity'
                ? 'bg-slate-950 text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Inspiração Antigravity (Gravação)</span>
          </button>
        </div>

        {/* Scroll-Expanding Video Wrapper */}
        <div
          className="transition-all duration-300 ease-out origin-center mx-auto relative group shadow-2xl"
          style={{
            transform: `scale(${scale})`,
            borderRadius: `${borderRadius}px`,
          }}
        >
          {/* Ambient Chroma Glow Behind Video */}
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/15 via-blue-500/15 to-purple-500/15 rounded-[36px] blur-2xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity" />

          {/* Player Container */}
          <div
            className="relative overflow-hidden bg-slate-950 border border-slate-800"
            style={{ borderRadius: `${borderRadius}px` }}
          >
            <video
              ref={videoRef}
              src={activeVideo === 'meeting' ? '/videos/parrot-meeting-demo.mp4' : '/videos/antigravity-reference.mp4'}
              poster="/videos/parrot-meeting-demo-poster.jpg"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              className="w-full aspect-video object-contain bg-black cursor-pointer"
            />

            {/* Top Video Overlay Badge */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 z-20 pointer-events-none">
              <span className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold border border-white/10 flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{activeVideo === 'meeting' ? 'Tradução Bidirecional Ativa • 180ms' : 'Referência Antigravity'}</span>
              </span>
            </div>

            {/* Bottom Control Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 sm:p-6 flex items-center justify-between z-20 transition-opacity">
              
              {/* Play / Mute Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-950 flex items-center justify-center transition-transform hover:scale-105 shadow-md cursor-pointer"
                  title={isPlaying ? 'Pausar' : 'Reproduzir'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>

                <button
                  onClick={toggleMute}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isMuted
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 animate-bounce'
                      : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md'
                  }`}
                  title={isMuted ? 'Ativar som' : 'Mutar som'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{isMuted ? 'Clique para Ouvir as Vozes' : 'Som Ativado'}</span>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="hidden sm:flex items-center gap-3 flex-1 max-w-md mx-6">
                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-100"
                    style={{ width: `${(currentTime / (duration || 27)) * 100}%` }}
                  />
                </div>
                <span className="text-[11px] font-mono text-white/70 whitespace-nowrap">
                  {Math.floor(currentTime)}s / {Math.floor(duration)}s
                </span>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleFullscreen}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                  title="Tela cheia"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Feature Highlights directly connected to the video */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-sm transition-shadow">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-3">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Isolamento CoreAudio Nativo</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              O driver virtual do Parrot separa o canal do seu microfone e o áudio recebido da chamada.
              Zero retorno de som, zero loopback e zero eco.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-sm transition-shadow">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-3">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Sem Robôs Invadindo a Sala</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Diferente de Otter ou Fireflies, nenhum participante vê "Parrot Bot entrou na sala".
              A tradução acontece de forma invisível e silenciosa no seu computador.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-sm transition-shadow">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm mb-3">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Latência Perceptual de 180ms</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Transcrição em chunks contínuos e sintetização neural com entonação humana natural,
              permitindo interrupções espontâneas sem travamentos.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
