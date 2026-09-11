import React from 'react';
import { ArrowUpRight, Code2, HeartHandshake, Server } from 'lucide-react';
import { GithubIcon } from './GithubIcon';

const SUPPORT_PATHS = [
  {
    icon: Code2,
    title: 'Ajude a construir',
    text: 'Ideias, testes e pequenas melhorias ajudam o Parrot a chegar a mais pessoas.'
  },
  {
    icon: Server,
    title: 'Ajude a manter',
    text: 'Sua contribuição ajuda a manter o projeto disponível, cuidado e acessível.'
  },
  {
    icon: HeartHandshake,
    title: 'Conte para outras pessoas',
    text: 'Compartilhe, experimente em uma chamada e ajude mais gente a conversar sem barreiras.'
  }
];

export const Supporters: React.FC = () => {
  return (
    <section id="support" className="py-16 sm:py-24 lg:py-32 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 support-grid opacity-25" aria-hidden="true" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[760px] h-[420px] rounded-full bg-emerald-500/15 blur-[110px]" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20 items-start">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-emerald-400 font-bold">Apoie o Parrot</span>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.04em] leading-[1.12] sm:leading-[1.08]">
              Conversas melhores.<br className="hidden sm:inline" /> Com gente por trás.
            </h2>
            <p className="mt-4 sm:mt-6 text-slate-400 text-sm sm:text-lg leading-relaxed max-w-xl">
              O Parrot existe para aproximar pessoas que falam idiomas diferentes. Quem apoia ajuda a manter essa ferramenta disponível e em constante evolução.
            </p>

            <a
              href="https://github.com/GitDavidJr"
              target="_blank"
              rel="noreferrer"
              className="mt-6 sm:mt-8 w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-slate-950 hover:bg-emerald-50 font-bold text-sm transition-colors cursor-pointer"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Quero apoiar a iniciativa</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="space-y-3">
            {SUPPORT_PATHS.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="group flex gap-3.5 sm:gap-5 p-4 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.035] hover:bg-white/[0.06] hover:border-emerald-400/30 transition-colors">
                <span className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </span>
                <div>
                  <div className="flex items-center gap-3 mb-1 sm:mb-1.5">
                    <span className="text-[10px] font-mono text-slate-500">0{index + 1}</span>
                    <h3 className="font-bold text-white text-sm sm:text-base">{title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-400">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="relative mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
          <p className="text-slate-400">Apoiadores fundadores</p>
          <p className="text-slate-500">Este espaço será de quem ajudar o Parrot a chegar mais longe.</p>
        </div>
      </div>
    </section>
  );
};
