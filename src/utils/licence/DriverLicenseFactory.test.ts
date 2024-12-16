// src/utils/licence/DriverLicenseFactory.test.ts
import { describe, it, expect } from 'vitest';

import { DriverLicenseFactory } from './DriverLicenseFactory';

describe('DriverLicenseFactory', () => {
  it('generates license for QC province', () => {
    const result = DriverLicenseFactory.generate({
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      province: 'QC',
    });

    expect(result.license).toBe('D0005-010190-05');
    expect(result.error).toBe('');
  });

  it('generates license for AB province', () => {
    const result = DriverLicenseFactory.generate({
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      province: 'AB',
    });

    expect(result.license).toBe('DJOHN010190');
    expect(result.error).toBe('');
  });

  it('handles unsupported province', () => {
    const result = DriverLicenseFactory.generate({
      firstName: 'Jane',
      lastName: 'Smith',
      dateOfBirth: '1985-05-15',
      province: 'XX',
    });

    expect(result.license).toBe('');
    expect(result.error).toBe('Province is not supported');
  });
});