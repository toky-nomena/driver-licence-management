import type { ComponentPropsWithoutRef } from 'react';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTranslate } from '@/i18n/TranslationContext';
import { cn } from '@/lib/utils';

interface GenderRadioProps extends Omit<ComponentPropsWithoutRef<typeof RadioGroup>, 'onChange'> {
  className?: string;
  value: 'male' | 'female';
  onChange: (value: 'male' | 'female') => void;
}

export function GenderRadio({ onChange, className, value, ...props }: GenderRadioProps) {
  const { t } = useTranslate();
  return (
    <RadioGroup
      {...props}
      value={value}
      onValueChange={onChange}
      className={cn('flex gap-3 overflow-x-auto transition-colors', className)}
    >
      {['male', 'female'].map((item) => (
        <label
          key={item}
          htmlFor={item}
          className={cn(
            'group relative flex flex-1 cursor-pointer items-center gap-3 rounded-lg border px-4 py-2 hover:bg-accent/50',
            value === item
              ? 'border-2 border-primary bg-primary/5 text-primary'
              : 'border-border text-muted-foreground'
          )}
        >
          <span className="text-sm font-medium">{t(item)}</span>
          <RadioGroupItem
            value={item}
            id={item}
            className={cn(
              'absolute right-3 h-4 w-4 border-2',
              value === item ? 'border-primary text-primary' : 'border-muted-foreground'
            )}
          />
        </label>
      ))}
    </RadioGroup>
  );
}
