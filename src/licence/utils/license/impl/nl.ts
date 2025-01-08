import type { DrivingLicenseGenerator } from '../DrivingLicenseGenerator';

import { format } from '@/lib/date';
import type { LicenseFormValues } from '@/licence/types';

export class NL implements DrivingLicenseGenerator {
  generate({ dateOfBirth }: LicenseFormValues): string {
    const value = 'A' + format(dateOfBirth, 'YYMMDD') + '00';
    return value + this.postfix(value);
  }

  private postfix(value: string): string {
    const result = value
      .substring(1)
      .split('')
      .map((c, index) => parseInt(c, 10) * (index + 1))
      .reduce((a, b) => a + b, 0);
    return (Math.ceil(result / 10) * 10 - result).toString();
  }
}
