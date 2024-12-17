import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

interface GenderRadioProps {
  className?: string;
  value: 'male' | 'female';
  onChange: (value: 'male' | 'female') => void;
  disabled?: boolean;
}

export function GenderRadio({ value, onChange, className, disabled }: GenderRadioProps) {
  return (
    <RadioGroup
      disabled={disabled}
      value={value}
      onValueChange={onChange}
      className={cn('flex gap-3 overflow-x-auto transition-colors', className)}
    >
      {[
        { id: 'male', label: 'Male', value: 'male' },
        { id: 'female', label: 'Female', value: 'female' },
      ].map((item) => (
        <label
          key={item.id}
          htmlFor={item.id}
          className={cn(
            'group relative flex flex-1 cursor-pointer items-center gap-3 rounded-lg border bg-background px-4 py-2 hover:bg-accent/50',
            value === item.value
              ? 'border-2 border-primary bg-primary/5 text-primary'
              : 'border-border text-muted-foreground'
          )}
        >
          <span className="text-sm font-medium">{item.label}</span>
          <RadioGroupItem
            value={item.value}
            id={item.id}
            className={cn(
              'absolute right-3 h-4 w-4 border-2',
              value === item.value ? 'border-primary text-primary' : 'border-muted-foreground'
            )}
          />
        </label>
      ))}
    </RadioGroup>
  );
}
