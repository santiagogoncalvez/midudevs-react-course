import type { SUPPORTED_LANGUAGES, AUTO_LANGUAGE } from './constants';

export type Language = keyof typeof SUPPORTED_LANGUAGES;
export type AutoLanguage = typeof AUTO_LANGUAGE;
export type FromLanguage = Language | AutoLanguage;

export interface State {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  fromText: string;
  result: string;
  loading: boolean;
  detectedLanguage: string | null;
}

export type Action =
  | { type: 'INTERCHANGE_LANGUAGE' }
  | { type: 'SET_FROM_LANGUAGE'; payload: FromLanguage }
  | { type: 'SET_TO_LANGUAGE'; payload: Language }
  | { type: 'SET_FROM_TEXT'; payload: string }
  | {
      type: 'SET_RESULT';
      payload: { result: string; detectedLanguage: string | null };
    };

export enum SectionType {
  From = 'from',
  To = 'to',
}
