import React, { useState } from 'react';
import { Play, Volume2, ArrowRightLeft, Sparkles, Check, Mic, Activity } from 'lucide-react';

interface PresetPhrase {
  fromLang: string;
  toLang: string;
  fromFlag: string;
  toFlag: string;
  fromText: string;
  toText: string;
  latency: number;
  tag: string;
}

const PRESET_PHRASES: PresetPhrase[] = [
  {
    fromLang: 'en-US',
    toLang: 'pt-BR',
    fromFlag: '🇺🇸',
    toFlag: '🇧🇷',
    fromText: 'Could you walk me through your CoreAudio driver architecture and latency benchmarks?',
    toText: 'Você poderia me explicar a arquitetura do driver CoreAudio e os testes de latência?',
    latency: 168,
    tag: 'Engenharia / Tech Sync'
  },
  {
    fromLang: 'pt-BR',
    toLang: 'en-US',
    fromFlag: '🇧🇷',
    toFlag: '🇺🇸',
    fromText: 'Fechamos o contrato trimestral com o cliente da Europa e começamos o deploy hoje.',
    toText: 'We closed the quarterly contract with the European client and start the deployment today.',
    latency: 182,
    tag: 'Executivo / Negócios'
  },
  {
    fromLang: 'es-ES',
    toLang: 'pt-BR',
    fromFlag: '🇪🇸',
    toFlag: '🇧🇷',
    fromText: 'Nuestra prioridad para este trimestre es la integración de pagos sin fricción.',
    toText: 'Nossa prioridade para este trimestre é a integração de pagamentos sem atrito.',
    latency: 174,
    tag: 'Produto / Latam'
  },
  {
    fromLang: 'en-US',
    toLang: 'pt-BR',
    fromFlag: '🇺🇸',
    toFlag: '🇧🇷',
    fromText: 'Does Parrot isolate sound so meeting attendees don’t hear double audio?',
    toText: 'O Parrot isola o som para que os participantes da reunião não escutem áudio duplicado?',
    latency: 161,
    tag: 'Suporte / Dúvida Técnica'
  }
];

export const LiveSimulator: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const current = PRESET_PHRASES[selectedIdx];

  const handleSelectPreset = (idx: number) => {
    setSelectedIdx(idx);
    setIsTranslating(true);
    setTimeout(() => {
      setIsTranslating(false);
    }, 180);
  };

  const playSpeech = (text: string, lang: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 1.0;
    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section id="simulator" className="py-20 bg-slate-100/60 border-y border-slate-200/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200/80 mb-4">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>Simulador Interativo do Motor Neural</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 font-sans">
            Experimente o motor de tradução agora.
          </h2>
          <p className="mt-3 text-base text-slate-600 font-normal">
            Escolha um exemplo de reunião internacional e ouça a sintetização direta em áudio.
          </p>
        </div>

        {/* Preset Selector Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {PRESET_PHRASES.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedIdx === idx
                  ? 'bg-slate-950 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <span>{preset.fromFlag}</span>
              <span>→</span>
              <span>{preset.toFlag}</span>
              <span className="text-slate-400">|</span>
              <span>{preset.tag}</span>
            </button>
          ))}
        </div>

        {/* Interactive Translator Simulator Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden p-6 sm:p-8">
          
          {/* Card Header Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-lg">
                🦜
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">Parrot Neural Translator</div>
                <div className="text-xs text-slate-500">Pipeline Whisper Turbo + CoreAudio Bypass</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold border border-emerald-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Latência: {current.latency}ms</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                Isolamento: 100%
              </span>
            </div>
          </div>

          {/* Dual Channel Live Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            
            {/* Input Channel (What was said) */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5 text-slate-400" />
                    <span>Áudio de Entrada [{current.fromFlag}]</span>
                  </span>
                  <button
                    onClick={() => playSpeech(current.fromText, current.fromLang)}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                    title="Ouvir áudio original"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-slate-800 text-base sm:text-lg font-medium leading-relaxed italic">
                  "{current.fromText}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <span>Captura: Driver Virtual</span>
                <span className="font-mono text-emerald-600 font-semibold">● 48kHz Stereo</span>
              </div>
            </div>

            {/* Output Channel (What the caller hears) */}
            <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200/80 flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Tradução Neural [{current.toFlag}]</span>
                  </span>
                  <button
                    onClick={() => playSpeech(current.toText, current.toLang)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Ouvir Voz</span>
                  </button>
                </div>

                <p className={`text-slate-950 text-base sm:text-lg font-bold leading-relaxed transition-opacity ${isTranslating ? 'opacity-30' : 'opacity-100'}`}>
                  "{current.toText}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-200/60 flex items-center justify-between text-xs text-emerald-900 font-medium">
                <span>Saída: Fone / Alto-falante</span>
                <span className="font-mono text-emerald-700 font-semibold">● Sincronizado ({current.latency}ms)</span>
              </div>
            </div>

          </div>

          {/* Test Action Bar */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              Clique em <strong>"Ouvir Voz"</strong> para testar a voz sintetizada pelo seu próprio navegador.
            </div>

            <button
              onClick={() => playSpeech(current.toText, current.toLang)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Reproduzir Tradução com Áudio</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
