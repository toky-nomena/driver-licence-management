import { fromPartial } from '@total-typescript/shoehorn';
import { describe, expect, it } from 'vitest';

import { NB } from '../nb';

describe('NB DrivingLicenseGenerator', () => {
  const nb = new NB();

  describe('generate', () => {
    it('should generate the correctly padded string', () => {
      const result = nb.generate(fromPartial({ dateOfBirth: '1990-06-15' }));
      expect(result).toBe('1001');
    });
  });
});
