import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Sparkles, Lightbulb, Square, Send, Type } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface RecordViewProps {
  onRecordComplete: (input: string) => void;
}

export const RecordView: React.FC<RecordViewProps> = ({ onRecordComplete }) => {
  const { t } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [textInput, setTextInput] = useState('');
  const [mode, setMode] = useState<'audio' | 'text'>('audio');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
      // In a real app, we'd get the transcript here. 
      // For this demo, we'll use a placeholder if they didn't type anything.
      onRecordComplete(textInput || t('defaultTranscript'));
    }
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      onRecordComplete(textInput);
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center px-6 pt-12 pb-24 relative mesh-gradient-silk min-h-[80vh]">
      {/* Background Blur Decorative Element */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 text-center max-w-2xl w-full"
      >
        <h1 className="font-serif italic text-rose-900 text-5xl md:text-6xl tracking-tight mb-4">{t('recordTitle')}</h1>
        <p className="font-sans text-on-surface-variant text-lg md:text-xl opacity-70 mb-12">{t('recordDesc')}</p>

        {/* Mode Switcher */}
        <div className="flex justify-center gap-4 mb-8">
          <button 
            onClick={() => setMode('audio')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${mode === 'audio' ? 'bg-primary text-white' : 'bg-white/40 text-primary hover:bg-white/60'}`}
          >
            <Mic size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">{t('audioMode')}</span>
          </button>
          <button 
            onClick={() => setMode('text')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${mode === 'text' ? 'bg-primary text-white' : 'bg-white/40 text-primary hover:bg-white/60'}`}
          >
            <Type size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">{t('textMode')}</span>
          </button>
        </div>

        {mode === 'audio' ? (
          <div className="relative flex items-center justify-center py-12">
            {/* Outer Pulse Rings */}
            <AnimatePresence>
              {isRecording && (
                <>
                  <motion.div 
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute w-64 h-64 border-2 border-primary/30 rounded-full"
                  ></motion.div>
                  <motion.div 
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute w-48 h-48 border-2 border-primary/40 rounded-full"
                  ></motion.div>
                </>
              )}
            </AnimatePresence>

            {!isRecording && (
              <>
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute w-64 h-64 border border-primary/10 rounded-full"
                ></motion.div>
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute w-48 h-48 border border-primary/20 rounded-full"
                ></motion.div>
              </>
            )}

            <button 
              onClick={handleToggleRecord}
              className={`relative w-32 h-32 rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(142,73,88,0.2)] active:scale-95 transition-all duration-500 group ${isRecording ? 'bg-rose-900' : 'bg-gradient-to-br from-primary to-rose-900 animate-breathing'}`}
            >
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {isRecording ? (
                <Square className="text-white w-10 h-10 fill-white" />
              ) : (
                <Mic className="text-white w-12 h-12" />
              )}
            </button>
          </div>
        ) : (
          <div className="w-full max-w-xl mx-auto">
            <div className="glass rounded-[2rem] p-6 ambient-shadow relative">
              <textarea 
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={t('textPlaceholder')}
                className="w-full h-40 bg-transparent border-none outline-none resize-none font-serif text-lg text-rose-900 placeholder:text-rose-900/30"
              />
              <div className="flex justify-end mt-4">
                <button 
                  onClick={handleTextSubmit}
                  disabled={!textInput.trim()}
                  className="bg-primary hover:bg-rose-900 text-white p-4 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg active:scale-95"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Status text in glassmorphic card */}
        <div className="mt-16 inline-flex items-center gap-4 px-6 py-3 rounded-full glass ambient-shadow min-w-[160px] justify-center">
          <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-primary'}`}></div>
          <span className="font-sans text-xs tracking-widest uppercase text-on-secondary-container font-bold">
            {isRecording ? formatTime(timer) : (mode === 'audio' ? t('listening') : t('writing'))}
          </span>
        </div>
      </motion.div>

      {/* Asymmetric Hint Sections */}
      <div className="absolute bottom-20 left-12 hidden lg:block max-w-[200px] text-left opacity-60">
        <span className="font-sans text-[10px] tracking-widest uppercase text-primary mb-2 block">{t('promptLabel')}</span>
        <p className="font-serif italic text-on-surface text-base">{t('promptText')}</p>
      </div>

      <div className="absolute top-1/3 right-12 hidden lg:block max-w-[180px] text-right opacity-60">
        <span className="font-sans text-[10px] tracking-widest uppercase text-primary mb-2 block">{t('insightLabel')}</span>
        <p className="font-sans text-on-surface text-xs leading-relaxed">{t('insightText')}<span className="text-primary font-medium">{t('sensoryReflection')}</span>.</p>
      </div>

      {/* Transcription Hint Bubble (Glassmorphism) */}
      <div className="fixed bottom-32 right-8 max-w-xs p-6 glass rounded-xl ambient-shadow hidden md:block">
        <div className="flex items-start gap-4">
          <Lightbulb className="text-rose-800 w-6 h-6" />
          <div>
            <p className="text-sm font-serif italic text-rose-950 mb-1">{t('tipTitle')}</p>
            <p className="text-xs text-on-surface-variant leading-relaxed">{t('tipText')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
