import type { DrivingLicenseGenerator } from '../DrivingLicenseGenerator';
import { StringUtils } from '../StringUtils';

import type { LicenseFormValues } from '@/licence/types';

export class NT implements DrivingLicenseGenerator {
  generate(params: LicenseFormValues): string {
    switch (params.option) {
      case 1:
        return StringUtils.pad({ word: '1', char: '0', length: 5 });
      case 2:
        return StringUtils.pad({ word: '1', char: '0', length: 6 });
      default:
        return '';
    }
  }
}
