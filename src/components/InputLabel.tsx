import type { LabelHTMLAttributes, ReactNode } from 'react';

import { Label } from './ui/label';

import { cn } from '@/lib/utils';

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  description?: string;
  required?: boolean;
}

export function InputLabel({ children, description, required, ...props }: InputLabelProps) {
  return (
    <Label
      {...props}
      className={cn('mb-2 block text-sm font-medium leading-none', props.className)}
    >
      {children}{' '}
      {description && <span className="text-xs text-muted-foreground">({description}) </span>}
      {required && <span className="text-destructive">*</span>}
    </Label>
  );
}
