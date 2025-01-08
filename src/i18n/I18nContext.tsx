import React, { createContext, useState, useContext, useCallback } from 'react';

import { en } from './translations/en';
import { fr } from './translations/fr';
import type { Language, Translations, I18nContextType, InterpolationValues } from './types';

const translations: Record<Language, Translations> = {
  en,
  fr,
};

type Keys = keyof typeof en & keyof typeof fr;

const I18nContext = createContext<I18nContextType<Keys> | undefined>(undefined);

export function translate(
  key: Parameters<I18nContextType<Keys>['t']>[0],
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

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved || 'en';
  });

  const t: I18nContextType<Keys>['t'] = useCallback(
    (key, values) => translate(key, values, language),
    [language]
  );

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  }, []);

  return (
    <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
