import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

interface SimulatorScenario {
  id: string;
  sourceLang: string;
  targetLang: string;
  label: string;
  sourceText: string;
  translatedText: string;
  targetLocale: string;
}

const SCENARIOS: SimulatorScenario[] = [
  {
    id: 'en-pt',
    sourceLang: 'Inglês',
    targetLang: 'Português',
    label: 'Inglês ➔ Português',
    sourceText: 'Could you walk me through your CoreAudio driver architecture and latency benchmarks?',
    translatedText: 'Você poderia me explicar a arquitetura do driver CoreAudio e os testes de latência?',
    targetLocale: 'pt-BR'
  },
  {
    id: 'pt-en',
    sourceLang: 'Português',
    targetLang: 'Inglês',
    label: 'Português ➔ Inglês',
    sourceText: 'O driver virtual opera diretamente no kernel do macOS, isolando o microfone da saída da chamada.',
    translatedText: 'The virtual driver operates directly in the macOS kernel, isolating the microphone from the call output.',
    targetLocale: 'en-US'
  },
  {
    id: 'es-pt',
    sourceLang: 'Espanhol',
    targetLang: 'Português',
    label: 'Espanhol ➔ Português',
    sourceText: 'Nuestra prioridad para este trimestre es la traducción en tiempo real con cero interferencia.',
    translatedText: 'Nossa prioridade para este trimestre é a tradução em tempo real com zero interferência.',
    targetLocale: 'pt-BR'
  }
];

export const LiveSimulator: React.FC = () => {
  const [selectedId, setSelectedId] = useState('en-pt');
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const activeScenario = SCENARIOS.find((s) => s.id === selectedId) || SCENARIOS[0];

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const handlePlayAudio = () => {
    if (!synthRef.current) return;

    if (isPlaying) {
      synthRef.current.cancel();
      setIsPlaying(false);
      return;
    }

    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(activeScenario.translatedText);
    utterance.lang = activeScenario.targetLocale;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    synthRef.current.speak(utterance);
  };

  return (
    <section id="simulator" className="py-20 lg:py-32 bg-slate-50/50 border-t border-slate-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Typography & Copy */}
          <div className="lg:col-span-5">
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-slate-900 font-sans leading-[1.15] mb-6">
              Simulador em Tempo Real
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Experimente a sintetização neural agora mesmo. Alterne os idiomas e reproduza o áudio
              traduzido com entonação natural e latência de 180ms.
            </p>
          </div>

          {/* Right: Single Clean Window (Sem card em volta de card) */}
          <div className="lg:col-span-7">
            <div className="w-full bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8">
              
              {/* Clean Language Switcher */}
              <div className="flex items-center gap-2 pb-5 border-b border-slate-100 mb-6 overflow-x-auto">
                {SCENARIOS.map((scenario) => {
                  const active = scenario.id === selectedId;
                  return (
                    <button
                      key={scenario.id}
                      onClick={() => {
                        if (isPlaying && synthRef.current) synthRef.current.cancel();
                        setIsPlaying(false);
                        setSelectedId(scenario.id);
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-slate-950 text-white shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {scenario.label}
                    </button>
                  );
                })}
              </div>

              {/* Speech Input */}
              <div className="mb-5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                  Fala Original ({activeScenario.sourceLang})
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 font-medium leading-relaxed">
                  "{activeScenario.sourceText}"
                </div>
              </div>

              {/* Translation Output */}
              <div className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 font-bold">
                    Tradução por Voz ({activeScenario.targetLang})
                  </div>
                  <span className="text-[11px] font-mono text-emerald-700 font-bold">180ms</span>
                </div>
                
                <div className="text-base font-semibold text-emerald-950 leading-relaxed mb-4">
                  "{activeScenario.translatedText}"
                </div>

                {/* Audio Playback Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-emerald-200/60">
                  <button
                    onClick={handlePlayAudio}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span>{isPlaying ? 'Pausar Áudio' : 'Ouvir Tradução por Voz'}</span>
                  </button>

                  {/* Animated Wave Indicator */}
                  <div className="flex items-center gap-1 h-3">
                    {[40, 80, 50, 100, 60, 90, 45, 75].map((h, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all duration-200 ${
                          isPlaying ? 'bg-emerald-600 animate-pulse' : 'bg-emerald-300'
                        }`}
                        style={{
                          height: isPlaying ? `${Math.max(30, h)}%` : '30%'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer status */}
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Pipeline Whisper Streaming</span>
                <span className="text-emerald-600 font-bold">● Áudio Cristalino</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
