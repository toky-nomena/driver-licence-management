import { Hexagon } from 'lucide-react';

import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useTranslate } from './i18n/TranslationContext';
import { ThemeSwitcher } from './ThemeSwitcher';

export function MainHeader() {
  const { t } = useTranslate();
  return (
    <div className="flex items-center justify-between border-b bg-background/80 px-4 py-2 backdrop-blur-md dark:border-gray-700">
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-row items-center gap-2">
          <Hexagon className="h-6 w-6" strokeWidth={2} />
          <h1 className="font-semibold">{t('title')}</h1>
        </div>

        <span className="m-2 rounded-full border border-yellow-500 px-3 py-1 text-xs text-yellow-500">
          {t('appWarning', { version: import.meta.env.VITE_APP_VERSION })}
        </span>
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </div>
  );
}
