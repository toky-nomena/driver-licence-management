import type { DrivingLicenseGenerator } from '../DrivingLicenseGenerator';

import { format } from '@/lib/date';
import type { LicenseFormValues } from '@/licence/types';

export class PE implements DrivingLicenseGenerator {
  generate({ dateOfBirth }: LicenseFormValues): string {
    const licence = '0000' + format(dateOfBirth, 'DDMMYY') + '0';
    return licence + this.getValidationNumber(licence);
  }

  private getValidationNumber(license: string) {
    const validation = [...license].reduce((sum, digit, index) => {
      let num = parseInt(digit, 10);
      if (index % 2 === 0) {
        num *= 2;
        if (num > 9) num -= 9; // Sum of digits for numbers > 9
      }
      return sum + num;
    }, 0);

    return ((10 - (validation % 10)) % 10).toString();
  }
}
