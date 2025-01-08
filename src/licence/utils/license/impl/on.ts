import type { DrivingLicenseGenerator } from '../DrivingLicenseGenerator';
import { StringUtils } from '../StringUtils';

import { format } from '@/lib/date';
import type { LicenseFormValues } from '@/licence/types';

export class ON implements DrivingLicenseGenerator {
  generate({ dateOfBirth, lastName, gender }: LicenseFormValues): string {
    const month = parseInt(format(dateOfBirth, 'MM'), 10);
    const genderAdjustedMonth = gender === 'male' ? month : month + 50;

    return (
      StringUtils.first(lastName.toUpperCase()) +
      StringUtils.pad({ word: '', char: '0', length: 8 }) +
      format(dateOfBirth, 'YY') +
      String(genderAdjustedMonth).padStart(2, '0') +
      format(dateOfBirth, 'DD')
    );
  }
}
