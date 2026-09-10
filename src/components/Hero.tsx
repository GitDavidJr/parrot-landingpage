import React from 'react';
import { usePlatform } from '../utils/usePlatform';
import { Apple, Monitor } from 'lucide-react';

export const Hero: React.FC = () => {
  const platform = usePlatform();

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center items-center pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">
        {/* Clean, Direct Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 font-sans leading-[1.1] mb-8">
          Fale no seu idioma.{' '}
          <span className="text-emerald-600 block sm:inline">
            A chamada escuta no dela.
          </span>
        </h1>

        {/* Single Primary Action Button */}
        <div className="flex items-center justify-center">
          <a
            href={platform.downloadUrl}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group"
          >
            {platform.os.startsWith('mac') ? (
              <Apple className="w-5 h-5 text-white" />
            ) : (
              <Monitor className="w-5 h-5 text-white" />
            )}
            <span>{platform.label}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
