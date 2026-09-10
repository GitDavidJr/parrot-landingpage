import React from 'react';
import { usePlatform } from '../utils/usePlatform';
import { Download, Play, Shield, Zap, Sparkles, Apple, Monitor } from 'lucide-react';

export const Hero: React.FC = () => {
  const platform = usePlatform();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Antigravity Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200/80 shadow-xs mb-8 text-xs font-semibold text-slate-700 hover:border-slate-300 transition-colors cursor-default">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-emerald-700 font-bold">Parrot 2.0</span>
          <span className="text-slate-300">|</span>
          <span>Tradução Bidirecional Direto no CoreAudio</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500 ml-0.5" />
        </div>

        {/* Display Typography */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 font-sans leading-[1.08] mb-6">
          Fale no seu idioma.{' '}
          <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600">
            A chamada escuta no dela.
          </span>
        </h1>

        {/* Crisp Subheading (Sem cara de IA) */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed mb-10">
          O Parrot roda direto no nível de áudio do sistema operacional. Ele isola e traduz conversas
          no <strong>Google Meet</strong>, <strong>Zoom</strong> e <strong>Teams</strong> em menos de 200 milissegundos.
          Sem robôs intrusivos na sala, sem ecos e com privacidade total.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href={platform.downloadUrl}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group"
          >
            {platform.os.startsWith('mac') ? (
              <Apple className="w-5 h-5 text-white" />
            ) : (
              <Monitor className="w-5 h-5 text-white" />
            )}
            <span>{platform.label}</span>
            <span className="px-2 py-0.5 text-xs bg-white/20 rounded-full font-mono text-white/90">
              {platform.badge.split('•')[0].trim()}
            </span>
          </a>

          <button
            onClick={() => scrollToSection('showcase')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm sm:text-base border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all duration-200 cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <Play className="w-3.5 h-3.5 text-emerald-700 fill-emerald-700 ml-0.5" />
            </div>
            <span>Ver em Reunião Real (27s)</span>
          </button>
        </div>

        {/* Real Product Proof Metrics */}
        <div className="pt-6 border-t border-slate-200/60 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
          <div className="p-3 rounded-2xl bg-white/70 border border-slate-100 shadow-2xs">
            <div className="flex items-center gap-2 text-emerald-600 font-mono text-sm font-bold mb-1">
              <Zap className="w-4 h-4" />
              <span>180ms</span>
            </div>
            <div className="text-xs font-semibold text-slate-800">Latência Ultrabaixa</div>
            <div className="text-[11px] text-slate-500">Pipeline Whisper streaming</div>
          </div>

          <div className="p-3 rounded-2xl bg-white/70 border border-slate-100 shadow-2xs">
            <div className="flex items-center gap-2 text-blue-600 font-mono text-sm font-bold mb-1">
              <Shield className="w-4 h-4" />
              <span>Zero Bots</span>
            </div>
            <div className="text-xs font-semibold text-slate-800">100% Invisível</div>
            <div className="text-[11px] text-slate-500">Nenhum bot entra na reunião</div>
          </div>

          <div className="p-3 rounded-2xl bg-white/70 border border-slate-100 shadow-2xs">
            <div className="flex items-center gap-2 text-purple-600 font-mono text-sm font-bold mb-1">
              <span>🎛️ 2 Canais</span>
            </div>
            <div className="text-xs font-semibold text-slate-800">Driver CoreAudio</div>
            <div className="text-[11px] text-slate-500">Isola microfone e saída</div>
          </div>

          <div className="p-3 rounded-2xl bg-white/70 border border-slate-100 shadow-2xs">
            <div className="flex items-center gap-2 text-amber-600 font-mono text-sm font-bold mb-1">
              <span>🌎 80+ Línguas</span>
            </div>
            <div className="text-xs font-semibold text-slate-800">Bidirecional</div>
            <div className="text-[11px] text-slate-500">Inglês, Português, Espanhol...</div>
          </div>
        </div>

      </div>
    </section>
  );
};
