import { CopyButton } from './ui/copy-button';

interface CopyProps {
  children?: React.ReactNode;
  value?: string;
}

export function Copy({ value, children }: CopyProps) {
  if (value) {
    return (
      <div className="group flex w-full items-center justify-between">
        {children}
        <CopyButton
          className="h-8 w-8 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          value={value}
        />
      </div>
    );
  }

  return <span className="text-muted-foreground">-</span>;
}
