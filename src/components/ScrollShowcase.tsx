import React, { useState, useRef, useEffect } from 'react';
import { Mic, Video, Share2, PhoneOff, UserCheck, Shield } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'sarah' | 'david';
  translatedText: string;
  originalText: string;
}

const ALL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'sarah',
    translatedText: 'Oi David! Obrigado por entrar. Como está o lançamento do Parrot?',
    originalText: 'Hey David! Thanks for joining. How is the Parrot launch looking?'
  },
  {
    id: 'msg-2',
    sender: 'david',
    translatedText: 'Hey Sarah! The CoreAudio driver is running smoothly with zero echo.',
    originalText: 'Fala Sarah! O driver CoreAudio tá rodando liso, com zero eco.'
  },
  {
    id: 'msg-3',
    sender: 'sarah',
    translatedText: 'Incrível! Nós dois podemos falar naturalmente nos nossos idiomas.',
    originalText: 'Incredible! Both of us can speak naturally in our own languages.'
  },
  {
    id: 'msg-4',
    sender: 'david',
    translatedText: "Exactly! It's as if the language barrier simply didn't exist.",
    originalText: 'Exato! É como se a barreira de idioma não existisse.'
  }
];

export const ScrollShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sarahVideoRef = useRef<HTMLVideoElement | null>(null);
  const davidVideoRef = useRef<HTMLVideoElement | null>(null);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  // Animation states
  const [sarahJoined, setSarahJoined] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Track scroll expansion
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Expansion progression
      const start = windowH * 0.95;
      const end = windowH * 0.15;
      const current = rect.top;

      let progress = (start - current) / (start - end);
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);

      // In view detection
      if (rect.top < windowH * 0.8 && rect.bottom > 100) {
        if (!isInView) setIsInView(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInView]);

  // Sequence runner when in view
  useEffect(() => {
    if (!isInView) return;

    let timers: ReturnType<typeof setTimeout>[] = [];

    const startSequence = () => {
      // Step 0: Reset
      setSarahJoined(false);
      setShowToast(false);
      setMessages([]);

      if (davidVideoRef.current) {
        davidVideoRef.current.currentTime = 0;
        davidVideoRef.current.play().catch(() => {});
      }

      // Step 1: Sarah joins at 1.2s
      timers.push(
        setTimeout(() => {
          setShowToast(true);
          setSarahJoined(true);
          if (sarahVideoRef.current) {
            sarahVideoRef.current.currentTime = 0;
            sarahVideoRef.current.play().catch(() => {});
          }
        }, 1200)
      );

      // Hide toast at 4.0s
      timers.push(
        setTimeout(() => {
          setShowToast(false);
        }, 4000)
      );

      // Step 2: Sarah message 1 at 3.5s
      timers.push(
        setTimeout(() => {
          setMessages((prev) => [...prev, ALL_MESSAGES[0]]);
        }, 3500)
      );

      // Step 3: David message 1 at 8.5s
      timers.push(
        setTimeout(() => {
          setMessages((prev) => [...prev, ALL_MESSAGES[1]]);
        }, 8500)
      );

      // Step 4: Sarah message 2 at 14.5s
      timers.push(
        setTimeout(() => {
          setMessages((prev) => [...prev, ALL_MESSAGES[2]]);
        }, 14500)
      );

      // Step 5: David message 2 at 20.5s
      timers.push(
        setTimeout(() => {
          setMessages((prev) => [...prev, ALL_MESSAGES[3]]);
        }, 20500)
      );

      // Step 6: Loop after 30s
      timers.push(
        setTimeout(() => {
          startSequence();
        }, 30000)
      );
    };

    startSequence();

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [isInView]);

  // Auto-scroll chat to bottom as new messages arrive
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  // Antigravity scroll expansion
  const scale = 0.94 + scrollProgress * 0.06;
  const borderRadius = 32 - scrollProgress * 14;

  return (
    <section id="showcase" ref={containerRef} className="py-8 sm:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Seamless Motion Meeting Container */}
        <div
          className="transition-all duration-300 ease-out origin-center mx-auto relative shadow-2xl overflow-hidden bg-[#070a0f] border border-slate-800"
          style={{
            transform: `scale(${scale})`,
            borderRadius: `${borderRadius}px`,
          }}
        >
          {/* Top Status Bar */}
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-semibold">
                {sarahJoined ? 'Chamada Ativa • 2 participantes' : 'Conectado na sala • 1 participante'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>CoreAudio Virtual Tap • Zero Bots</span>
            </div>
          </div>

          {/* Main Visual Stage */}
          <div className="relative min-h-[520px] lg:h-[620px] p-6 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left/Center: Video Participants Area */}
            <div className="relative w-full lg:w-[62%] h-[380px] lg:h-full flex items-center justify-center">
              
              {/* Join Toast */}
              {showToast && (
                <div className="absolute top-2 z-30 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-semibold border border-white/10 shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-300">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span>Sarah Jenkins conectou na chamada</span>
                </div>
              )}

              {/* Tile 1: Sarah (Top Left) */}
              <div
                className={`absolute left-0 top-0 w-[62%] sm:w-[54%] max-w-[420px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 ease-out z-10 ${
                  sarahJoined
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-90 -translate-y-4 pointer-events-none'
                }`}
              >
                <video
                  ref={sarahVideoRef}
                  src="/videos/sarah-stream.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tile 2: David (Bottom Center / Right) */}
              <div className="absolute right-4 bottom-8 sm:right-10 sm:bottom-10 w-[62%] sm:w-[54%] max-w-[420px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl z-20">
                <video
                  ref={davidVideoRef}
                  src="/videos/david-stream.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Meeting Call Control Buttons at Bottom */}
              <div className="absolute bottom-0 inset-x-0 flex justify-center z-30 pb-1">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl">
                  <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer" title="Microfone">
                    <Mic className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer" title="Câmera">
                    <Video className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer" title="Compartilhar Tela">
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-rose-600 hover:bg-rose-500 flex items-center justify-center text-white transition-colors cursor-pointer" title="Encerrar">
                    <PhoneOff className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Right: Dedicated WhatsApp-Style Stacked Translation Chat Stream */}
            <div className="w-full lg:w-[35%] max-w-[420px] flex flex-col items-center justify-end h-full">
              
              {/* Clean Single Centered Parrot Logo Squircle */}
              <div className="w-11 h-11 rounded-2xl bg-white shadow-md border border-slate-200/50 flex items-center justify-center p-2 mb-4 shrink-0">
                <img src="/assets/icon-flat.svg" alt="Parrot" className="w-full h-full object-contain" />
              </div>

              {/* Stacked Chat Feed */}
              <div
                ref={chatScrollRef}
                className="w-full h-[400px] flex flex-col gap-3 justify-end overflow-y-auto px-1 py-2"
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%)'
                }}
              >
                {messages.length === 0 && (
                  <div className="text-center text-slate-500 text-xs font-mono py-12">
                    Aguardando início da fala...
                  </div>
                )}

                {messages.map((msg) => {
                  const isDavid = msg.sender === 'david';

                  if (isDavid) {
                    // Green / Emerald bubble on the right side
                    return (
                      <div
                        key={msg.id}
                        className="self-end max-w-[92%] bg-emerald-600 text-white rounded-2xl rounded-tr-xs p-4 shadow-lg border border-emerald-500/40 animate-in fade-in slide-in-from-bottom-3 duration-300"
                      >
                        {/* Translated text in English on top */}
                        <div className="text-sm font-medium text-white leading-relaxed">
                          {msg.translatedText}
                        </div>
                        {/* Original spoken Portuguese subtitle underneath */}
                        <div className="text-[11px] text-emerald-100/75 mt-1.5 pt-1.5 border-t border-emerald-500/60 font-mono">
                          {msg.originalText}
                        </div>
                      </div>
                    );
                  }

                  // White bubble on the left side
                  return (
                    <div
                      key={msg.id}
                      className="self-start max-w-[92%] bg-white text-slate-900 rounded-2xl rounded-tl-xs p-4 shadow-lg border border-slate-200/80 animate-in fade-in slide-in-from-bottom-3 duration-300"
                    >
                      {/* Translated text in Portuguese on top */}
                      <div className="text-sm font-medium text-slate-900 leading-relaxed">
                        {msg.translatedText}
                      </div>
                      {/* Original spoken English subtitle underneath */}
                      <div className="text-[11px] text-slate-400 mt-1.5 pt-1.5 border-t border-slate-100 font-mono">
                        {msg.originalText}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
