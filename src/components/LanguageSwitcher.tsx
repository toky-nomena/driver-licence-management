import React, { useState, useTransition } from 'react';

import { useTranslate } from '../i18n/TranslationContext';

import { Button } from './ui/button';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslate();
  const [lang, setLang] = useState(language);
  const [loading, startTransition] = useTransition();

  const toggleLanguage = () => {
    const lang = language === 'en' ? 'fr' : 'en';
    setLang(lang);
    startTransition(() => {
      setLanguage(lang);
    });
  };

  return (
    <Button variant="outline" onClick={toggleLanguage} className="h-10 w-10" disabled={loading}>
      <span>{lang.toUpperCase()}</span>
    </Button>
  );
};
