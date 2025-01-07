import type { DrivingLicenseGenerator } from './DrivingLicenseGenerator';
import { AB } from './impl/ab';
import { NB } from './impl/nb';
import { QC } from './impl/qc';

import type { LicenseFormValues } from '@/licence/types';

// Interface for driver license generator

// Factory for creating province-specific driver license generators
export class DriverLicenseFactory {
  private static generators: Record<string, DrivingLicenseGenerator> = {
    QC: new QC(),
    AB: new AB(),
    NB: new NB(),
  };

  // Method to get a generator for a specific province
  private static getGenerator(province: string): DrivingLicenseGenerator | undefined {
    return this.generators[province.toUpperCase()];
  }

  // Method to generate a driver's license
  static generate(params: LicenseFormValues): { errors: string[]; license?: string } {
    const errors: string[] = [];

    if (!params.province) {
      errors.push('Province is required');
    }

    if (!params.firstName) {
      errors.push('First name is required');
    }

    if (!params.lastName) {
      errors.push('Last name is required');
    }

    if (!params.dateOfBirth) {
      errors.push('Date of birth is required');
    }

    // Return errors if any
    if (errors.length > 0) {
      return { errors };
    }

    // Get the appropriate generator and generate the license
    const generator = this.getGenerator(params.province!);

    if (!generator) {
      return { errors: ['Province is not supported'] };
    }

    const license = generator.generate(params);

    if (!license) {
      return { errors: ["Failed to generate driver's license"] };
    }

    return { license, errors: [] };
  }
}
