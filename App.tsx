
import React, { useState, useEffect, useCallback } from 'react';
import { JournalEntry, JournalTheme } from './types';
import { THEMES } from './constants';
import JournalEditor from './components/JournalEditor';
import Sidebar from './components/Sidebar';
import ThemeSelector from './components/ThemeSelector';
import { analyzeMoodAndSummary } from './services/geminiService';

const App: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [activeEntry, setActiveEntry] = useState<JournalEntry | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Load initial data
  useEffect(() => {
    const saved = localStorage.getItem('zendiary_entries');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setEntries(parsed);
        if (parsed.length > 0) setActiveEntry(parsed[0]);
      } catch (e) {
        console.error("Failed to parse entries", e);
      }
    } else {
      const now = new Date();
      const firstEntry: JournalEntry = {
        id: '1',
        title: 'Welcome to ZenDiary',
        content: 'Start writing your thoughts here...',
        timestamp: now.toLocaleString(),
        date: now.toISOString(),
        theme: 'classic',
        mood: 'neutral'
      };
      setEntries([firstEntry]);
      setActiveEntry(firstEntry);
    }
  }, []);

  // Persistence
  useEffect(() => {
    localStorage.setItem('zendiary_entries', JSON.stringify(entries));
  }, [entries]);

  const createNewEntry = () => {
    const now = new Date();
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      title: '',
      content: '',
      timestamp: now.toLocaleString(),
      date: now.toISOString(),
      theme: activeEntry?.theme || 'classic',
      mood: 'neutral'
    };
    setEntries([newEntry, ...entries]);
    setActiveEntry(newEntry);
  };

  const updateEntry = (id: string, updates: Partial<JournalEntry>) => {
    setEntries(prev => prev.map(entry => entry.id === id ? { ...entry, ...updates } : entry));
    if (activeEntry?.id === id) {
      setActiveEntry(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    if (activeEntry?.id === id) {
      setActiveEntry(updated.length > 0 ? updated[0] : null);
    }
  };

  const handleAIAnalysis = async () => {
    if (!activeEntry) return;
    const result = await analyzeMoodAndSummary(activeEntry.content);
    if (result) {
      updateEntry(activeEntry.id, {
        aiMood: result.mood,
        aiSummary: result.summary
      });
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar
        entries={entries}
        activeId={activeEntry?.id || ''}
        onSelect={setActiveEntry}
        onNew={createNewEntry}
        onDelete={deleteEntry}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className={`flex-1 flex flex-col transition-all duration-300`}>
        <header className="h-16 border-b bg-white/80 backdrop-blur flex items-center justify-between px-6 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-md lg:hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold tracking-tight">ZenDiary</h1>
          </div>

          <div className="flex items-center gap-3">
             <button
              onClick={handleAIAnalysis}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-100 transition-colors"
            >
              ✨ AI Insight
            </button>
            <ThemeSelector
              activeTheme={activeEntry?.theme || 'classic'}
              onSelect={(theme) => activeEntry && updateEntry(activeEntry.id, { theme })}
            />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-10 flex justify-center bg-gray-100/50">
          {activeEntry ? (
            <JournalEditor
              entry={activeEntry}
              onUpdate={(updates) => updateEntry(activeEntry.id, updates)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <svg className="w-16 h-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <p>Select or create a diary entry to begin</p>
              <button
                onClick={createNewEntry}
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
              >
                Create New Entry
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
