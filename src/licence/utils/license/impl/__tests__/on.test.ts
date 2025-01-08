import { fromPartial } from '@total-typescript/shoehorn';
import { describe, it, expect } from 'vitest';

import { ON } from '../on'; // Import your ON class.

const on = new ON();

describe('ON License Generator', () => {
  describe('generate', () => {
    it('should generate the correct license for a male with a given dateOfBirth and lastName', () => {
      const formValues = {
        dateOfBirth: '1990-05-20',
        lastName: 'Smith',
        gender: 'male',
      } as const;
      const expectedLicense = 'S00000000900520'; // Expected output.

      const generatedLicense = on.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });

    it('should generate the correct license for a female with a given dateOfBirth and lastName', () => {
      const formValues = {
        dateOfBirth: '1990-05-20',
        lastName: 'Johnson',
        gender: 'female',
      } as const;
      const expectedLicense = 'J00000000905520'; // Adjusted month for female (May -> 55).

      const generatedLicense = on.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });

    it('should generate the correct license for a single-digit month for a male', () => {
      const formValues = {
        dateOfBirth: '1990-01-10',
        lastName: 'Adams',
        gender: 'male',
      } as const;
      const expectedLicense = 'A00000000900110'; // January, male, expected formatting.

      const generatedLicense = on.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });

    it('should generate the correct license for a female with a single-digit month', () => {
      const formValues = {
        dateOfBirth: '1990-01-10',
        lastName: 'Adams',
        gender: 'female',
      } as const;
      const expectedLicense = 'A00000000905110'; // Adjusted month for female (January -> 51).

      const generatedLicense = on.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });

    it('should handle edge case for a dateOfBirth at the end of the year for a male', () => {
      const formValues = {
        dateOfBirth: '1999-12-31',
        lastName: 'Zebra',
        gender: 'male',
      } as const;
      const expectedLicense = 'Z00000000991231'; // December (12) for male.

      const generatedLicense = on.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });

    it('should handle edge case for a dateOfBirth at the end of the year for a female', () => {
      const formValues = {
        dateOfBirth: '1999-12-31',
        lastName: 'Zebra',
        gender: 'female',
      } as const;
      const expectedLicense = 'Z00000000996231'; // Adjusted month for female (December -> 62).

      const generatedLicense = on.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });
  });
});
