import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

import { provinces } from '@/utils/provinces';

interface ProvinceSelectProps {
  value?: string;
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
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {provinces.map((province) => (
          <SelectItem key={province.code} value={province.code}>
            {province.label} ({province.code})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
