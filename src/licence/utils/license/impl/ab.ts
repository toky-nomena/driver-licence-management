import type { DrivingLicenseGenerator } from '../DrivingLicenseGenerator';
import { StringUtils } from '../StringUtils';

import type { LicenseFormValues } from '@/licence/types';

export class AB implements DrivingLicenseGenerator {
  generate({ option }: LicenseFormValues): string {
    switch (option) {
      case 1:
        return (
          StringUtils.pad({ word: '', char: 'A', length: 1 }) +
          StringUtils.pad({ word: '1', char: '0', length: 5 })
        );
      case 2:
        return (
          StringUtils.pad({ word: '', char: 'A', length: 2 }) +
          StringUtils.pad({ word: '1', char: '0', length: 4 })
        );
      case 3:
        return StringUtils.pad({ word: '1', char: '0', length: 9 });
      default:
        return '';
    }
  }
}
