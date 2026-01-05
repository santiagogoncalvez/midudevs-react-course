import type { FromLanguage, Language } from '../types';

interface ResultApi {
  translatedText: string;
  detectedLanguage: {language: string};
}

interface Props {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  text: string;
}

const API_URL = 'http://localhost:5000/translate';

export async function translate({ fromLanguage, toLanguage, text }: Props) {
  if (fromLanguage === toLanguage) return { translatedText: text };

  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      q: text,
      source: fromLanguage,
      target: toLanguage,
      format: 'text',
    }),
    headers: { 'Content-type': 'application/json' },
  });
  const result = (await response.json()) as ResultApi;

  return {
    translatedText: result.translatedText,
    detectedLanguage: result.detectedLanguage?.language
      ? result.detectedLanguage.language
      : null,
  };
}
