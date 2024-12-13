import { ReactNode } from "react";
import { Input, InputProps } from "./ui/input";
import { CopyButton } from "./ui/copy-button";

interface InputWithCopyProps extends InputProps {
  value: string | undefined;
  error?: string;
  children?: ReactNode;
}

export function InputWithCopy({
  value,
  error,
  children,
  ...inputProps
}: InputWithCopyProps) {
  return (
    <div>
      <div className="flex relative items-center space-x-2">
        <Input {...inputProps} value={value} />
        {value && (
          <CopyButton
            value={value}
            className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground border-none"
          />
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {children}
    </div>
  );
}
