import { fromPartial } from '@total-typescript/shoehorn';
import { describe, it, expect } from 'vitest';

import { YT } from '../yt'; // Import your YT class.

describe('YT License Generator', () => {
  const yt = new YT();

  describe('generate', () => {
    it('should generate a padded license with "1" padded to a length of 6', () => {
      const formValues = {}; // Empty object since the method doesn't use any form values.
      const expectedLicense = '000001'; // Padded string with '1', length 6.

      const generatedLicense = yt.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });
  });
});
