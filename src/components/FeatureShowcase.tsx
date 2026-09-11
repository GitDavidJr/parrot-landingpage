import React, { useState, useEffect } from 'react';
import { Radio, Check, Mic } from 'lucide-react';

export const FeatureShowcase: React.FC = () => {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => (p + 1) % 100);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="features" className="pt-12 sm:pt-16 pb-20 lg:pt-20 lg:pb-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 lg:space-y-32">

        {/* ============================================================ */}
        {/* SHOWCASE 1: CoreAudio & WASAPI Driver                        */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Typography & Copy */}
          <div className="lg:col-span-5">
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-slate-900 font-sans leading-[1.15] mb-6">
              Driver CoreAudio & WASAPI
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Isolamento bidirecional direto no nível do sistema operacional. O microfone e o áudio da chamada
              rodam em canais separados — reduzindo eco e retorno sem exigir um bot dentro da reunião.
            </p>
          </div>

          {/* Right: Mac System Window (Sem card em volta de card) */}
          <div className="lg:col-span-7">
            <div className="w-full bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8">
              
              {/* Window Header with Traffic Lights */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span className="ml-2 text-xs font-semibold text-slate-500 font-mono">
                    macOS CoreAudio • Virtual Audio Device
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Driver Ativo</span>
                </div>
              </div>

              {/* Channel Routing Visualizer */}
              <div className="space-y-6 font-mono text-xs">
                
                {/* Channel 1: Mic Input */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-slate-800 font-semibold">
                      <Mic className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Canal 1: Microfone Físico</span>
                    </div>
                    <span className="text-emerald-700 font-bold text-[11px]">Local Speech (PT)</span>
                  </div>
                  {/* Live Wave Meter */}
                  <div className="flex items-center gap-1 h-3 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                    {[65, 80, 45, 90, 70, 85, 40, 75, 95, 60, 80, 50, 70, 85, 60, 40].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-emerald-500 rounded-full transition-all duration-300"
                        style={{
                          height: `${Math.max(20, (h * (0.6 + ((pulse + i * 5) % 10) * 0.04)))}%`,
                          opacity: 0.8 + (i % 2) * 0.2
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Channel 2: Room Audio */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-slate-800 font-semibold">
                      <Radio className="w-3.5 h-3.5 text-blue-600" />
                      <span>Canal 2: Áudio da Chamada</span>
                    </div>
                    <span className="text-blue-700 font-bold text-[11px]">Remote Audio (EN)</span>
                  </div>
                  {/* Live Wave Meter */}
                  <div className="flex items-center gap-1 h-3 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                    {[40, 70, 85, 60, 95, 75, 80, 50, 65, 80, 45, 90, 70, 60, 75, 45].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-blue-500 rounded-full transition-all duration-300"
                        style={{
                          height: `${Math.max(20, (h * (0.6 + ((pulse + i * 7) % 10) * 0.04)))}%`,
                          opacity: 0.8 + (i % 2) * 0.2
                        }}
                      />
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Spec Footer */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Filtro de Loopback: Zero Eco</span>
                </div>
                <div className="text-slate-700 font-bold">Pipeline em streaming</div>
              </div>

            </div>
          </div>

        </div>


        {/* ============================================================ */}
        {/* SHOWCASE 2: 100% Invisível / Zero Bots                       */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Right on Mobile / Left on Desktop: Typography & Copy */}
          <div className="lg:col-span-5 lg:order-2">
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-slate-900 font-sans leading-[1.15] mb-6">
              100% Invisível
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Nenhum robô entra na sala do Google Meet, Zoom ou Teams. Suas conversas não sofrem
              bloqueios de segurança corporativa, e nenhum dado de áudio é retido ou salvo em disco.
            </p>
          </div>

          {/* Terminal Window (Sem card em volta de card) */}
          <div className="lg:col-span-7 lg:order-1">
            <div className="w-full bg-[#0b0f19] rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl">
              
              {/* Traffic Lights */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-800/80 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span className="ml-2 text-xs font-mono text-slate-400">parrot-service — local runtime</span>
                </div>
                <div className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>0 bots ativos</span>
                </div>
              </div>

              {/* Monospace Log Lines */}
              <div className="font-mono text-xs text-slate-300 space-y-3">
                <div className="text-slate-400">
                  <span className="text-emerald-400">$</span> parrot start --mode=bidirectional --privacy=zero-retention
                </div>
                <div className="text-emerald-400">
                  ✓ CoreAudio HAL driver loaded [Perssua/VirtualAudio]
                </div>
                <div className="text-slate-300">
                  ✓ Audio buffer: 2 channels @ 24kHz float32
                </div>
                <div className="text-slate-300">
                  ✓ Google Meet hooked: Zero meeting bots injected
                </div>
                <div className="text-blue-400">
                  ✓ Corporate security policy: 100% compliant
                </div>
                <div className="pt-3 border-t border-slate-800 text-slate-400 flex items-center justify-between">
                  <span>Retenção em disco: 0 bytes</span>
                  <span className="text-emerald-400 font-bold">● Streaming Ativo</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
