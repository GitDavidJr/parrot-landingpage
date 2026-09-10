import { usePlatform } from '../utils/usePlatform';
import { Download, Apple, Monitor, Terminal, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './GithubIcon';

export const DownloadCTA: React.FC = () => {
  const platform = usePlatform();

  return (
    <section id="download" className="py-24 bg-gradient-to-b from-white to-slate-100 border-t border-slate-200/80 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Raw Parrot Icon */}
        <img src="/assets/icon.png" alt="Parrot" className="w-16 h-16 object-contain mx-auto mb-6 transition-transform hover:scale-105" />

        <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-slate-900 font-sans mb-8">
          Pronto para falar qualquer idioma?
        </h2>

        {/* Primary Download Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href={platform.downloadUrl}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-base shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5 cursor-pointer group"
          >
            {platform.os.startsWith('mac') ? (
              <Apple className="w-5 h-5 text-white" />
            ) : (
              <Monitor className="w-5 h-5 text-white" />
            )}
            <span>{platform.label}</span>
            <span className="px-2.5 py-0.5 text-xs bg-white/20 rounded-full font-mono text-white/90">
              {platform.fileName}
            </span>
          </a>

          <a
            href="https://github.com/davidjunior/parrot"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-200 shadow-xs transition-colors cursor-pointer"
          >
            <GithubIcon className="w-5 h-5" />
            <span>Ver no GitHub</span>
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

        {/* Developer Terminal Snippet */}
        <div className="max-w-xl mx-auto p-4 rounded-2xl bg-slate-900 text-slate-300 text-left font-mono text-xs shadow-md border border-slate-800">
          <div className="flex items-center justify-between text-slate-500 pb-2 mb-2 border-b border-slate-800 text-[11px]">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Para desenvolvedores que preferem rodar via terminal:</span>
            </div>
            <span>bash</span>
          </div>
          <div className="text-emerald-400">git clone https://github.com/davidjunior/parrot.git</div>
          <div className="text-slate-300">cd parrot/app && ./start.sh</div>
        </div>

      </div>
    </section>
  );
};
