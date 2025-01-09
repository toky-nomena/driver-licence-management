import React from 'react';

import { useTranslate } from '../i18n/TranslationContext';

import { Button } from './ui/button';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslate();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <Button className="border border-white" variant="ghost" size="icon" onClick={toggleLanguage}>
      {language.toUpperCase()}
    </Button>
  );
};
