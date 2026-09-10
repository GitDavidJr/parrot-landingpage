import React, { useState, useEffect } from 'react';
import { usePlatform } from '../utils/usePlatform';
import { Download, ChevronDown, Check, Apple, Monitor } from 'lucide-react';
import { GithubIcon } from './GithubIcon';

export const Navbar: React.FC = () => {
  const platform = usePlatform();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo & Brand */}
        <a href="#" className="flex items-center gap-2.5 group cursor-pointer">
          <img src="/assets/icon.png" alt="Parrot" className="w-8 h-8 object-contain transition-transform group-hover:scale-105" />
          <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">Parrot</span>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#showcase" className="hover:text-slate-900 transition-colors cursor-pointer">
            Reunião em Vídeo
          </a>
          <a href="#simulator" className="hover:text-slate-900 transition-colors cursor-pointer">
            Simulador
          </a>
          <a href="#architecture" className="hover:text-slate-900 transition-colors cursor-pointer">
            CoreAudio Driver
          </a>
          <a href="#compare" className="hover:text-slate-900 transition-colors cursor-pointer">
            Comparativo
          </a>
          <a href="#faq" className="hover:text-slate-900 transition-colors cursor-pointer">
            Dúvidas
          </a>
        </nav>

        {/* Right CTAs */}
        <div className="flex items-center gap-3 relative">
          <a
            href="https://github.com/davidjunior/parrot"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          {/* Smart Download Pill Button */}
          <div className="relative">
            <div className="inline-flex rounded-full shadow-sm">
              <a
                href={platform.downloadUrl}
                className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-l-full transition-all cursor-pointer border-r border-slate-800"
              >
                {platform.os.startsWith('mac') ? (
                  <Apple className="w-4 h-4" />
                ) : (
                  <Monitor className="w-4 h-4" />
                )}
                <span>{platform.label}</span>
              </a>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-slate-950 hover:bg-slate-800 text-white px-2.5 py-2.5 rounded-r-full transition-colors cursor-pointer"
                aria-label="Escolher versão"
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Dropdown for OS architectures */}
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Selecione seu Sistema
                </div>
                
                <a
                  href="https://github.com/davidjunior/parrot/releases/latest/download/Parrot-macOS.dmg"
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-800 text-sm cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Apple className="w-4 h-4 text-slate-700" />
                    <div>
                      <div className="font-semibold text-xs">macOS (Apple Silicon M1-M4)</div>
                      <div className="text-[11px] text-slate-500">Universal .dmg • macOS 13+</div>
                    </div>
                  </div>
                  {platform.os === 'mac-arm' && <Check className="w-4 h-4 text-emerald-600" />}
                </a>

                <a
                  href="https://github.com/davidjunior/parrot/releases/latest/download/Parrot-macOS.dmg"
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-800 text-sm cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Apple className="w-4 h-4 text-slate-700" />
                    <div>
                      <div className="font-semibold text-xs">macOS (Intel x86_64)</div>
                      <div className="text-[11px] text-slate-500">Universal .dmg • macOS 13+</div>
                    </div>
                  </div>
                  {platform.os === 'mac-intel' && <Check className="w-4 h-4 text-emerald-600" />}
                </a>

                <a
                  href="https://github.com/davidjunior/parrot/releases/latest/download/Parrot-Windows-x64.zip"
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-800 text-sm cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Monitor className="w-4 h-4 text-slate-700" />
                    <div>
                      <div className="font-semibold text-xs">Windows 10 / 11 (x64)</div>
                      <div className="text-[11px] text-slate-500">Instalador Direto (.zip / .exe)</div>
                    </div>
                  </div>
                  {platform.os === 'windows' && <Check className="w-4 h-4 text-emerald-600" />}
                </a>

                <div className="border-t border-slate-100 my-1 pt-1">
                  <a
                    href="https://github.com/davidjunior/parrot/actions"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Compilação Automática via GitHub CI/CD</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
