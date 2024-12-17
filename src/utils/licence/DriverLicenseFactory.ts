import { generate as ab } from './impl/ab';
import { generate as qc } from './impl/qc';

interface Person {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string | undefined;
}

// Interface for driver license generator
export type DriverLicenceGenerator = (params: Person & { province?: string }) => string;

// Factory for creating province-specific driver license generators
export class DriverLicenseFactory {
  private static generators: { [key: string]: DriverLicenceGenerator } = {
    QC: qc,
    AB: ab,
  };

  // Method to get a generator for a specific province
  private static getGenerator(province: string): DriverLicenceGenerator | undefined {
    return this.generators[province.toUpperCase()];
  }

  // Method to generate a driver's license
  static generate(params: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date | string | undefined;
    province?: string;
    gender?: string;
  }): { error?: string; license?: string } {
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
