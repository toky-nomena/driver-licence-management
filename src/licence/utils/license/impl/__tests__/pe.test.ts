import { fromPartial } from '@total-typescript/shoehorn';
import { describe, it, expect } from 'vitest';

import { PE } from '../pe'; // Replace with the actual file path

const pe = new PE();

describe('PE License Generator', () => {
  describe('generate', () => {
    it('should generate the correct license based on dateOfBirth', () => {
      const formValues = { dateOfBirth: '1990-01-01', province: 'PE' }; // Example date of birth.
      const expectedLicense = '000001019009'; // Adjusted expected value according to Luhn algorithm and given birthdate.

      const generatedLicense = pe.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });

    it('should handle edge case where dateOfBirth is at the end of the year', () => {
      const formValues = { dateOfBirth: '1999-12-31', province: 'PE' }; // Last day of the year.
      const expectedLicense = '000031129901'; // Adjusted expected value.

      const generatedLicense = pe.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });

    it('should handle dateOfBirth with different day, month, and year values', () => {
      const formValues = { dateOfBirth: '2005-07-15', province: 'PE' };
      const expectedLicense = '000015070501'; // Adjusted expected value.

      const generatedLicense = pe.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });
  });
});
