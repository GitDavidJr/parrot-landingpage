import React from 'react';
import { Check, X, Minus } from 'lucide-react';

interface Row {
  feature: string;
  parrot: boolean | string;
  bots: boolean | string;
  captions: boolean | string;
  hardware: boolean | string;
}

const COMPARISONS: Row[] = [
  {
    feature: 'Tradução por Voz (Áudio Falado Bidirecional)',
    parrot: 'Sim (Voz Neural)',
    bots: false,
    captions: false,
    hardware: 'Parcial (Sem áudio de chamada)'
  },
  {
    feature: 'Zero Bots na Sala de Reunião',
    parrot: true,
    bots: false,
    captions: true,
    hardware: true
  },
  {
    feature: 'Latência do Pipeline',
    parrot: 'Streaming em tempo real',
    bots: '1.5s - 3s',
    captions: '1s - 2s',
    hardware: '2s - 4s'
  },
  {
    feature: 'Isolamento de Eco (Driver CoreAudio)',
    parrot: true,
    bots: false,
    captions: false,
    hardware: false
  },
  {
    feature: 'Funciona em Qualquer App (Meet, Zoom, Teams, Discord)',
    parrot: true,
    bots: 'Depende de Permissão',
    captions: 'Apenas no próprio app',
    hardware: false
  },
  {
    feature: 'Aprovação de TI / Segurança Corporativa',
    parrot: 'Invisível (Driver Local)',
    bots: 'Geralmente Bloqueado',
    captions: 'Sim',
    hardware: 'N/A'
  },
  {
    feature: 'Retenção Zero de Dados de Reunião',
    parrot: true,
    bots: false,
    captions: 'Varia',
    hardware: 'Varia'
  }
];

export const ComparisonTable: React.FC = () => {
  return (
    <section id="compare" className="py-24 bg-slate-50/50 border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-slate-900 font-sans">
            Por que o Parrot é diferente
          </h2>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/90 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70">
                <th className="py-5 px-6 text-sm font-bold text-slate-900 w-1/3">
                  Recurso / Capacidade
                </th>
                <th className="py-5 px-6 text-sm font-bold text-emerald-700 bg-emerald-50/60 w-1/4">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🦜</span>
                    <span>Parrot 2.0</span>
                  </div>
                </th>
                <th className="py-5 px-6 text-sm font-semibold text-slate-600">
                  Bots de Reunião (Otter, Fireflies)
                </th>
                <th className="py-5 px-6 text-sm font-semibold text-slate-600">
                  Legendas Nativas (Meet / Zoom)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {COMPARISONS.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-900">
                    {row.feature}
                  </td>

                  {/* Parrot Column (Highlighted) */}
                  <td className="py-4 px-6 bg-emerald-50/30 font-semibold text-emerald-900">
                    {typeof row.parrot === 'boolean' ? (
                      row.parrot ? (
                        <div className="inline-flex items-center gap-1.5 text-emerald-700">
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Sim</span>
                        </div>
                      ) : (
                        <X className="w-4 h-4 text-slate-300" />
                      )
                    ) : (
                      <span className="text-emerald-800 font-bold">{row.parrot}</span>
                    )}
                  </td>

                  {/* Bots Column */}
                  <td className="py-4 px-6 text-slate-600">
                    {typeof row.bots === 'boolean' ? (
                      row.bots ? (
                        <Check className="w-4 h-4 text-slate-700" />
                      ) : (
                        <div className="inline-flex items-center gap-1.5 text-rose-600">
                          <X className="w-4 h-4" />
                          <span>Não</span>
                        </div>
                      )
                    ) : (
                      <span>{row.bots}</span>
                    )}
                  </td>

                  {/* Captions Column */}
                  <td className="py-4 px-6 text-slate-600">
                    {typeof row.captions === 'boolean' ? (
                      row.captions ? (
                        <Check className="w-4 h-4 text-slate-700" />
                      ) : (
                        <div className="inline-flex items-center gap-1.5 text-rose-600">
                          <X className="w-4 h-4" />
                          <span>Não</span>
                        </div>
                      )
                    ) : (
                      <span>{row.captions}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};
