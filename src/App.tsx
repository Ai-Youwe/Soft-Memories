import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Layout } from './components/Layout';
import { ArchiveView } from './components/ArchiveView';
import { RecordView } from './components/RecordView';
import { StyleSelectionView } from './components/StyleSelectionView';
import { TranscribingView } from './components/TranscribingView';
import { JournalView } from './components/JournalView';
import { SettingsView } from './components/SettingsView';
import { View } from './types';
import { MEMORIES } from './constants';
import { useLanguage } from './LanguageContext';

export default function App() {
  const { language } = useLanguage();
  const [currentView, setCurrentView] = useState<View>('archive');
  const [userInput, setUserInput] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>('poetry');
  const [memories, setMemories] = useState(MEMORIES);

  const handleRecordComplete = (input: string) => {
    setUserInput(input);
    setCurrentView('style');
  };

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
    setCurrentView('transcribing');
  };

  const handleTranscriptionComplete = (generatedMemory?: any) => {
    if (generatedMemory) {
      setMemories(prev => ({
        ...prev,
        [language]: [generatedMemory, ...prev[language]]
      }));
    }
    setCurrentView('archive');
  };

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      <AnimatePresence mode="wait">
        {currentView === 'archive' && (
          <motion.div
            key="archive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ArchiveView 
              memories={memories[language]} 
              onRecordClick={() => setCurrentView('record')}
            />
          </motion.div>
        )}

        {currentView === 'record' && (
          <motion.div
            key="record"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <RecordView onRecordComplete={handleRecordComplete} />
          </motion.div>
        )}

        {currentView === 'journal' && (
          <motion.div
            key="journal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <JournalView />
          </motion.div>
        )}

        {currentView === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SettingsView />
          </motion.div>
        )}

        {currentView === 'style' && (
          <motion.div
            key="style"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StyleSelectionView onStyleSelect={handleStyleSelect} />
          </motion.div>
        )}

        {currentView === 'transcribing' && (
          <motion.div
            key="transcribing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-surface"
          >
            <TranscribingView 
              onComplete={handleTranscriptionComplete} 
              userInput={userInput}
              styleId={selectedStyle}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
