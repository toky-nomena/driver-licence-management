import { describe, it, expect } from 'vitest';

import { ON } from '../on';

import type { LicenseFormValues } from '@/licence/types';

// Helper function to format test cases more easily
const generateLicense = (formValues: LicenseFormValues) => {
  const generator = new ON();
  return generator.generate(formValues);
};

describe('ON Driving License Generator', () => {
  describe('generate', () => {
    it('should generate a valid driving license for a male', () => {
      const formValues: LicenseFormValues = {
        lastName: 'Smith',
        firstName: 'John',
        middleName: 'Paul',
        dateOfBirth: '1985-06-15',
        gender: 'male',
      };
      expect(generateLicense(formValues)).toBe('S1913-4637-850615');
    });

    it('should generate a valid driving license for a female', () => {
      const formValues: LicenseFormValues = {
        lastName: 'Jones',
        firstName: 'Alice',
        middleName: 'Mary',
        dateOfBirth: '1992-03-22',
        gender: 'female',
      };
      expect(generateLicense(formValues)).toBe('J1015-0546-925322');
    });

    it('should handle missing middle names correctly', () => {
      const formValues: LicenseFormValues = {
        lastName: 'Brown',
        firstName: 'Emily',
        middleName: '',
        dateOfBirth: '2000-12-01',
        gender: 'female',
      };
      expect(generateLicense(formValues)).toBe('B0218-2540-006201');
    });

    it('should handle edge cases for dates correctly', () => {
      const formValues: LicenseFormValues = {
        lastName: 'Green',
        firstName: 'Olivia',
        middleName: 'Ivy',
        dateOfBirth: '1900-01-01',
        gender: 'male',
      };
      expect(generateLicense(formValues)).toBe('G0718-6540-000101');
    });
  });
});
