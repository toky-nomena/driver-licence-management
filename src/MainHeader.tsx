import { Hexagon } from 'lucide-react';

import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useTranslate } from './i18n/TranslationContext';
import { ThemeSwitcher } from './ThemeSwitcher';

export function MainHeader() {
  const { t } = useTranslate();
  return (
    <div className="flex items-center justify-between border-b bg-gradient-to-r px-4 py-2 dark:border-gray-700">
      <div className="flex flex-row items-center gap-2">
        <Hexagon className="h-6 w-6" strokeWidth={2} />
        <h1 className="font-semibold">{t('title')}</h1>
      </div>

      <div className="flex flex-row items-center justify-center gap-2">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </div>
  );
}
