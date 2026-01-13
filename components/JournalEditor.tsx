
import React, { useState, useEffect, useRef } from 'react';
import { JournalEntry, JournalTheme, UserMood } from '../types';
import { THEMES } from '../constants';
import CoverPicker from './CoverPicker';

interface Props {
  entry: JournalEntry;
  onUpdate: (updates: Partial<JournalEntry>) => void;
}

const MOODS: { type: UserMood; emoji: string; label: string }[] = [
  { type: 'happy', emoji: '😊', label: 'Happy' },
  { type: 'neutral', emoji: '😐', label: 'Neutral' },
  { type: 'sad', emoji: '😔', label: 'Sad' },
];

const JournalEditor: React.FC<Props> = ({ entry, onUpdate }) => {
  const theme = THEMES.find(t => t.id === entry.theme) || THEMES[0];
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showCoverPicker, setShowCoverPicker] = useState(false);
  const [showMoodMenu, setShowMoodMenu] = useState(false);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [entry.content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({ content: e.target.value });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ title: e.target.value });
  };

  const currentMood = MOODS.find(m => m.type === entry.mood) || MOODS[1];

  return (
    <div className={`w-full max-w-4xl min-h-[80vh] shadow-2xl rounded-sm transition-colors duration-500 overflow-hidden relative border border-gray-200/50 flex flex-col ${theme.paperBg}`}>
      {showCoverPicker && (
        <CoverPicker 
          onSelect={(url) => onUpdate({ coverImage: url })} 
          onClose={() => setShowCoverPicker(false)} 
        />
      )}

      {/* Cover Image Header */}
      <div className="relative group w-full h-48 md:h-64 bg-gray-200 overflow-hidden shrink-0">
        {entry.coverImage ? (
          <img 
            src={entry.coverImage} 
            alt="Entry Cover" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-slate-200 flex items-center justify-center opacity-40">
             <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
             </svg>
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
          <button
            onClick={() => setShowCoverPicker(true)}
            className="px-4 py-2 bg-white/90 backdrop-blur text-gray-800 rounded-full text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-lg hover:bg-white active:scale-95"
          >
            {entry.coverImage ? 'Change Cover' : 'Add Cover Image'}
          </button>
        </div>
      </div>

      {/* Texture Overlays */}
      {theme.textureOverlay && (
        <div 
          className="absolute inset-0 top-48 md:top-64 pointer-events-none mix-blend-multiply transition-opacity duration-500" 
          style={{ 
            backgroundImage: `url("${theme.textureOverlay}")`,
            opacity: theme.textureOpacity || 0.1
          }}
        ></div>
      )}

      {/* Decorative Spiral (Left Side) */}
      <div className="absolute left-4 top-48 md:top-64 bottom-0 flex flex-col justify-around py-8 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`w-4 h-4 rounded-full border-2 bg-white/50 shadow-inner ${theme.id === 'leather' ? 'border-amber-900/40' : 'border-gray-300'}`}></div>
        ))}
      </div>

      <div className="flex-1 p-8 md:p-16 pl-16 md:pl-24 relative z-0">
        {/* Timestamp Stamp Effect */}
        <div className="absolute top-4 right-4 pointer-events-none select-none z-20">
           <div className={`
             border-4 rounded-md p-2 transform rotate-6 opacity-80
             flex flex-col items-center justify-center font-bold tracking-widest uppercase text-[10px]
             ${(theme.id === 'night' || theme.id === 'leather' || theme.id === 'slate') ? 'border-indigo-400 text-indigo-400' : 'border-rose-800 text-rose-800'}
           `}
           style={{ fontFamily: 'monospace' }}
           >
             <span className="border-b border-current mb-1 pb-1">CERTIFIED BY TIME</span>
             <span className="text-xs">{entry.timestamp.split(',')[0]}</span>
             <span className="text-[9px]">{entry.timestamp.split(',')[1]}</span>
           </div>
        </div>

        {/* AI Insight Badge */}
        {entry.aiMood && (
          <div className="absolute top-6 left-20 flex items-center gap-2 animate-fade-in z-20">
             <span className="text-3xl" title="AI analyzed mood">{entry.aiMood}</span>
             {entry.aiSummary && (
               <div className="bg-white/60 backdrop-blur p-2 rounded-lg border border-gray-200/30 text-[10px] italic max-w-[150px] shadow-sm">
                 "AI: {entry.aiSummary}"
               </div>
             )}
          </div>
        )}

        {/* Mood Picker (Top Position) */}
        <div className="relative mb-6 z-30">
          <button
            onClick={() => setShowMoodMenu(!showMoodMenu)}
            className={`flex items-center gap-2 px-3 py-1.5 backdrop-blur border border-gray-200/50 rounded-full hover:bg-white transition-all shadow-sm active:scale-95 ${theme.id === 'night' || theme.id === 'leather' || theme.id === 'slate' ? 'bg-white/10 text-white' : 'bg-white/50 text-gray-800'}`}
          >
            <span className="text-xl">{currentMood.emoji}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">{currentMood.label}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showMoodMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMoodMenu(false)}></div>
              <div className="absolute left-0 mt-2 bg-white rounded-xl shadow-xl border p-2 z-20 flex gap-2 animate-scale-up">
                {MOODS.map(m => (
                  <button
                    key={m.type}
                    onClick={() => {
                      onUpdate({ mood: m.type });
                      setShowMoodMenu(false);
                    }}
                    className={`p-3 rounded-lg text-2xl hover:bg-gray-100 transition-colors ${entry.mood === m.type ? 'bg-indigo-50' : ''}`}
                    title={m.label}
                  >
                    {m.emoji}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Title Container */}
        <div className="mb-8 pr-24">
          <input
            type="text"
            value={entry.title}
            onChange={handleTitleChange}
            placeholder="Journal Title..."
            className={`
              w-full bg-transparent border-none outline-none font-bold text-3xl md:text-4xl
              placeholder-gray-400/50 ${theme.textColor} ${theme.fontClass}
            `}
          />
        </div>

        {/* Editor Area */}
        <div className="relative">
          {theme.id !== 'minimal' && theme.id !== 'night' && theme.id !== 'slate' && theme.id !== 'leather' && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `repeating-linear-gradient(transparent, transparent 31px, ${theme.lineColor} 31px, ${theme.lineColor} 32px)`,
                backgroundAttachment: 'local',
                lineHeight: '32px',
                marginTop: '10px'
              }}
            ></div>
          )}

          <textarea
            ref={textareaRef}
            value={entry.content}
            onChange={handleChange}
            placeholder="Write your story..."
            className={`
              w-full min-h-[500px] bg-transparent border-none outline-none resize-none
              ${theme.textColor} ${theme.fontClass} text-lg md:text-xl relative z-10
              placeholder-gray-400/30 overflow-hidden transition-all
            `}
            style={{
              lineHeight: '32px',
              paddingTop: '10px'
            }}
          />
        </div>
      </div>

      <div className="h-6 w-full bg-black/10 flex items-center justify-center text-[10px] text-gray-500/80 tracking-[0.2em] uppercase shrink-0 font-mono">
        &mdash; RECORDED IN {theme.name} &mdash;
      </div>
    </div>
  );
};

export default JournalEditor;
