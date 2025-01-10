import React, { createContext, useState, useContext, useCallback, useTransition } from 'react';

import { en } from './translations/en';
import { fr } from './translations/fr';
import type { Language, Translations, TranslationContextType, InterpolationValues } from './types';

const translations: Record<Language, Translations> = {
  en,
  fr,
};

type Keys = keyof typeof en & keyof typeof fr;

const TranslationContext = createContext<TranslationContextType<Keys> | undefined>(undefined);

function translate(
  key: Parameters<TranslationContextType<Keys>['t']>[0],
  values?: InterpolationValues,
  language: keyof typeof translations = 'en' // Default to English
) {
  return interpolate(translations[language]?.[key] || key, values);
}

const interpolate = (text: string, values?: InterpolationValues): string => {
  if (!values) return text;

  return Object.entries(values).reduce(
    (acc, [key, value]) => acc.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), String(value)),
    text
  );
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved || 'en';
  });

  const [, startTransition] = useTransition();

  const t: TranslationContextType<Keys>['t'] = useCallback(
    (key, values) => translate(key, values, language),
    [language]
  );

  const handleSetLanguage = useCallback((lang: Language) => {
    startTransition(() => setLanguage(lang));
    localStorage.setItem('language', lang);
  }, []);

  return (
    <TranslationContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslate = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslate must be used within an TranslationProvider');
  }
  return context;
};
