import type { ReactNode } from 'react';

import { CopyButton } from '../../components/ui/copy-button';
import { Input } from '../../components/ui/input';
import type { InputProps } from '../../components/ui/input';

import { cn } from '@/lib/utils';

interface InputWithCopyProps extends InputProps {
  value: string | undefined;
  error?: string | false | null;
  children?: ReactNode;
}

export function InputWithCopy({ value, error, children, ...inputProps }: InputWithCopyProps) {
  return (
    <div>
      <div className="relative flex items-center">
        <Input
          {...inputProps}
          value={value}
          className={cn(inputProps.className, error && 'border-red-500')}
        />
        {value && (
          <CopyButton
            value={value}
            className="absolute right-2 top-3.5 h-4 w-4 border-none text-muted-foreground"
          />
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {children}
    </div>
  );
}
