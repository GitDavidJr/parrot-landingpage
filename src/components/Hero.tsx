import React from 'react';
import { usePlatform } from '../utils/usePlatform';
import { PlatformBrandIcon } from './PlatformBrandIcon';
import { VoiceDemo } from './VoiceDemo';

export const Hero: React.FC = () => {
  const platform = usePlatform();

  return (
    <section id="home" className="relative min-h-[84vh] sm:min-h-[88vh] flex flex-col justify-center items-center pt-24 pb-14 sm:pt-32 sm:pb-20 overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-70" aria-hidden="true" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[620px] h-[420px] bg-emerald-200/25 blur-[120px] rounded-full" aria-hidden="true" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-slate-200 text-xs font-semibold text-slate-600 shadow-sm mb-6 sm:mb-7 backdrop-blur max-w-[90vw]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
          <span className="truncate">Uma ferramenta feita para aproximar pessoas.</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-[-0.04em] text-slate-950 font-sans leading-[1.12] sm:leading-[1.05] mb-5 sm:mb-6">
          Fale no seu idioma.{' '}
          <span className="text-emerald-600 block sm:inline">
            A chamada escuta no dela.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-lg leading-relaxed text-slate-600 mb-8 sm:mb-9">
          Fale normalmente em qualquer chamada. O Parrot traduz sua voz enquanto a conversa acontece.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs sm:max-w-none mx-auto">
          <a
            href={platform.downloadUrl}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group"
          >
            <PlatformBrandIcon platform={platform.os.startsWith('mac') ? 'apple' : 'windows'} className="w-5 h-5" />
            <span>{platform.label}</span>
          </a>
          <VoiceDemo />
        </div>
      </div>
    </section>
  );
};
