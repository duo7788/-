
import React, { useState, useMemo } from 'react';
import { JournalEntry } from '../types';

interface Props {
  entries: JournalEntry[];
  activeId: string;
  onSelect: (entry: JournalEntry) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<Props> = ({ entries, activeId, onSelect, onNew, onDelete, isOpen, setIsOpen }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntries = entries.filter(e =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate statistics for the current month
  const stats = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthEntries = entries.filter(e => {
      const d = new Date(e.date || Date.now());
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const moodCounts = {
      happy: monthEntries.filter(e => e.mood === 'happy').length,
      neutral: monthEntries.filter(e => e.mood === 'neutral').length,
      sad: monthEntries.filter(e => e.mood === 'sad').length,
    };

    const total = monthEntries.length;

    return { total, ...moodCounts, monthName: now.toLocaleString('default', { month: 'long' }) };
  }, [entries]);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside className={`
        fixed inset-y-0 left-0 w-80 bg-white border-r z-30 transform transition-transform duration-300 lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        flex flex-col
      `}>
        <div className="p-4 border-b">
          <button
            onClick={onNew}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all shadow-md active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Entry
          </button>

          <div className="mt-4 relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search journals..."
              className="w-full pl-9 pr-4 py-2 bg-gray-100 border-none rounded-md text-sm focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredEntries.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">No entries found.</div>
          ) : (
            filteredEntries.map(entry => (
              <div
                key={entry.id}
                onClick={() => {
                  onSelect(entry);
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={`
                  group p-4 border-b cursor-pointer transition-colors relative flex gap-3
                  ${activeId === entry.id ? 'bg-indigo-50 border-r-4 border-r-indigo-600' : 'hover:bg-gray-50'}
                `}
              >
                <div className={`w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-100 border border-gray-200 ${!entry.coverImage ? 'flex items-center justify-center' : ''}`}>
                  {entry.coverImage ? (
                    <img src={entry.coverImage} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`text-sm font-semibold truncate pr-6 ${activeId === entry.id ? 'text-indigo-900' : 'text-gray-900'}`}>
                      {entry.title || 'Untitled Entry'}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Delete this memory?')) onDelete(entry.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-opacity absolute right-2 top-4"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">
                      {entry.mood === 'happy' ? '😊' : entry.mood === 'sad' ? '😔' : '😐'}
                    </span>
                    <p className="text-[10px] text-gray-400 font-mono tracking-tighter">{entry.timestamp.split(',')[0]}</p>
                  </div>
                  <p className="text-[10px] text-gray-500 line-clamp-1 mt-1 leading-relaxed italic">
                    {entry.content || 'Start writing...'}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Monthly Mood Statistics Section */}
        <div className="p-4 bg-gray-50 border-t mt-auto">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex justify-between items-center">
            <span>{stats.monthName} Insights</span>
            <span className="text-gray-300 font-normal">{stats.total} total</span>
          </h4>
          <div className="flex items-center justify-between gap-2 px-1">
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg">😊</span>
              <span className="text-xs font-bold text-gray-600">{stats.happy}</span>
            </div>
            <div className="h-6 w-[1px] bg-gray-200"></div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg">😐</span>
              <span className="text-xs font-bold text-gray-600">{stats.neutral}</span>
            </div>
            <div className="h-6 w-[1px] bg-gray-200"></div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg">😔</span>
              <span className="text-xs font-bold text-gray-600">{stats.sad}</span>
            </div>
          </div>
          
          {/* Visual Bar */}
          {stats.total > 0 && (
            <div className="mt-4 h-1.5 w-full bg-gray-200 rounded-full flex overflow-hidden">
              <div 
                className="bg-green-400 h-full transition-all duration-500" 
                style={{ width: `${(stats.happy / stats.total) * 100}%` }}
              ></div>
              <div 
                className="bg-amber-400 h-full transition-all duration-500" 
                style={{ width: `${(stats.neutral / stats.total) * 100}%` }}
              ></div>
              <div 
                className="bg-rose-400 h-full transition-all duration-500" 
                style={{ width: `${(stats.sad / stats.total) * 100}%` }}
              ></div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
