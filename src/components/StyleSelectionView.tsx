import React from 'react';
import { motion } from 'motion/react';
import { NARRATIVE_STYLES } from '../constants';
import * as Icons from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface StyleSelectionViewProps {
  onStyleSelect: (styleId: string) => void;
}

export const StyleSelectionView: React.FC<StyleSelectionViewProps> = ({ onStyleSelect }) => {
  const { language, t } = useLanguage();
  const styles = NARRATIVE_STYLES[language];

  return (
    <div className="max-w-4xl w-full mx-auto px-6 py-12 text-center relative z-10">
      {/* Poetic Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <span className="text-primary font-sans text-[12px] tracking-[0.3em] uppercase mb-4 block">{t('selectionLabel')}</span>
        <h1 className="font-serif italic text-rose-900 text-6xl md:text-7xl lg:text-8xl tracking-tight mb-6">{t('styleTitle')}</h1>
        <p className="text-on-surface-variant font-light text-xl md:text-2xl max-w-xl mx-auto leading-relaxed">
          {t('styleDesc')}
        </p>
      </motion.div>

      {/* Asymmetric Glass Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
        {styles.map((style, index) => {
          const IconComponent = (Icons as any)[style.icon];
          return (
            <motion.button 
              key={style.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onStyleSelect(style.id)}
              className={`glass p-10 rounded-[2.5rem] glass-chip flex flex-col items-center justify-center transition-all duration-500 group md:col-span-2 hover:bg-white/60 hover:scale-[1.03] ambient-shadow`}
            >
              <IconComponent className="text-primary w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-serif italic text-on-surface mb-2">{style.name}</h3>
              <p className="text-sm text-on-surface-variant font-light tracking-wide opacity-60">{style.description}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Focused Action */}
      <div className="mt-20 flex flex-col items-center">
        <button 
          onClick={() => onStyleSelect('default')}
          className="bg-primary hover:bg-rose-900 text-on-primary px-12 py-5 rounded-full font-medium tracking-wide transition-all active:scale-95 shadow-[0_20px_40px_rgba(142,73,88,0.2)]"
        >
          {t('beginTranscription')}
        </button>
        <button className="mt-6 text-primary/60 hover:text-primary transition-colors text-sm font-sans uppercase tracking-widest">
          {t('skipForNow')}
        </button>
      </div>
    </div>
  );
};
