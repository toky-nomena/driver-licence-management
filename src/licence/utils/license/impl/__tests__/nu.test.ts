import { fromPartial } from '@total-typescript/shoehorn';
import { describe, expect, it } from 'vitest';

import { NU } from '../nu'; // Import your NT class.

describe('NU License Generator', () => {
  const nu = new NU();

  describe('generate', () => {
    it('should generate a padded license with option 1', () => {
      const formValues = { option: 1, province: 'NU' };
      const expectedLicense = '00001'; // Padded string with 1, length 5.

      const generatedLicense = nu.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });

    it('should generate a padded license with option 2', () => {
      const formValues = { option: 2, province: 'NU' };
      const expectedLicense = '000001'; // Padded string with 1, length 6.

      const generatedLicense = nu.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });

    it('should return an empty string for option other than 1 or 2', () => {
      const formValues = { option: 3, province: 'NU' }; // Any value other than 1 or 2
      const expectedLicense = ''; // Default case.

      const generatedLicense = nu.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });

    it('should handle option as a string with value 1', () => {
      const formValues = { option: 1, province: 'NU' }; // Handling "1" as a string.
      const expectedLicense = '00001'; // Padded string with 1, length 5.

      const generatedLicense = nu.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });

    it('should handle option as a string with value 2', () => {
      const formValues = { option: 2, province: 'NU' }; // Handling "2" as a string.
      const expectedLicense = '000001'; // Padded string with 1, length 6.

      const generatedLicense = nu.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });

    it('should return an empty string for invalid option type', () => {
      const formValues = { province: 'NU' }; // Invalid option value.
      const expectedLicense = ''; // Default case.

      const generatedLicense = nu.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });
  });
});
