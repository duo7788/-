
import React, { useState } from 'react';
import { JournalTheme } from '../types';
import { THEMES } from '../constants';

interface Props {
  activeTheme: JournalTheme;
  onSelect: (theme: JournalTheme) => void;
}

const ThemeSelector: React.FC<Props> = ({ activeTheme, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentTheme = THEMES.find(t => t.id === activeTheme) || THEMES[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm font-medium bg-white hover:bg-gray-50 transition-colors shadow-sm"
      >
        <div className={`w-3 h-3 rounded-full ${currentTheme.paperBg} border border-gray-300`}></div>
        <span>{currentTheme.name}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-xl z-20 py-2 overflow-hidden animate-fade-in-down">
            <div className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Style</div>
            {THEMES.map(theme => (
              <button
                key={theme.id}
                onClick={() => {
                  onSelect(theme.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors
                  ${activeTheme === theme.id ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-100 text-gray-700'}
                `}
              >
                <div className={`w-5 h-5 rounded border ${theme.paperBg} ${theme.id === 'night' ? 'border-white/20' : 'border-black/10'}`}></div>
                <span className="flex-1 text-left">{theme.name}</span>
                {activeTheme === theme.id && (
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                   </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSelector;
