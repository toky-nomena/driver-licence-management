import { describe, it, expect } from 'vitest';

import { DriverLicenseFactory } from '../license/DrivingLicenseFactory';

import type { LicenseFormValues } from '@/licence/types';

describe('DriverLicenseFactory', () => {
  const baseInput: LicenseFormValues = {
    firstName: 'John',
    lastName: 'Doe',
    middleName: '',
    dateOfBirth: '1990-01-01',
    email: 'john@example.com',
    gender: 'male',
    description: '',
    drivingLicense: '',
    option: 1,
    province: 'QC',
  };

  describe('Quebec (QC)', () => {
    it('generates valid QC license', () => {
      const result = DriverLicenseFactory.generate({
        ...baseInput,
        province: 'QC',
      });

      expect(result.license).toBe('D0005-010190-05');
      expect(result.errors).toHaveLength(0);
    });

    it('handles different date formats', () => {
      const result = DriverLicenseFactory.generate({
        ...baseInput,
        province: 'QC',
        dateOfBirth: '1990-01-01',
      });

      expect(result.license).toBe('D0005-010190-05');
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Alberta (AB)', () => {
    it('generates valid AB license', () => {
      const result = DriverLicenseFactory.generate({
        ...baseInput,
        province: 'AB',
        option: 1,
      });

      expect(result.license).toBe('A00001');
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Error handling', () => {
    it('handles unsupported province', () => {
      const result = DriverLicenseFactory.generate({
        ...baseInput,
        province: 'XX',
      });

      expect(result.license).toBeUndefined();
      expect(result.errors).toContain('Province is not supported');
    });

    it('handles missing required fields', () => {
      const result = DriverLicenseFactory.generate({
        ...baseInput,
        firstName: '',
        lastName: '',
      });

      expect(result.license).toBeUndefined();
      expect(result.errors).toContain('First name is required');
      expect(result.errors).toContain('Last name is required');
    });

    it('validates date of birth', () => {
      const result = DriverLicenseFactory.generate({
        ...baseInput,
        dateOfBirth: 'invalid-date',
      });

      expect(result.license).toBeUndefined();
      expect(result.errors).toContain('Invalid date of birth');
    });

    it('validates future dates', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);

      const result = DriverLicenseFactory.generate({
        ...baseInput,
        dateOfBirth: futureDate.toISOString(),
      });

      expect(result.license).toBeUndefined();
      expect(result.errors).toContain('Date of birth cannot be in the future');
    });
  });

  describe('Date validation', () => {
    it('validates missing date of birth', () => {
      const result = DriverLicenseFactory.generate({
        ...baseInput,
        dateOfBirth: undefined,
      });

      expect(result.license).toBeUndefined();
      expect(result.errors).toContain('Date of birth is required');
    });

    it('validates invalid date format', () => {
      const result = DriverLicenseFactory.generate({
        ...baseInput,
        dateOfBirth: 'not-a-date',
      });

      expect(result.license).toBeUndefined();
      expect(result.errors).toContain('Invalid date of birth');
    });

    it('validates future date', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);

      const result = DriverLicenseFactory.generate({
        ...baseInput,
        dateOfBirth: futureDate.toISOString(),
      });

      expect(result.license).toBeUndefined();
      expect(result.errors).toContain('Date of birth cannot be in the future');
    });

    it('validates very old date', () => {
      const veryOldDate = new Date();
      veryOldDate.setFullYear(veryOldDate.getFullYear() - 121);

      const result = DriverLicenseFactory.generate({
        ...baseInput,
        dateOfBirth: veryOldDate.toISOString(),
      });

      expect(result.license).toBeUndefined();
      expect(result.errors).toContain('Date of birth cannot be more than 120 years ago');
    });

    it('accepts valid dates in different formats', () => {
      const result = DriverLicenseFactory.generate({
        ...baseInput,
        dateOfBirth: '1990-01-01 12:00:00',
      });

      expect(result.license).toBeDefined();
      expect(result.errors).toHaveLength(0);
    });

    it('accepts edge case dates', () => {
      const almostTooOld = new Date();
      almostTooOld.setFullYear(almostTooOld.getFullYear() - 119);

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const edgeDates = [almostTooOld.toISOString(), yesterday.toISOString()];

      for (const dateOfBirth of edgeDates) {
        const result = DriverLicenseFactory.generate({ ...baseInput, dateOfBirth });

        expect(result.license).toBeDefined();
        expect(result.errors).toHaveLength(0);
      }
    });
  });
});
