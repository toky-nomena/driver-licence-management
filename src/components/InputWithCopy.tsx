import { ReactNode } from 'react';
import { Input, InputProps } from './ui/input';
import { CopyButton } from './ui/copy-button';
import { cn } from '@/lib/utils';

interface InputWithCopyProps extends InputProps {
  value: string | undefined;
  error?: string;
  children?: ReactNode;
}

export function InputWithCopy({ value, error, children, ...inputProps }: InputWithCopyProps) {
  return (
    <div>
      <div className="relative flex items-center space-x-2">
        <Input
          {...inputProps}
          value={value}
          className={cn(inputProps.className, error && 'border-destructive')}
        />
        {value && (
          <CopyButton
            value={value}
            className="absolute right-2 top-2.5 h-4 w-4 border-none text-muted-foreground"
          />
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {children}
    </div>
  );
}
