
import { ThemeConfig, CoverPreset } from './types';

export const THEMES: ThemeConfig[] = [
  {
    id: 'classic',
    name: 'Classic Paper',
    paperBg: 'bg-[#fdfcf0]',
    textColor: 'text-gray-800',
    lineColor: 'rgba(0,0,0,0.1)',
    fontClass: 'font-serif-zh',
    accentColor: 'blue-500',
    textureOverlay: 'https://www.transparenttextures.com/patterns/natural-paper.png',
    textureOpacity: 0.15
  },
  {
    id: 'vintage',
    name: 'Vintage Parchment',
    paperBg: 'bg-[#e7d9b9]',
    textColor: 'text-amber-950',
    lineColor: 'rgba(120,60,0,0.15)',
    fontClass: 'font-handwriting',
    accentColor: 'amber-700',
    textureOverlay: 'https://www.transparenttextures.com/patterns/parchment.png',
    textureOpacity: 0.2
  },
  {
    id: 'leather',
    name: 'Rustic Leather',
    paperBg: 'bg-[#3d2b1f]',
    textColor: 'text-amber-100',
    lineColor: 'rgba(255,255,255,0.05)',
    fontClass: 'font-serif-zh',
    accentColor: 'amber-500',
    textureOverlay: 'https://www.transparenttextures.com/patterns/leather.png',
    textureOpacity: 0.3
  },
  {
    id: 'recycled',
    name: 'Recycled Fiber',
    paperBg: 'bg-[#d2ccc4]',
    textColor: 'text-slate-800',
    lineColor: 'rgba(0,0,0,0.1)',
    fontClass: 'font-sans',
    accentColor: 'green-700',
    textureOverlay: 'https://www.transparenttextures.com/patterns/recycled-paper-texture.png',
    textureOpacity: 0.4
  },
  {
    id: 'linen',
    name: 'Soft Linen',
    paperBg: 'bg-[#f4f1ea]',
    textColor: 'text-slate-700',
    lineColor: 'rgba(0,0,0,0.05)',
    fontClass: 'font-sans',
    accentColor: 'slate-500',
    textureOverlay: 'https://www.transparenttextures.com/patterns/linen.png',
    textureOpacity: 0.2
  },
  {
    id: 'slate',
    name: 'Industrial Slate',
    paperBg: 'bg-[#2c3e50]',
    textColor: 'text-slate-100',
    lineColor: 'rgba(255,255,255,0.05)',
    fontClass: 'font-sans',
    accentColor: 'blue-300',
    textureOverlay: 'https://www.transparenttextures.com/patterns/dark-matter.png',
    textureOpacity: 0.2
  },
  {
    id: 'minimal',
    name: 'Clean Slate',
    paperBg: 'bg-white',
    textColor: 'text-slate-900',
    lineColor: 'rgba(0,0,0,0.05)',
    fontClass: 'font-sans',
    accentColor: 'gray-800'
  },
  {
    id: 'night',
    name: 'Starry Night',
    paperBg: 'bg-slate-900',
    textColor: 'text-slate-200',
    lineColor: 'rgba(255,255,255,0.08)',
    fontClass: 'font-serif-zh',
    accentColor: 'indigo-400',
    textureOverlay: 'https://www.transparenttextures.com/patterns/stardust.png',
    textureOpacity: 0.1
  },
  {
    id: 'floral',
    name: 'Floral Garden',
    paperBg: 'bg-rose-50',
    textColor: 'text-rose-900',
    lineColor: 'rgba(255,100,100,0.1)',
    fontClass: 'font-sketch',
    accentColor: 'rose-400',
    textureOverlay: 'https://www.transparenttextures.com/patterns/fancy-flower.png',
    textureOpacity: 0.1
  }
];

export const PRESET_COVERS: CoverPreset[] = [
  { id: 'c1', name: 'Forest Mist', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000' },
  { id: 'c2', name: 'Desert Sands', url: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80&w=1000' },
  { id: 'c3', name: 'Ocean Calm', url: 'https://images.unsplash.com/photo-1505118380757-91f5f45d8de4?auto=format&fit=crop&q=80&w=1000' },
  { id: 'c4', name: 'Starry Sky', url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=1000' },
  { id: 'c5', name: 'Soft Linen', url: 'https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&q=80&w=1000' },
  { id: 'c6', name: 'Cherry Blossom', url: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&q=80&w=1000' }
];
