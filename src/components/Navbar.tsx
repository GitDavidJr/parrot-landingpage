import React, { useState, useEffect } from 'react';
import { usePlatform } from '../utils/usePlatform';
import { ChevronDown, Check, Menu, X } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { ParrotLogo } from './ParrotLogo';
import { PlatformBrandIcon } from './PlatformBrandIcon';

export const Navbar: React.FC = () => {
  const platform = usePlatform();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const delta = window.scrollY - lastScrollY;
      if (!mobileMenuOpen) {
        if (window.scrollY > 120 && delta > 3) setHidden(true);
        if (delta < -3 || window.scrollY < 40) setHidden(false);
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${hidden && !mobileMenuOpen ? '-translate-y-full opacity-0 pointer-events-none' : ''} ${
          scrolled || mobileMenuOpen
            ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <a href="#" onClick={closeMobileMenu} className="flex items-center gap-2.5 group cursor-pointer">
            <ParrotLogo className="w-8 h-8 transition-transform group-hover:scale-105 drop-shadow-xs" />
            <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">Parrot</span>
          </a>

          {/* Center Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#showcase" className="hover:text-slate-900 transition-colors cursor-pointer">
              Como funciona
            </a>
            <a href="#features" className="hover:text-slate-900 transition-colors cursor-pointer">
              Tecnologia
            </a>
            <a href="#compare" className="hover:text-slate-900 transition-colors cursor-pointer">
              Comparativo
            </a>
            <a href="#support" className="hover:text-slate-900 transition-colors cursor-pointer">
              Apoiadores
            </a>
            <a href="#faq" className="hover:text-slate-900 transition-colors cursor-pointer">
              Dúvidas
            </a>
          </nav>

          {/* Right CTAs (Desktop & Mobile) */}
          <div className="flex items-center gap-2 sm:gap-3 relative">
            <a
              href="https://github.com/GitDavidJr"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            {/* Mobile Compact Download Pill (Hidden on desktop) */}
            <a
              href={platform.downloadUrl}
              className="lg:hidden inline-flex items-center gap-1.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-2 rounded-full transition-all cursor-pointer shadow-xs"
            >
              <PlatformBrandIcon platform={platform.os.startsWith('mac') ? 'apple' : 'windows'} className="w-3.5 h-3.5" />
              <span>Baixar</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Smart Download Pill Button (Desktop only) */}
            <div className="relative hidden lg:block">
              <div className="inline-flex rounded-full shadow-sm">
                <a
                  href={platform.downloadUrl}
                  className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-l-full transition-all cursor-pointer border-r border-slate-800"
                >
                  <PlatformBrandIcon platform={platform.os.startsWith('mac') ? 'apple' : 'windows'} className="w-4 h-4" />
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
                    href="https://github.com/GitDavidJr/parrot/releases/latest/download/Parrot-macOS.dmg"
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-800 text-sm cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <PlatformBrandIcon platform="apple" className="w-4 h-4 text-slate-950" />
                      <div>
                        <div className="font-semibold text-xs">macOS (Apple Silicon M1-M4)</div>
                        <div className="text-[11px] text-slate-500">Universal .dmg • macOS 13+</div>
                      </div>
                    </div>
                    {platform.os === 'mac-arm' && <Check className="w-4 h-4 text-emerald-600" />}
                  </a>

                  <a
                    href="https://github.com/GitDavidJr/parrot/releases/latest/download/Parrot-macOS.dmg"
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-800 text-sm cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <PlatformBrandIcon platform="apple" className="w-4 h-4 text-slate-950" />
                      <div>
                        <div className="font-semibold text-xs">macOS (Intel x86_64)</div>
                        <div className="text-[11px] text-slate-500">Universal .dmg • macOS 13+</div>
                      </div>
                    </div>
                    {platform.os === 'mac-intel' && <Check className="w-4 h-4 text-emerald-600" />}
                  </a>

                  <a
                    href="https://github.com/GitDavidJr/parrot/releases/latest/download/Parrot-Windows-x64.zip"
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-800 text-sm cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <PlatformBrandIcon platform="windows" className="w-4 h-4 text-[#0078d4]" />
                      <div>
                        <div className="font-semibold text-xs">Windows 10 / 11 (x64)</div>
                        <div className="text-[11px] text-slate-500">Instalador Direto (.zip / .exe)</div>
                      </div>
                    </div>
                    {platform.os === 'windows' && <Check className="w-4 h-4 text-emerald-600" />}
                  </a>

                  <div className="border-t border-slate-100 my-1 pt-1">
                    <a
                      href="https://github.com/GitDavidJr/parrot/actions"
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

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-xl px-4 py-5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-1">
              <a
                href="#showcase"
                onClick={closeMobileMenu}
                className="px-3.5 py-2.5 rounded-xl text-slate-800 hover:bg-slate-100 hover:text-slate-950 font-medium text-sm transition-colors cursor-pointer"
              >
                Como funciona
              </a>
              <a
                href="#features"
                onClick={closeMobileMenu}
                className="px-3.5 py-2.5 rounded-xl text-slate-800 hover:bg-slate-100 hover:text-slate-950 font-medium text-sm transition-colors cursor-pointer"
              >
                Tecnologia
              </a>
              <a
                href="#compare"
                onClick={closeMobileMenu}
                className="px-3.5 py-2.5 rounded-xl text-slate-800 hover:bg-slate-100 hover:text-slate-950 font-medium text-sm transition-colors cursor-pointer"
              >
                Comparativo
              </a>
              <a
                href="#support"
                onClick={closeMobileMenu}
                className="px-3.5 py-2.5 rounded-xl text-slate-800 hover:bg-slate-100 hover:text-slate-950 font-medium text-sm transition-colors cursor-pointer"
              >
                Apoiadores
              </a>
              <a
                href="#faq"
                onClick={closeMobileMenu}
                className="px-3.5 py-2.5 rounded-xl text-slate-800 hover:bg-slate-100 hover:text-slate-950 font-medium text-sm transition-colors cursor-pointer"
              >
                Dúvidas
              </a>
            </nav>

            {/* Mobile Download Options */}
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
              <div className="px-3.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Baixar para Desktop
              </div>

              <a
                href="https://github.com/GitDavidJr/parrot/releases/latest/download/Parrot-macOS.dmg"
                onClick={closeMobileMenu}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-slate-800 text-sm cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <PlatformBrandIcon platform="apple" className="w-4 h-4 text-slate-950" />
                  <div>
                    <div className="font-semibold text-xs">macOS (Apple Silicon & Intel)</div>
                    <div className="text-[10px] text-slate-500">Universal .dmg • macOS 13+</div>
                  </div>
                </div>
                {platform.os.startsWith('mac') && <Check className="w-4 h-4 text-emerald-600" />}
              </a>

              <a
                href="https://github.com/GitDavidJr/parrot/releases/latest/download/Parrot-Windows-x64.zip"
                onClick={closeMobileMenu}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-slate-800 text-sm cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <PlatformBrandIcon platform="windows" className="w-4 h-4 text-[#0078d4]" />
                  <div>
                    <div className="font-semibold text-xs">Windows 10 / 11 (x64)</div>
                    <div className="text-[10px] text-slate-500">Instalador Direto (.zip / .exe)</div>
                  </div>
                </div>
                {platform.os === 'windows' && <Check className="w-4 h-4 text-emerald-600" />}
              </a>

              <div className="pt-2">
                <a
                  href="https://github.com/GitDavidJr"
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Ver repositório no GitHub</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40 lg:hidden cursor-pointer"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};
