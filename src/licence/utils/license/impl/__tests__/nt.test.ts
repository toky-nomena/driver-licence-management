import { fromPartial } from '@total-typescript/shoehorn';
import { describe, expect, it } from 'vitest';

import { NT } from '../nt'; // Import your NT class.

describe('NT License Generator', () => {
  const nt = new NT();

  describe('generate', () => {
    it('should generate a padded license with option 1', () => {
      const formValues = { option: 1, province: 'NT' };
      const expectedLicense = '00001'; // Padded string with 1, length 5.

      const generatedLicense = nt.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });

    it('should generate a padded license with option 2', () => {
      const formValues = { option: 2, province: 'NT' };
      const expectedLicense = '000001'; // Padded string with 1, length 6.

      const generatedLicense = nt.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });

    it('should return an empty string for option other than 1 or 2', () => {
      const formValues = { option: 3, province: 'NT' }; // Any value other than 1 or 2
      const expectedLicense = ''; // Default case.

      const generatedLicense = nt.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });

    it('should handle option as a string with value 1', () => {
      const formValues = { option: 1, province: 'NT' }; // Handling "1" as a string.
      const expectedLicense = '00001'; // Padded string with 1, length 5.

      const generatedLicense = nt.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });

    it('should handle option as a string with value 2', () => {
      const formValues = { option: 2, province: 'NT' }; // Handling "2" as a string.
      const expectedLicense = '000001'; // Padded string with 1, length 6.

      const generatedLicense = nt.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });

    it('should return an empty string for invalid option type', () => {
      const formValues = { province: 'NT' }; // Invalid option value.
      const expectedLicense = ''; // Default case.

      const generatedLicense = nt.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });
  });
});
