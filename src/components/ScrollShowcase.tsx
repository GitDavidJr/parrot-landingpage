import React, { useEffect, useRef, useState } from 'react';
import { Mic, PhoneOff, Share2, Video } from 'lucide-react';
import { PlatformBrandIcon } from './PlatformBrandIcon';
import { usePlatform } from '../utils/usePlatform';

interface ChatMessage {
  id: string;
  side: 'remote' | 'local';
  translatedText: string;
  originalText: string;
  direction: string;
}

const ALL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    side: 'remote',
    translatedText: 'Oi! Podemos revisar a proposta antes da reunião com o cliente?',
    originalText: 'Hi! Can we review the proposal before the client meeting?',
    direction: 'EN → PT'
  },
  {
    id: 'msg-2',
    side: 'local',
    translatedText: 'Of course. I have already updated the timeline and the next steps.',
    originalText: 'Claro. Já atualizei o cronograma e os próximos passos.',
    direction: 'PT → EN'
  },
  {
    id: 'msg-3',
    side: 'remote',
    translatedText: 'Perfeito. Assim consigo apresentar tudo sem interromper a conversa.',
    originalText: 'Perfect. That way I can present everything without interrupting the conversation.',
    direction: 'EN → PT'
  },
  {
    id: 'msg-4',
    side: 'local',
    translatedText: "Great. I'll send the updated version right after our call.",
    originalText: 'Ótimo. Envio a versão atualizada logo depois da nossa chamada.',
    direction: 'PT → EN'
  }
];

type SequencePhase = 'opening' | 'conversation' | 'cta';

export const ScrollShowcase: React.FC = () => {
  const platform = usePlatform();
  const sectionRef = useRef<HTMLElement | null>(null);
  const firstVideoRef = useRef<HTMLVideoElement | null>(null);
  const secondVideoRef = useRef<HTMLVideoElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [phase, setPhase] = useState<SequencePhase>('opening');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      if (!isExpanded && rect.top <= viewport * 0.55 && rect.bottom >= viewport * 0.45) setIsExpanded(true);
      if (isExpanded && (rect.top > viewport * 0.72 || rect.bottom < viewport * 0.05)) setIsExpanded(false);
      if (rect.top < viewport * 0.8 && rect.bottom > viewport * 0.2) setHasStarted(true);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [isExpanded]);

  useEffect(() => {
    if (!hasStarted) return;

    [firstVideoRef.current, secondVideoRef.current].forEach((video) => {
      if (!video) return;
      video.currentTime = 0;
      void video.play().catch(() => undefined);
    });

    const timers = [
      window.setTimeout(() => setPhase('conversation'), 4000),
      window.setTimeout(() => setMessages([ALL_MESSAGES[0]]), 5300),
      window.setTimeout(() => setMessages(ALL_MESSAGES.slice(0, 2)), 10300),
      window.setTimeout(() => setMessages(ALL_MESSAGES.slice(0, 3)), 15300),
      window.setTimeout(() => setMessages(ALL_MESSAGES), 20300),
      window.setTimeout(() => setPhase('cta'), 25500)
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [hasStarted]);

  const isOpening = phase === 'opening';

  return (
    <section id="showcase" ref={sectionRef} className={`showcase-section relative overflow-hidden scroll-mt-20 ${isExpanded ? 'showcase-section-expanded' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="showcase-shell relative overflow-hidden rounded-[26px] bg-[#070a0f] border border-slate-800 shadow-2xl">
          <div className="h-12 px-5 sm:px-6 border-b border-white/[0.07] flex items-center justify-between text-[11px] sm:text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300">Chamada ativa · 2 participantes</span>
            </div>
          </div>

          <div className="showcase-stage relative h-[760px] lg:h-[640px] overflow-hidden" data-opening={isOpening}>
            <div
              className="showcase-participants"
            >
              <div
                className="showcase-participant showcase-participant-first absolute aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl"
              >
                <video ref={firstVideoRef} muted playsInline preload="metadata" className="w-full h-full object-cover">
                  <source src="/videos/maya-call.webm" type="video/webm" />
                  <source src="/videos/maya-call.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute left-3 bottom-3 inline-flex items-center gap-2 rounded-lg bg-black/60 backdrop-blur px-2.5 py-1.5 text-[10px] sm:text-xs font-semibold text-white">
                  <span className="px-1.5 py-0.5 rounded bg-blue-500 text-[9px]">EN</span>
                  Maya · Product
                </div>
              </div>

              <div
                className="showcase-participant showcase-participant-second absolute aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl z-20"
              >
                <video ref={secondVideoRef} muted playsInline preload="metadata" className="w-full h-full object-cover">
                  <source src="/videos/lucas-call.webm" type="video/webm" />
                  <source src="/videos/lucas-call.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute left-3 bottom-3 inline-flex items-center gap-2 rounded-lg bg-black/60 backdrop-blur px-2.5 py-1.5 text-[10px] sm:text-xs font-semibold text-white">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-[9px]">PT</span>
                  Lucas · Engineering
                </div>
              </div>

            </div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full bg-slate-900/95 border border-white/10 shadow-2xl" aria-label="Controles da chamada">
                {[Mic, Video, Share2].map((Icon, index) => (
                  <span key={index} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <Icon className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                  </span>
                ))}
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-rose-600 flex items-center justify-center text-white">
                  <PhoneOff className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                </span>
              </div>

            <aside
              className={`absolute left-3 right-3 bottom-20 h-[46%] sm:left-4 sm:right-4 lg:left-auto lg:right-5 lg:top-5 lg:bottom-20 lg:h-auto lg:w-[37%] transition-all duration-[1400ms] delay-150 ease-in-out ${
                isOpening ? 'opacity-0 translate-y-12 lg:translate-y-0 lg:translate-x-12 pointer-events-none' : 'opacity-100 translate-y-0 translate-x-0'
              }`}
            >
              <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
                <div className="h-full flex flex-col p-4 sm:p-5">
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.07]">
                    <div>
                      <p className="text-sm font-semibold text-white">Tradução ao vivo</p>
                      <p className="text-[10px] font-mono text-slate-500 mt-0.5">Original + voz entregue</p>
                    </div>
                    <div className="flex items-end gap-1 h-5" aria-hidden="true">
                      {[8, 14, 19, 11, 16, 7].map((height, index) => (
                        <span key={index} className="w-1 rounded-full bg-emerald-400 animate-wave" style={{ height: `${height}px`, animationDelay: `${index * 90}ms` }} />
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-end gap-2.5 py-4 overflow-hidden">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`max-w-[94%] rounded-2xl p-3 shadow-lg animate-message-in ${
                          message.side === 'local'
                            ? 'self-end bg-emerald-500 text-emerald-950 rounded-br-md'
                            : 'self-start bg-white text-slate-950 rounded-bl-md'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4 mb-1.5">
                          <span className={`text-[9px] font-mono font-bold ${message.side === 'local' ? 'text-emerald-950/60' : 'text-slate-400'}`}>{message.direction}</span>
                          <span className={`text-[9px] ${message.side === 'local' ? 'text-emerald-950/50' : 'text-slate-400'}`}>voz traduzida</span>
                        </div>
                        <p className="text-xs sm:text-[13px] leading-relaxed font-semibold">{message.translatedText}</p>
                        <p className={`mt-1.5 pt-1.5 border-t text-[9px] leading-relaxed ${message.side === 'local' ? 'border-emerald-700/15 text-emerald-950/60' : 'border-slate-100 text-slate-400'}`}>
                          {message.originalText}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {phase === 'cta' && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#05070b]/90 backdrop-blur-[3px] animate-message-in px-6">
              <div className="text-center max-w-2xl">
                <h3 className="text-3xl sm:text-5xl font-semibold tracking-[-0.04em] text-white leading-tight">
                  Leve sua voz para a próxima conversa.
                </h3>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href={platform.downloadUrl} className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-slate-950 hover:bg-emerald-50 text-sm font-bold transition-colors">
                    <PlatformBrandIcon platform={platform.os.startsWith('mac') ? 'apple' : 'windows'} className="w-4 h-4" />
                    {platform.label}
                  </a>
                  <a href="#support" className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-white/25 bg-white/[0.05] text-white hover:bg-white/10 text-sm font-semibold transition-colors">
                    Apoiar a iniciativa
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
