export type View = 'archive' | 'record' | 'style' | 'transcribing';
export type Language = 'en' | 'zh';

export interface Memory {
  id: string;
  title: string;
  date: string;
  quote: string;
  description: string;
  imageUrl: string;
}

export interface NarrativeStyle {
  id: string;
  name: string;
  description: string;
  icon: string;
}
