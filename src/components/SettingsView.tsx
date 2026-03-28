import React from 'react';
import { motion } from 'motion/react';
import { Settings, User, Bell, Shield, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const SettingsView: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <Settings className="text-primary w-12 h-12 mx-auto mb-6" />
        <h1 className="font-serif italic text-rose-900 text-5xl md:text-6xl tracking-tight mb-4">{t('settings')}</h1>
        <p className="text-on-surface-variant font-light text-xl max-w-xl mx-auto leading-relaxed">
          {t('settingsDesc')}
        </p>
      </motion.div>

      <div className="space-y-6">
        {[
          { icon: User, label: t('profileSettings'), desc: t('profileSettingsDesc') },
          { icon: Bell, label: t('notifications'), desc: t('notificationsDesc') },
          { icon: Shield, label: t('privacySecurity'), desc: t('privacySecurityDesc') },
          { icon: Globe, label: t('languageRegion'), desc: t('languageRegionDesc') },
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 rounded-[2rem] ambient-shadow flex items-center gap-6 cursor-pointer hover:bg-white/60 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <item.icon className="text-primary w-6 h-6" />
            </div>
            <div className="flex-grow">
              <h3 className="font-serif italic text-2xl text-rose-900 mb-1">{item.label}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed opacity-60">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
