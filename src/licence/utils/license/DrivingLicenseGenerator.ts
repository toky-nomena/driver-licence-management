import type { LicenseFormValues } from '@/licence/types';

export interface DrivingLicenseGenerator {
  generate(params: LicenseFormValues): string;
}
