import { usePlatform } from '../utils/usePlatform';
import { CheckCircle2, HeartHandshake } from 'lucide-react';
import { ParrotLogo } from './ParrotLogo';
import { PlatformBrandIcon } from './PlatformBrandIcon';

export const DownloadCTA: React.FC = () => {
  const platform = usePlatform();

  return (
    <section id="download" className="py-16 sm:py-24 bg-gradient-to-b from-white to-slate-100 border-t border-slate-200/80 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Raw Parrot Icon */}
        <ParrotLogo className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-5 sm:mb-6 transition-transform hover:scale-105 drop-shadow-md" />

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 font-sans mb-3 sm:mb-4">
          Pronto para atravessar a barreira do idioma?
        </h2>

        <p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8">Gratuito para você usar. Feito para continuar acessível a todos.</p>

        {/* Primary Download Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 w-full max-w-md sm:max-w-none mx-auto">
          <a
            href={platform.downloadUrl}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-10 py-3.5 sm:py-4 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5 cursor-pointer group"
          >
            <PlatformBrandIcon platform={platform.os.startsWith('mac') ? 'apple' : 'windows'} className="w-5 h-5 text-white" />
            <span>{platform.label}</span>
            <span className="px-2 sm:px-2.5 py-0.5 text-[11px] sm:text-xs bg-white/20 rounded-full font-mono text-white/90 truncate max-w-[140px] sm:max-w-none">
              {platform.fileName}
            </span>
          </a>

          <a
            href="#support"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm sm:text-base border border-slate-200 shadow-xs transition-colors cursor-pointer"
          >
            <HeartHandshake className="w-5 h-5" />
            <span>Apoiar a iniciativa</span>
          </a>
        </div>

        {/* System Compatibility Notes */}
        <div className="flex flex-col xs:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-6 text-xs text-slate-500 font-medium mb-6 sm:mb-12">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>macOS 13+ (Ventura, Sonoma, Sequoia)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Suporte Nativo a Apple Silicon M1/M2/M3/M4</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Windows 10 / 11 (WASAPI x64)</span>
          </span>
        </div>

      </div>
    </section>
  );
};
