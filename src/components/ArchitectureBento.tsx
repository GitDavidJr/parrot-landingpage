import React from 'react';
import { Cpu, ShieldCheck, Zap, Layers, Headphones, Laptop, Lock, Radio } from 'lucide-react';

export const ArchitectureBento: React.FC = () => {
  return (
    <section id="architecture" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 mb-4">
            <Layers className="w-3.5 h-3.5 text-slate-600" />
            <span>Engenharia de Áudio de Baixo Nível</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 font-sans">
            Construído para funcionar onde extensões e bots falham.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Bots de reunião são bloqueados por políticas corporativas de segurança. O Parrot opera no nível do
            driver de áudio do sistema operacional, tornando-o universal e invisível.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Card 1: CoreAudio Virtual Tap (Double Wide) */}
          <div className="md:col-span-2 lg:col-span-2 p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 shadow-xs">
                <Radio className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-bold mb-2">
                HAL CoreAudio Plugin
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Isolamento Bidirecional de 2 Canais
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                O maior desafio de tradução em chamadas é o eco: se o software reproduzir a tradução na mesma saída,
                o microfone capta de volta gerando uma cacofonia. O Parrot intercepta o fluxo via driver virtual nativo,
                dividindo o microfone do interlocutor e o som da sala em canais 100% isolados.
              </p>
            </div>

            {/* Architecture Diagram Snippet */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs font-mono text-slate-600 space-y-2">
              <div className="flex items-center justify-between">
                <span>[Microfone Físico]</span>
                <span className="text-emerald-600">➔ Canal 1: Local Speech (PT)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>[Meet / Zoom Audio]</span>
                <span className="text-blue-600">➔ Canal 2: Remote Audio (EN)</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-slate-400">
                <span>Loopback Filter:</span>
                <span className="text-emerald-700 font-bold">Ativo (Zero Eco Detectado)</span>
              </div>
            </div>
          </div>

          {/* Card 2: Zero Bot Security (Single) */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6 shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Zero Bots na Reunião
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Nenhum participante vê "Parrot Bot entrou na sala". Você não precisa de autorização de admin no
                Google Workspace ou Microsoft 365.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-blue-700">
              100% Compatível com Compliance Corporativo
            </div>
          </div>

          {/* Card 3: Apple Silicon & Windows Native */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-6 shadow-xs">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Apple Silicon & WASAPI
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Compilado nativamente para chips Apple M1/M2/M3/M4 e Windows x64. Consumo médio de apenas 3% de CPU,
                sem aquecer sua máquina.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-purple-700">
              Zero Impacto no Desempenho do Mac
            </div>
          </div>

          {/* Card 4: Universal App Compatibility (Double Wide) */}
          <div className="md:col-span-2 lg:col-span-2 p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-xs">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Compatibilidade Universal com Qualquer Plataforma
                </h3>
                <p className="text-xs text-slate-500">Sem necessidade de plugins ou extensões de navegador</p>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Como o Parrot atua como um dispositivo de áudio no macOS e Windows, ele funciona instantaneamente
              com qualquer software de comunicação moderno.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-white border border-slate-200 font-semibold text-xs text-slate-800">
                Google Meet
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 font-semibold text-xs text-slate-800">
                Zoom Meetings
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 font-semibold text-xs text-slate-800">
                Microsoft Teams
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 font-semibold text-xs text-slate-800">
                Discord / Slack
              </div>
            </div>
          </div>

          {/* Card 5: Local & Privacy First (Double Wide) */}
          <div className="md:col-span-2 lg:col-span-2 p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-200 text-slate-800 flex items-center justify-center shadow-xs">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Privacidade por Design (Zero Retenção)
                </h3>
                <p className="text-xs text-slate-500">Seus dados e reuniões nunca são armazenados</p>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              O fluxo de áudio é transmitido em memória e descartado imediatamente após a tradução ser reproduzida.
              Suas conversas de negócios, reuniões estratégicas e dados confidenciais nunca são indexados nem usados
              para treinamento de modelos.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>TLS 1.3 criptografado de ponta a ponta • Zero Logs em disco</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
