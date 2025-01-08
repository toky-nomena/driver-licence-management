import { fromPartial } from '@total-typescript/shoehorn';
import { describe, expect, it } from 'vitest';

import { NS } from '../ns';

describe('NS License Generator', () => {
  const ns = new NS();

  describe('generate', () => {
    it('should generate the correct license based on lastName', () => {
      const expectedLicense = 'SAAAA010199999';

      const generatedLicense = ns.generate(fromPartial({ lastName: 'Smith', province: 'NS' }));
      expect(generatedLicense).toBe(expectedLicense);
    });

    it('should handle lastName with lowercase letters', () => {
      const expectedLicense = 'JAAAA010199999';

      const generatedLicense = ns.generate(fromPartial({ lastName: 'johnson', province: 'NS' }));
      expect(generatedLicense).toBe(expectedLicense);
    });

    it('should handle lastName with special characters', () => {
      const formValues = { lastName: "O'Reilly", province: 'NS' };
      const expectedLicense = 'OAAAA010199999';

      const generatedLicense = ns.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });

    it('should handle lastName with a single character', () => {
      const formValues = { lastName: 'A', province: 'NS' };
      const expectedLicense = 'AAAAA010199999';

      const generatedLicense = ns.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });

    it('should handle empty lastName', () => {
      const formValues = { lastName: '', province: 'NS' };
      const expectedLicense = 'AAAA010199999'; // Assuming 'AAAA' is used when lastName is empty.

      const generatedLicense = ns.generate(fromPartial(formValues));
      expect(generatedLicense).toBe(expectedLicense);
    });
  });
});
