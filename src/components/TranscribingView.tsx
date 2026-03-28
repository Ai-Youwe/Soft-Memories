import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Edit3, Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface TranscribingViewProps {
  onComplete: () => void;
}

export const TranscribingView: React.FC<TranscribingViewProps> = ({ onComplete }) => {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="relative h-screen w-full flex items-center justify-center mesh-gradient-silk overflow-hidden">
      {/* Abstract Silk Visualizer */}
      <div className="absolute inset-0 flex items-center justify-center opacity-60 mix-blend-multiply pointer-events-none">
        <div className="relative w-full h-full max-w-4xl max-h-[600px]">
          {/* Layered Glass Ripples */}
          <motion.div 
            animate={{ scale: [1.25, 1.3, 1.25], x: ['-10%', '-8%', '-10%'], y: ['5%', '7%', '5%'] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-primary-container/20 blur-[100px]"
          ></motion.div>
          <motion.div 
            animate={{ scale: [1.1, 1.15, 1.1], x: ['15%', '13%', '15%'], y: ['-10%', '-12%', '-10%'] }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-secondary-container/30 blur-[120px]"
          ></motion.div>
          
          {/* Center Silk Metaphor Element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="w-full h-full rounded-full border border-primary/10 flex items-center justify-center p-8"
            >
              <div className="w-full h-full rounded-full border border-primary/5 border-dashed"></div>
            </motion.div>
            <div className="absolute w-64 h-64 bg-white/30 backdrop-blur-3xl rounded-full border border-white/40 shadow-2xl flex items-center justify-center">
              <Sparkles className="text-primary w-12 h-12 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Transcribing Messaging */}
      <div className="relative z-10 text-center max-w-2xl px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 inline-flex items-center gap-2 px-4 py-2 rounded-full glass ambient-shadow"
        >
          <Edit3 className="text-primary w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-primary/70">{t('archivalActive')}</span>
        </motion.div>

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-rose-900 leading-tight mb-8 tracking-tight">
          {t('transcribingTitle')}
        </h1>

        <div className="flex flex-col items-center gap-6">
          {/* Poetic Progress Indicator */}
          <div className="w-64 h-[1px] bg-outline-variant/30 relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-primary"
              style={{ width: `${progress}%` }}
            ></motion.div>
          </div>
          <p className="font-sans text-rose-800/60 text-sm italic max-w-md">
            {t('poeticQuote')}
          </p>
        </div>
      </div>

      {/* Bottom Narrative Card (Glassmorphism Fragment) */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full max-w-lg px-6"
      >
        <div className="glass rounded-[2.5rem] p-8 ambient-shadow flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-container">
                <img 
                  src="https://picsum.photos/seed/spring/100/100" 
                  alt="Archive Visual" 
                  className="w-full h-full object-cover grayscale opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-rose-400 font-bold">{t('currentFragment')}</p>
                <p className="text-xs font-medium text-rose-900">{t('springAfternoon')}</p>
              </div>
            </div>
            <Sparkles className="text-rose-300 w-5 h-5" />
          </div>
          <div className="h-24 overflow-hidden mask-fade-bottom">
            <p className="text-sm leading-relaxed text-rose-800/80 line-clamp-3">
              {t('springDesc')}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
