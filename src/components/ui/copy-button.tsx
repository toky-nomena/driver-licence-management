import { CheckIcon, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button, ButtonProps } from './button';

import { cn } from '@/lib/utils';

async function copyToClipboardWithMeta(value: string) {
  navigator.clipboard.writeText(value);
}

interface CopyButtonProps extends ButtonProps {
  value?: string;
}

export function CopyButton({ value, className, ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <Button
      disabled={!value}
      size="icon"
      variant={'outline'}
      className={cn('relative z-10 h-6 w-6 [&_svg]:h-3 [&_svg]:w-3', className)}
      onClick={(e) => {
        e.preventDefault();
        if (value) {
          copyToClipboardWithMeta(value);
          setHasCopied(true);
        }
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon /> : <Copy />}
    </Button>
  );
}
