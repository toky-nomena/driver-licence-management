import { provinces } from "@/utils/provinces";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ProvinceSelectProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ProvinceSelect({
  value,
  onChange,
  placeholder = "Select Province",
}: ProvinceSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
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
