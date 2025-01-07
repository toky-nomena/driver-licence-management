import type { DrivingLicenseGenerator } from '../DrivingLicenseGenerator';
import { StringUtils } from '../StringUtils';

import type { LicenseFormValues } from '@/licence/types';

export class NB implements DrivingLicenseGenerator {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  generate(_: LicenseFormValues): string {
    return StringUtils.pad({ word: '1001', char: '0', length: 4, padIndex: 4 });
  }
}
