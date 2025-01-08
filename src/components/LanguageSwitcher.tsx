import React from 'react';

import { useI18n } from '../i18n/I18nContext';

import { Button } from './ui/button';
export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useI18n();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <Button className="border border-white" variant="ghost" size="icon" onClick={toggleLanguage}>
      {language.toUpperCase()}
    </Button>
  );
};
