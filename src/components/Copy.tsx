import { CopyButton } from './ui/copy-button';

export function Copy({ children }: { children?: string }) {
  if (children) {
    return (
      <div className="group flex w-full items-center justify-between">
        <span className="flex-1 truncate">{children}</span>
        <CopyButton
          className="h-8 w-8 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          value={children}
        />
      </div>
    );
  }

  return <span className="text-muted-foreground">-</span>;
}
