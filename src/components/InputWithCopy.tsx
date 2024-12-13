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
      <div className="flex items-center space-x-2">
        <Input {...inputProps} value={value} />
        <CopyButton className="w-8 h-8" value={value} />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {children}
    </div>
  );
}
