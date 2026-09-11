import React, { useEffect, useRef, useState } from 'react';
import { Mic, Volume2 } from 'lucide-react';

type DemoStatus = 'idle' | 'listening' | 'translating' | 'speaking' | 'error';

interface RecognitionEventLike extends Event {
  results: SpeechRecognitionResultList;
}

interface RecognitionErrorEventLike extends Event {
  error?: string;
  message?: string;
}

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: RecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: RecognitionErrorEventLike) => void) | null;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

interface VoiceWindow extends Window {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
}

const decodeHtmlEntities = (text: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');
  return doc.body.textContent || text;
};

const pickNaturalEnglishVoice = (voices: SpeechSynthesisVoice[]) => {
  const englishVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith('en'));
  const preferences = ['Ava', 'Aria', 'Google US English', 'Samantha', 'Daniel', 'Alex', 'Natural'];

  return (
    preferences
      .map((preferred) => englishVoices.find((voice) => voice.name.toLowerCase().includes(preferred.toLowerCase())))
      .find(Boolean) || englishVoices[0]
  );
};

const WAVE_BARS = [
  6, 10, 16, 22, 14, 8, 18, 24, 20, 12, 22, 26, 20, 14, 24, 18, 12, 20, 22, 16, 10, 14, 8, 6
];

export const VoiceDemo: React.FC = () => {
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const resetTimerRef = useRef<number | null>(null);
  const pendingTranscriptRef = useRef<string>('');
  const [status, setStatus] = useState<DemoStatus>('idle');
  const [transcript, setTranscript] = useState('');
  const [translation, setTranslation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const clearResetTimer = () => {
    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  };

  const stopAll = () => {
    clearResetTimer();
    if (recognitionRef.current) {
      const rec = recognitionRef.current;
      rec.onresult = null;
      rec.onerror = null;
      rec.onend = null;
      try {
        rec.abort();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setStatus('idle');
    setTranscript('');
    setTranslation('');
    setErrorMessage('');
    pendingTranscriptRef.current = '';
  };

  useEffect(() => {
    return () => {
      stopAll();
    };
  }, []);

  const speakEnglish = (text: string) => {
    if (!('speechSynthesis' in window)) {
      setStatus('idle');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.96;
    utterance.pitch = 1.02;

    const voices = window.speechSynthesis.getVoices();
    const voice = pickNaturalEnglishVoice(voices);
    if (voice) utterance.voice = voice;

    utterance.onstart = () => {
      setStatus('speaking');
    };

    utterance.onend = () => {
      resetTimerRef.current = window.setTimeout(() => {
        setStatus('idle');
        setTranscript('');
        setTranslation('');
      }, 2200);
    };

    utterance.onerror = () => {
      setStatus('idle');
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const translateToEnglish = async (text: string) => {
    const cleanText = text.trim();
    if (!cleanText) {
      setStatus('idle');
      return;
    }

    setStatus('translating');
    setErrorMessage('');

    try {
      const endpoint = new URL('https://api.mymemory.translated.net/get');
      endpoint.searchParams.set('q', cleanText);
      endpoint.searchParams.set('langpair', 'pt-BR|en-US');

      const response = await fetch(endpoint.toString());
      if (!response.ok) throw new Error('Translation request failed');

      const payload = (await response.json()) as {
        responseData?: { translatedText?: string };
      };

      const rawTranslation = payload.responseData?.translatedText?.trim();
      if (!rawTranslation) throw new Error('Empty translation');

      const translatedText = decodeHtmlEntities(rawTranslation);
      setTranslation(translatedText);
      speakEnglish(translatedText);
    } catch {
      setStatus('error');
      setErrorMessage('Erro ao traduzir. Tente novamente.');
      resetTimerRef.current = window.setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }
  };

  const startListening = () => {
    stopAll();

    const voiceWindow = window as VoiceWindow;
    const Recognition = voiceWindow.SpeechRecognition || voiceWindow.webkitSpeechRecognition;

    if (!Recognition) {
      setStatus('error');
      setErrorMessage('Navegador sem suporte a voz (use Chrome/Edge/Safari)');
      resetTimerRef.current = window.setTimeout(() => setStatus('idle'), 3500);
      return;
    }

    try {
      const recognition = new Recognition();
      recognition.lang = 'pt-BR';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognitionRef.current = recognition;

      recognition.onresult = (event) => {
        let currentTranscript = '';
        let isFinal = false;

        for (let i = 0; i < event.results.length; i += 1) {
          currentTranscript += event.results[i][0].transcript;
          if (event.results[i].isFinal) isFinal = true;
        }

        setTranscript(currentTranscript);
        pendingTranscriptRef.current = currentTranscript;

        if (isFinal && currentTranscript.trim()) {
          try {
            recognition.stop();
          } catch {
            // ignore
          }
          void translateToEnglish(currentTranscript);
        }
      };

      recognition.onerror = (event) => {
        const err = event?.error;
        if (err === 'aborted' || err === 'no-speech') {
          setStatus('idle');
          return;
        }

        setStatus('error');
        if (err === 'not-allowed' || err === 'service-not-allowed') {
          setErrorMessage('Permissão de microfone negada');
        } else {
          setErrorMessage('Não consegui ouvir. Tente novamente');
        }
        resetTimerRef.current = window.setTimeout(() => setStatus('idle'), 3000);
      };

      recognition.onend = () => {
        const text = pendingTranscriptRef.current.trim();
        if (text && status === 'listening') {
          void translateToEnglish(text);
        } else {
          setStatus('idle');
        }
      };

      setStatus('listening');
      recognition.start();
    } catch {
      setStatus('error');
      setErrorMessage('Erro ao iniciar microfone');
      resetTimerRef.current = window.setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleClick = () => {
    if (status === 'idle') {
      startListening();
    } else {
      stopAll();
    }
  };

  const isActive = status !== 'idle';

  return (
    <div className="relative inline-flex w-full sm:w-auto justify-center">
      {/* Minimalist Floating Status Popup / Pill */}
      {isActive && (
        <div
          role="status"
          aria-live="polite"
          className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-200 max-w-[92vw]"
        >
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/90 backdrop-blur-md text-white text-xs font-medium shadow-xl border border-white/10">
            {status === 'listening' && (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="max-w-[170px] sm:max-w-xs truncate text-slate-200">
                  {transcript ? `"${transcript}"` : 'Fale algo em português...'}
                </span>
              </>
            )}
            {status === 'translating' && (
              <>
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shrink-0" />
                <span className="text-slate-200">Traduzindo para inglês...</span>
              </>
            )}
            {status === 'speaking' && (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse shrink-0" />
                <span className="text-emerald-300 font-semibold max-w-[170px] sm:max-w-xs truncate">
                  {translation ? `"${translation}"` : 'Reproduzindo nos fones...'}
                </span>
              </>
            )}
            {status === 'error' && (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                <span className="text-rose-200 max-w-[170px] sm:max-w-xs truncate">{errorMessage || 'Erro no microfone'}</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Direct Action Button */}
      <button
        type="button"
        onClick={handleClick}
        aria-label={isActive ? 'Parar teste de voz' : 'Testar com minha voz'}
        className={`w-full sm:w-auto inline-flex items-center justify-center rounded-full border text-sm sm:text-base font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer select-none px-6 sm:px-7 py-4 min-w-0 sm:min-w-[246px] h-[56px] ${
          isActive
            ? 'border-emerald-400 bg-emerald-50/80 text-emerald-950 hover:bg-emerald-100/80 ring-2 ring-emerald-500/20 shadow-md'
            : 'border-slate-300 bg-white/80 hover:bg-white hover:border-slate-400 text-slate-900 hover:shadow-md'
        }`}
        title={isActive ? 'Clique para parar' : 'Testar tradução de voz em tempo real'}
      >
        {isActive ? (
          /* Stretched Animated Audio Waveform spanning full button width */
          <div className="flex items-center justify-center gap-1.5 h-7 w-full px-1" aria-hidden="true">
            {WAVE_BARS.map((height, index) => (
              <span
                key={index}
                className="w-[3px] rounded-full bg-emerald-600 animate-wave shrink-0"
                style={{
                  height: `${height}px`,
                  animationDelay: `${(index * 65) % 900}ms`
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2.5">
            <Mic className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Testar com minha voz</span>
          </div>
        )}
      </button>
    </div>
  );
};
