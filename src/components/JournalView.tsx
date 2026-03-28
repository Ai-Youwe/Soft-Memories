import React from 'react';
import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const JournalView: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <BookOpen className="text-primary w-12 h-12 mx-auto mb-6" />
        <h1 className="font-serif italic text-rose-900 text-5xl md:text-6xl tracking-tight mb-4">{t('journal')}</h1>
        <p className="text-on-surface-variant font-light text-xl max-w-xl mx-auto leading-relaxed">
          {t('journalDesc')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass p-8 rounded-[2rem] ambient-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] uppercase tracking-widest text-rose-400 font-bold">{t('entryLabel')} #{i}</span>
              <span className="text-xs text-on-surface-variant opacity-60">
                {new Date(2026, 2, 20 + i).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <h3 className="font-serif italic text-2xl text-rose-900 mb-2">{t('springAfternoon')}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3">
              {t('springDesc')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
