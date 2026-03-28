import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Layout } from './components/Layout';
import { ArchiveView } from './components/ArchiveView';
import { RecordView } from './components/RecordView';
import { StyleSelectionView } from './components/StyleSelectionView';
import { TranscribingView } from './components/TranscribingView';
import { View } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('archive');

  const handleRecordComplete = () => {
    setCurrentView('style');
  };

  const handleStyleSelect = (styleId: string) => {
    console.log('Selected style:', styleId);
    setCurrentView('transcribing');
  };

  const handleTranscriptionComplete = () => {
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
            <ArchiveView />
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
            <TranscribingView onComplete={handleTranscriptionComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
