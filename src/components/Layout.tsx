import React from 'react';
import { BookOpen, Sparkles, Layers, Settings } from 'lucide-react';
import { View } from '../types';
import { useLanguage } from '../LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  onViewChange: (view: View) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onViewChange }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 glass shadow-sm ambient-shadow">
        <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-screen-xl mx-auto">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onViewChange('archive')}
          >
            <BookOpen className="text-primary w-6 h-6 transition-transform group-hover:scale-110" />
            <span className="font-serif italic text-xl text-rose-900 tracking-wide">{t('appName')}</span>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            <nav className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => onViewChange('archive')}
                className={`font-sans text-[10px] tracking-widest uppercase transition-all ${currentView === 'archive' ? 'text-rose-900 font-bold border-b-2 border-rose-900/10' : 'text-rose-400 hover:text-rose-600'}`}
              >
                {t('archive')}
              </button>
              <button 
                onClick={() => onViewChange('journal')}
                className={`font-sans text-[10px] tracking-widest uppercase transition-all ${currentView === 'journal' ? 'text-rose-900 font-bold border-b-2 border-rose-900/10' : 'text-rose-400 hover:text-rose-600'}`}
              >
                {t('journal')}
              </button>
              <button className="font-sans text-[10px] tracking-widest uppercase text-rose-400 hover:text-rose-600">{t('moments')}</button>
            </nav>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-outline-variant/30 text-[10px] font-bold tracking-tighter hover:bg-white/50 transition-colors"
              >
                <span className={language === 'en' ? 'text-rose-900' : 'text-rose-400/60'}>EN</span>
                <span className="text-outline-variant/50">|</span>
                <span className={language === 'zh' ? 'text-rose-900' : 'text-rose-400/60'}>CN</span>
              </button>
              <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/20">
                <img 
                  src="https://picsum.photos/seed/archivist/100/100" 
                  alt="Profile" 
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => onViewChange('settings')}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-32">
        {children}
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 glass rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(142,73,88,0.08)]">
        <div className="flex justify-around items-center px-6 pb-8 pt-4 max-w-screen-md mx-auto">
          <button 
            onClick={() => onViewChange('journal')}
            className={`flex flex-col items-center justify-center px-5 py-2 transition-all group ${currentView === 'journal' ? 'bg-rose-100/50 text-rose-900 rounded-full scale-105' : 'text-rose-400 hover:bg-rose-50/50'}`}
          >
            <BookOpen className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
            <span className="font-sans text-[10px] tracking-widest uppercase">{t('journal')}</span>
          </button>
          
          <button 
            onClick={() => onViewChange('record')}
            className={`flex flex-col items-center justify-center px-5 py-2 transition-all group ${currentView === 'record' ? 'bg-rose-100/50 text-rose-900 rounded-full scale-105' : 'text-rose-400 hover:bg-rose-50/50'}`}
          >
            <Sparkles className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
            <span className="font-sans text-[10px] tracking-widest uppercase font-semibold">{t('record')}</span>
          </button>

          <button 
            onClick={() => onViewChange('archive')}
            className={`flex flex-col items-center justify-center px-5 py-2 transition-all group ${currentView === 'archive' ? 'bg-rose-100/50 text-rose-900 rounded-full scale-105' : 'text-rose-400 hover:bg-rose-50/50'}`}
          >
            <Layers className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
            <span className="font-sans text-[10px] tracking-widest uppercase font-semibold">{t('archive')}</span>
          </button>

          <button 
            onClick={() => onViewChange('settings')}
            className={`flex flex-col items-center justify-center px-5 py-2 transition-all group ${currentView === 'settings' ? 'bg-rose-100/50 text-rose-900 rounded-full scale-105' : 'text-rose-400 hover:bg-rose-50/50'}`}
          >
            <Settings className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
            <span className="font-sans text-[10px] tracking-widest uppercase">{t('settings')}</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
