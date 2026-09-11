import { usePlatform } from '../utils/usePlatform';
import { CheckCircle2, HeartHandshake } from 'lucide-react';
import { ParrotLogo } from './ParrotLogo';
import { PlatformBrandIcon } from './PlatformBrandIcon';

export const DownloadCTA: React.FC = () => {
  const platform = usePlatform();

  return (
    <section id="download" className="py-24 bg-gradient-to-b from-white to-slate-100 border-t border-slate-200/80 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Raw Parrot Icon */}
        <ParrotLogo className="w-16 h-16 mx-auto mb-6 transition-transform hover:scale-105 drop-shadow-md" />

        <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-slate-900 font-sans mb-4">
          Pronto para atravessar a barreira do idioma?
        </h2>

        <p className="text-slate-600 mb-8">Gratuito para você usar. Feito para continuar acessível a todos.</p>

        {/* Primary Download Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href={platform.downloadUrl}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-base shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5 cursor-pointer group"
          >
            <PlatformBrandIcon platform={platform.os.startsWith('mac') ? 'apple' : 'windows'} className="w-5 h-5 text-white" />
            <span>{platform.label}</span>
            <span className="px-2.5 py-0.5 text-xs bg-white/20 rounded-full font-mono text-white/90">
              {platform.fileName}
            </span>
          </a>

          <a
            href="#support"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-200 shadow-xs transition-colors cursor-pointer"
          >
            <HeartHandshake className="w-5 h-5" />
            <span>Apoiar a iniciativa</span>
          </a>
        </div>

        {/* System Compatibility Notes */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium mb-12">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            macOS 13+ (Ventura, Sonoma, Sequoia)
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Suporte Nativo a Apple Silicon M1/M2/M3/M4
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Windows 10 / 11 (WASAPI x64)
          </span>
        </div>

      </div>
    </section>
  );
};
