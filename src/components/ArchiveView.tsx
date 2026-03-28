import React from 'react';
import { motion } from 'motion/react';
import { Memory } from '../types';
import { useLanguage } from '../LanguageContext';

interface ArchiveViewProps {
  memories: Memory[];
  onRecordClick: () => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({ memories, onRecordClick }) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-screen-md mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="mb-20 text-center md:text-left">
        <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase mb-4 block">{t('chronologicalAnthology')}</span>
        <h2 className="text-5xl md:text-7xl font-serif italic text-rose-900 leading-tight mb-6">{t('memoirTitle')}</h2>
        <p className="text-on-surface-variant max-w-lg leading-relaxed text-lg">
          {t('memoirDesc')}
        </p>
      </section>

      {/* Timeline */}
      <div className="relative space-y-24">
        {/* Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-outline-variant/20 to-transparent -translate-x-1/2 hidden md:block"></div>
        
        {memories.map((memory, index) => (
          <motion.div 
            key={memory.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative flex flex-col md:flex-row items-center gap-12 group ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
          >
            <div className={`md:w-1/2 flex justify-center ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
              <div className={`glass p-4 rounded-xl ambient-shadow max-w-xs transition-transform duration-500 hover:rotate-0 hover:scale-[1.04] ${index % 2 === 0 ? '-rotate-2' : 'rotate-3'}`}>
                <div className="aspect-[4/5] overflow-hidden rounded-lg mb-4 bg-surface-container">
                  <img 
                    src={memory.imageUrl} 
                    alt={memory.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="px-2 pb-6">
                  <span className="font-serif italic text-primary text-sm block mb-2">{memory.date}</span>
                  <p className="font-serif italic text-on-surface text-lg leading-relaxed">
                    {memory.quote}
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 w-4 h-4 rounded-full bg-primary ring-8 ring-primary/10"></div>

            <div className="md:w-1/2">
              <div className={`${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                <h3 className="font-serif text-2xl text-rose-900 mb-2">{memory.title}</h3>
                <p className="text-on-surface-variant font-sans">{memory.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-32 text-center p-12 rounded-[2rem] bg-gradient-to-br from-primary to-rose-900 ambient-shadow relative overflow-hidden group">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/silk-weave.png')]"></div>
        <h3 className="text-on-primary font-serif italic text-3xl mb-4 relative z-10">{t('captureNew')}</h3>
        <p className="text-on-primary/80 mb-8 relative z-10">{t('journeyContinues')}</p>
        <button 
          onClick={onRecordClick}
          className="bg-white text-primary px-8 py-3 rounded-full font-sans tracking-wide hover:bg-rose-50 transition-all transform hover:scale-105 active:scale-95 shadow-lg relative z-10"
        >
          {t('recordNew')}
        </button>
      </div>
    </div>
  );
};
