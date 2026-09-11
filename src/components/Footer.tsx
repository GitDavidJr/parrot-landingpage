import React from 'react';
import { GithubIcon } from './GithubIcon';
import { ParrotLogo } from './ParrotLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start text-center sm:text-left gap-2 sm:gap-3">
          <ParrotLogo className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-xs shrink-0" />
          <span className="font-bold text-slate-900 text-sm">Parrot</span>
          <span className="hidden xs:inline text-xs text-slate-400">|</span>
          <span className="text-xs text-slate-500">
            © {new Date().getFullYear()} Parrot Project. Código aberto sob licença MIT.
          </span>
        </div>

        {/* Navigation / Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-600">
          <a href="#showcase" className="hover:text-slate-900 transition-colors cursor-pointer">
            Reunião em Vídeo
          </a>
          <a href="#features" className="hover:text-slate-900 transition-colors cursor-pointer">
            Tecnologia
          </a>
          <a href="#support" className="hover:text-slate-900 transition-colors cursor-pointer">
            Apoiadores
          </a>
          <a
            href="https://github.com/GitDavidJr"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>

      </div>
    </footer>
  );
};
