import React from 'react';
import { motion } from 'motion/react';
import { Mic, Sparkles, Lightbulb } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface RecordViewProps {
  onRecordComplete: () => void;
}

export const RecordView: React.FC<RecordViewProps> = ({ onRecordComplete }) => {
  const { t } = useLanguage();

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
        <p className="font-sans text-on-surface-variant text-lg md:text-xl opacity-70 mb-16">{t('recordDesc')}</p>

        {/* Central Recording Action */}
        <div className="relative flex items-center justify-center py-12">
          {/* Outer Pulse Rings */}
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

          {/* Main Record Button with Breathing Animation */}
          <button 
            onClick={onRecordComplete}
            className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary to-rose-900 flex items-center justify-center shadow-[0_20px_50px_rgba(142,73,88,0.2)] active:scale-95 transition-all duration-300 group animate-breathing"
          >
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Mic className="text-white w-12 h-12" />
          </button>
        </div>

        {/* Status text in glassmorphic card */}
        <div className="mt-16 inline-flex items-center gap-4 px-6 py-3 rounded-full glass ambient-shadow">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <span className="font-sans text-xs tracking-widest uppercase text-on-secondary-container font-medium">{t('listening')}</span>
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
