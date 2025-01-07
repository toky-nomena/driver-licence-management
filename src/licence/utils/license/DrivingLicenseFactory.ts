import type { DrivingLicensePayData } from '../../licence/data';
import type { licensePayload } from '../licence/types';

import { generate as ab } from './impl/ab';
import { generate as qc } from './impl/qc';

// Interface for driver license generator
export type DrivinglicenseGenerator = (params: licensePayload) => string;

// Factory for creating province-specific driver license generators
export class DriverLicenseFactory {
  private static generators: { [key: string]: DrivinglicenseGenerator } = {
    QC: qc,
    AB: ab,
  };

  // Method to get a generator for a specific province
  private static getGenerator(province: string): DrivinglicenseGenerator | undefined {
    return this.generators[province.toUpperCase()];
  }

  // Method to generate a driver's license
  static generate(params: DrivingLicensePayData): { error?: string; license?: string } {
    if (!params.province) {
      return { error: 'Province is required' };
    }

    if (!params.firstName) {
      return { error: 'First name is required' };
    }

    if (!params.lastName) {
      return { error: 'Last name is required' };
    }

    if (!params.dateOfBirth) {
      return { error: 'Date of birth is required' };
    }

    // Get the appropriate generator and generate the license
    const generator = this.getGenerator(params.province);

    if (!generator) {
      return { error: 'Province is not supported' };
    }

    const license = generator(params);

    if (!license) {
      return { error: "Failed to generate driver's license" };
    }

    return { license };
  }
}
