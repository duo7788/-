
import React, { useRef } from 'react';
import { PRESET_COVERS } from '../constants';

interface Props {
  onSelect: (url: string) => void;
  onClose: () => void;
}

const CoverPicker: React.FC<Props> = ({ onSelect, onClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onSelect(reader.result);
          onClose();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-scale-up">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">Customize Entry Cover</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {/* Custom Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="relative aspect-video rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 hover:border-indigo-500 hover:bg-indigo-50 transition-all text-gray-500 hover:text-indigo-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span className="text-xs font-semibold">Upload Custom</span>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
                accept="image/*"
              />
            </button>

            {/* Presets */}
            {PRESET_COVERS.map(preset => (
              <button
                key={preset.id}
                onClick={() => { onSelect(preset.url); onClose(); }}
                className="group relative aspect-video rounded-xl overflow-hidden hover:ring-4 hover:ring-indigo-500 transition-all shadow-sm"
              >
                <img src={preset.url} alt={preset.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute bottom-2 left-2 text-[10px] text-white font-bold uppercase tracking-widest drop-shadow-md">
                  {preset.name}
                </div>
              </button>
            ))}
          </div>

          <button 
            onClick={() => { onSelect(''); onClose(); }}
            className="w-full py-3 text-sm font-semibold text-gray-500 hover:text-red-600 transition-colors bg-gray-100 rounded-lg"
          >
            Remove Cover Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoverPicker;
