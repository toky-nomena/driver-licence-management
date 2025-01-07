import { describe, it, expect } from 'vitest';

import { generate } from '../qc';

describe('QC license generate function', () => {
  describe('generate', () => {
    it('generates license for basic case', () => {
      const result = generate({
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-01-01',
        province: 'QC',
      });
      expect(result).toBe('D0005-010190-05');
    });

    it('handles long names correctly', () => {
      const result = generate({
        firstName: 'Christopher',
        lastName: 'Washington',
        dateOfBirth: '1985-12-25',
        province: 'QC',
      });
      expect(result).toBe('W2522-251285-07');
    });

    it('handles short names correctly', () => {
      const result = generate({
        firstName: 'J',
        lastName: 'D',
        dateOfBirth: '1990-01-01',
        province: 'QC',
      });
      expect(result).toBe('D0005-010190-05');
    });
  });
});
