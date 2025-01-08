import type { DrivingLicenseGenerator } from '../DrivingLicenseGenerator';
import { StringUtils } from '../StringUtils';

import type { LicenseFormValues } from '@/licence/types';

export class YT implements DrivingLicenseGenerator {
  // eslint-disable-next-line no-empty-pattern
  generate({}: LicenseFormValues): string {
    return StringUtils.pad({ word: '1', char: '0', length: 6 });
  }
}
