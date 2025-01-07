import { describe, it, expect } from 'vitest';

import { DriverLicenseFactory } from '../license/DrivingLicenseFactory';

describe('DriverLicenseFactory', () => {
  it('generates license for QC province', () => {
    const result = DriverLicenseFactory.generate({
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      province: 'QC',
    });

    expect(result.license).toBe('D0005-010190-05');
    expect(result.errors).toBe([]);
  });

  it('generates license for AB province', () => {
    const result = DriverLicenseFactory.generate({
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      province: 'AB',
      option: 1, // Add option parameter
    });

    expect(result.license).toBe('A00001'); // Update expected license
    expect(result.errors).toBe([]);
  });

  it('handles unsupported province', () => {
    const result = DriverLicenseFactory.generate({
      firstName: 'Jane',
      lastName: 'Smith',
      dateOfBirth: '1985-05-15',
      province: 'XX',
    });

    expect(result.license).toBeUndefined();
    expect(result.errors).toStrictEqual(['Province is not supported']);
  });
});
