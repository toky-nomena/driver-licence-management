import { CopyButton } from '../../components/ui/copy-button';

interface CopyProps {
  children?: React.ReactNode;
  value?: string;
}

export function Copy({ value, children }: CopyProps) {
  return (
    <div className="group relative flex items-center gap-2">
      {children}
      <CopyButton value={value} className="invisible group-hover:visible" />
    </div>
  );
}
