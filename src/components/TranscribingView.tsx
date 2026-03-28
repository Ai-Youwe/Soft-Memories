import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Edit3, Sparkles, Loader2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { GoogleGenAI } from "@google/genai";

interface TranscribingViewProps {
  onComplete: (generatedMemory?: any) => void;
  userInput: string;
  styleId: string;
}

export const TranscribingView: React.FC<TranscribingViewProps> = ({ onComplete, userInput, styleId }) => {
  const { t, language } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [generatedTitle, setGeneratedTitle] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(true);
  const hasGenerated = useRef(false);

  useEffect(() => {
    const generateMemory = async () => {
      if (hasGenerated.current) return;
      hasGenerated.current = true;

      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
        const model = "gemini-3-flash-preview";
        
        const stylePrompts: Record<string, string> = {
          poetry: "Write a short, lyrical, and abstract poetic fragment. Use rich sensory metaphors.",
          novel: "Write a short, immersive narrative excerpt with deep atmosphere and character focus.",
          essay: "Write a short, reflective, and personal observation with philosophical depth.",
          documentary: "Write a short, objective, yet evocative archival observation focusing on factual sensory details."
        };

        const systemInstruction = `You are a world-class literary archivist. 
        Your task is to transform a raw user memory into a beautiful, literary fragment.
        The user's language is ${language === 'zh' ? 'Chinese' : 'English'}.
        The chosen narrative style is: ${styleId}.
        ${stylePrompts[styleId] || stylePrompts.poetry}
        
        Focus on sensory details (colors, smells, sounds, textures).
        Avoid generic descriptions. Make it feel unique and personal.
        
        Return the response in JSON format with the following structure:
        {
          "title": "A short, poetic title",
          "content": "The literary fragment (max 3 sentences)",
          "quote": "A single, powerful sentence that captures the essence"
        }`;

        const response = await ai.models.generateContent({
          model,
          contents: `User Input: "${userInput}"`,
          config: {
            systemInstruction,
            responseMimeType: "application/json"
          }
        });

        const data = JSON.parse(response.text || '{}');
        setGeneratedContent(data.content || '');
        setGeneratedTitle(data.title || '');
        
        // Store for completion
        const newMemory = {
          id: Date.now().toString(),
          title: data.title,
          date: new Date().toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', { 
            year: 'numeric', month: 'long', day: 'numeric' 
          }),
          quote: data.quote,
          description: data.content,
          imageUrl: `https://picsum.photos/seed/${encodeURIComponent(data.title)}/800/600`
        };

        setIsGenerating(false);
        
        // Start progress bar after generation starts/completes
        const timer = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              clearInterval(timer);
              setTimeout(() => onComplete(newMemory), 2000);
              return 100;
            }
            return prev + 1;
          });
        }, 30);
      } catch (error) {
        console.error("Generation error:", error);
        setIsGenerating(false);
        setGeneratedContent(t('springDesc'));
        setGeneratedTitle(t('springAfternoon'));
        
        // Fallback progress
        const timer = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              clearInterval(timer);
              setTimeout(() => onComplete(), 1000);
              return 100;
            }
            return prev + 1;
          });
        }, 50);
      }
    };

    generateMemory();
  }, [userInput, styleId, language, onComplete, t]);

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
              {isGenerating ? (
                <Loader2 className="text-primary w-12 h-12 animate-spin" />
              ) : (
                <Sparkles className="text-primary w-12 h-12 animate-pulse" />
              )}
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
          {isGenerating ? t('weavingSilk') : t('silkWoven')}
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
      <AnimatePresence>
        {!isGenerating && generatedContent && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full max-w-lg px-6"
          >
            <div className="glass rounded-[2.5rem] p-8 ambient-shadow flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-container">
                    <img 
                      src={`https://picsum.photos/seed/${encodeURIComponent(generatedTitle)}/100/100`} 
                      alt="Archive Visual" 
                      className="w-full h-full object-cover grayscale opacity-80"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-rose-400 font-bold">{t('currentFragment')}</p>
                    <p className="text-xs font-medium text-rose-900">{generatedTitle}</p>
                  </div>
                </div>
                <Sparkles className="text-rose-300 w-5 h-5" />
              </div>
              <div className="h-24 overflow-hidden mask-fade-bottom">
                <p className="text-sm leading-relaxed text-rose-800/80 line-clamp-3">
                  {generatedContent}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
