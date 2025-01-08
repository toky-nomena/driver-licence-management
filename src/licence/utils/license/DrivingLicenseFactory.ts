import { isValidDateOfBirth } from '../validators';

import type { DrivingLicenseGenerator } from './DrivingLicenseGenerator';
import { generators } from './generators';

import type { LicenseFormValues } from '@/licence/types';

export class DriverLicenseFactory {
  /**
   * Retrieves a generator for the specified province.
   * @param province Province code.
   * @returns Corresponding DrivingLicenseGenerator or undefined if not found.
   */
  private static getGenerator(province: string): DrivingLicenseGenerator | undefined {
    return generators[province.toUpperCase()];
  }

  /**
   * Validates the input parameters for license generation.
   * @param params License form values.
   * @returns Array of error messages.
   */
  private static validateParams(params: LicenseFormValues): string[] {
    const errors: string[] = [];

    if (!params.province) errors.push('Province is required');
    if (!params.firstName) errors.push('First name is required');
    if (!params.lastName) errors.push('Last name is required');

    const dateValidation = isValidDateOfBirth(params.dateOfBirth);

    if (dateValidation) {
      errors.push(dateValidation);
    }

    return errors;
  }

  /**
   * Generates a driver's license for the specified province and parameters.
   * @param params License form values.
   * @returns Object containing errors or the generated license.
   */
  static generate(params: LicenseFormValues): { errors: string[]; license?: string } {
    const errors = this.validateParams(params);

    if (errors.length > 0) {
      return { errors };
    }

    const generator = this.getGenerator(params.province ?? '');

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
