
export type JournalTheme = 'classic' | 'vintage' | 'minimal' | 'night' | 'floral' | 'leather' | 'recycled' | 'linen' | 'slate';
export type UserMood = 'happy' | 'neutral' | 'sad' | null;

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  date: string; // ISO string for reliable filtering/sorting
  theme: JournalTheme;
  coverImage?: string; // Base64 or URL
  mood?: UserMood; // Manually selected mood
  aiMood?: string; // AI analyzed mood
  aiSummary?: string;
}

export interface ThemeConfig {
  id: JournalTheme;
  name: string;
  paperBg: string;
  textColor: string;
  lineColor: string;
  fontClass: string;
  accentColor: string;
  textureOverlay?: string; // URL for texture pattern
  textureOpacity?: number;
}

export interface CoverPreset {
  id: string;
  url: string;
  name: string;
}
