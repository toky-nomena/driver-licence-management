import { generate as qc } from "./impl/qc";
import { generate as ab } from "./impl/ab";

interface Person {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string | undefined;
}

// Interface for driver license generator
export type DriverLicenceGenerator = (
  params: Person & { province?: string }
) => string;

// Factory for creating province-specific driver license generators
export class DriverLicenseFactory {
  private static generators: { [key: string]: DriverLicenceGenerator } = {
    QC: qc,
    AB: ab,
  };

  // Method to get a generator for a specific province
  private static getGenerator(
    province: string
  ): DriverLicenceGenerator | undefined {
    return this.generators[province.toUpperCase()];
  }

  // Method to generate a driver's license
  static generate(params: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date | string | undefined;
    province?: string;
  }): { error: string; license: string } {
    // Validate required parameters
    if (!params.province) {
      return {
        error: "Province is required",
        license: "",
      };
    }

    if (!params.firstName || !params.lastName || !params.dateOfBirth) {
      return {
        error: "First name, last name, and date of birth are required",
        license: "",
      };
    }

    // Get the appropriate generator and generate the license
    const generator = this.getGenerator(params.province);

    if (!generator) {
      return {
        error: "Province is not supported",
        license: "",
      };
    }

    const license = generator(params);
    if (!license) {
      return {
        error: "Failed to generate driver's license",
        license: "",
      };
    }

    return {
      error: "",
      license,
    };
  }
}
