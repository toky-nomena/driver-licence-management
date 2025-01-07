import type { DrivingLicenseGenerator } from '../DrivingLicenseGenerator';
import { StringUtils } from '../StringUtils';

import type { LicenseFormValues } from '@/licence/types';

export class AB implements DrivingLicenseGenerator {
  generate(params: LicenseFormValues): string {
    switch (params.option) {
      case 1:
        return (
          StringUtils.pad({ word: '', char: 'A', length: 1, padIndex: 0 }) +
          StringUtils.pad({ word: '1', char: '0', length: 5, padIndex: 0 })
        );
      case 2:
        return (
          StringUtils.pad({ word: '', char: 'A', length: 2, padIndex: 0 }) +
          StringUtils.pad({ word: '1', char: '0', length: 4, padIndex: 0 })
        );
      case 3:
        return StringUtils.pad({ word: '1', char: '0', length: 9, padIndex: 0 });
      default:
        return '';
    }
  }
}
