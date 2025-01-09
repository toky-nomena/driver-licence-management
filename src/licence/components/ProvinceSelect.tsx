import type { SelectProps } from '@radix-ui/react-select';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

import { provinces } from '@/licence/utils/provinces';

interface ProvinceSelectProps extends SelectProps {
  value?: string;
  id?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function ProvinceSelect({
  value,
  onChange,
  placeholder = 'Select Province',
  disabled = false,
}: ProvinceSelectProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger>
        {value ? (
          <div className="flex items-center gap-2">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full text-white ${
                provinces.find((p) => p.code === value)?.color || 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span className="text-xs font-medium">{value}</span>
            </div>
            <SelectValue />
          </div>
        ) : (
          <SelectValue placeholder={placeholder} />
        )}
      </SelectTrigger>
      <SelectContent>
        {provinces.map((province) => (
          <SelectItem key={province.code} value={province.code} className="flex items-center gap-2">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full text-white ${province.color}`}
            >
              <span className="text-xs font-medium">{province.code}</span>
            </div>
            <span className="text-sm">
              {province.name} ({province.code})
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
