import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: 'Como o Parrot intercepta o áudio sem dar eco na chamada?',
    a: 'O Parrot instala um plugin virtual de CoreAudio no macOS (ou driver de loopback no Windows). Ele cria dois dispositivos virtuais distintos: um canal exclusivo para o que entra pelo microfone e outro para o som do Google Meet/Zoom. Assim, a voz sintetizada pelo Parrot vai direto para o fone ou para o canal de entrada sem nunca reentrar no microfone, eliminando qualquer tipo de eco ou retorno acústico.'
  },
  {
    q: 'As outras pessoas na chamada vão ver algum bot ou notificação?',
    a: 'Não. O Parrot roda como um software desktop comum no seu computador (assim como o Slack ou Spotify). Ele não precisa de link de convite, não pede permissão na sala e nenhum participante recebe notificações. É completamente invisível e privado.'
  },
  {
    q: 'Quais idiomas são suportados?',
    a: 'Mais de 80 idiomas e dialetos com tradução bidirecional fluente, incluindo Inglês (EUA, UK, Austrália, Índia), Português (Brasil e Portugal), Espanhol (América Latina e Espanha), Francês, Alemão, Italiano, Mandarim, Japonês e Russo.'
  },
  {
    q: 'Funciona no Mac com Apple Silicon (M1, M2, M3, M4) e Intel?',
    a: 'Sim. O app é compilado de forma universal para macOS 13.0 (Ventura) ou superior, tirando proveito das instruções de hardware e do Neural Engine dos processadores Apple Silicon para garantir baixa temperatura e mínimo uso de bateria (~3% a 5% de CPU).'
  },
  {
    q: 'E no Windows? Como funciona a versão Windows?',
    a: 'No Windows 10 e 11 de 64 bits, o Parrot utiliza a API de áudio de baixa latência WASAPI. A compilação é gerada automaticamente pelo nosso pipeline de CI/CD do GitHub em formato de executável direto (.exe).'
  },
  {
    q: 'Meus dados ou áudios de reunião são armazenados?',
    a: 'Não. O Parrot opera com política estrita de retenção zero de dados. Os pacotes de áudio são processados em streaming em memória e descartados assim que a sentença é traduzida e reproduzida. Nenhum arquivo de áudio ou texto é gravado em servidores externos nem utilizado para treinar modelos.'
  }
];

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
            <span>Perguntas Frequentes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 font-sans">
            Tudo o que você precisa saber sobre o Parrot.
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200/90 rounded-2xl overflow-hidden transition-colors bg-white hover:border-slate-300"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left py-5 px-6 flex items-center justify-between gap-4 font-bold text-slate-900 text-base sm:text-lg cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-slate-800' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
