import { CopyButton } from "./ui/copy-button";

export function Copy({ children }: { children?: string }) {
  if (children) {
    return (
      <div className="flex justify-between items-center w-full group">
        <span className="flex-1 truncate">{children}</span>
        <CopyButton
          className="w-8 h-8 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          value={children}
        />
      </div>
    );
  }

  return <span className="text-muted-foreground">-</span>;
}
