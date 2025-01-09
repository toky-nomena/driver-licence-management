import React from 'react';

import { useTranslate } from '../i18n/TranslationContext';

import { Button } from './ui/button';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslate();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <Button variant="outline" onClick={toggleLanguage} className="p-0 px-2">
      <span>{language.toUpperCase()}</span>
    </Button>
  );
};
