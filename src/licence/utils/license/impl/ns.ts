import type { DrivingLicenseGenerator } from '../DrivingLicenseGenerator';
import { StringUtils } from '../StringUtils';

import type { LicenseFormValues } from '@/licence/types';

export class NS implements DrivingLicenseGenerator {
  generate({ lastName }: LicenseFormValues): string {
    return StringUtils.first(lastName.toUpperCase()) + 'AAAA' + '01' + '01' + '99999';
  }
}
