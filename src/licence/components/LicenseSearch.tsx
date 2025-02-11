import { Search } from 'lucide-react';
import { useState, useTransition } from 'react';

import { Input } from '@/components/ui/input';
import { useTranslate } from '@/i18n/TranslationContext';
import { cn } from '@/lib/utils';

interface LicenseSearchProps {
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function LicenseSearch({ onChange, disabled }: LicenseSearchProps) {
  const [state, setState] = useState('');
  const [, startTransition] = useTransition();

  const { t } = useTranslate();

  return (
    <div className="flex w-full items-center gap-2">
      <div className="relative w-96 rounded-lg bg-background">
        <Search className={cn('absolute left-2 top-2.5 h-4 w-4')} />
        <Input
          type="search"
          placeholder={t('search')}
          className={cn('h-10 w-full pl-8 transition-opacity duration-200')}
          value={state}
          onChange={(e) => {
            setState(e.target.value);
            startTransition(() => {
              onChange(e.target.value);
            });
          }}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
