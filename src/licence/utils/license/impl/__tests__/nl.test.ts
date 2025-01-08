// Import necessary dependencies
import { fromPartial } from '@total-typescript/shoehorn';
import { describe, expect, it } from 'vitest';

import { NL } from '../nl';

const nl = new NL();

describe('NL DrivingLicenseGenerator', () => {
  describe('generate', () => {
    it('should generate the correct license number with given parameters', () => {
      const result = nl.generate(fromPartial({ dateOfBirth: '1990-06-15', province: 'NL' }));
      expect(result).toBe('A900615002');
    });
  });
});
