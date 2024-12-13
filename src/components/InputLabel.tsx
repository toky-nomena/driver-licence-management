import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { LabelHTMLAttributes, ReactNode } from "react";

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  description?: string;
  required?: boolean;
}

export function InputLabel({
  children,
  description,
  required,
  ...props
}: InputLabelProps) {
  return (
    <Label
      {...props}
      className={cn("block font-medium leading-none mb-2", props.className)}
    >
      {children}{" "}
      {description && (
        <span className="text-sm text-muted-foreground">({description}) </span>
      )}
      {required && <span className="text-destructive">*</span>}
    </Label>
  );
}