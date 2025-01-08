import { fromPartial } from '@total-typescript/shoehorn';
import { describe, expect, it } from 'vitest';

import { AB } from '../ab';

const service = new AB();

describe('ab license generate function', () => {
  it('should generate correct license for option 1', () => {
    const result = service.generate(fromPartial({ option: 1, province: 'AB' }));
    expect(result).toBe('A00001');
  });

  it('should generate correct license for option 2', () => {
    const result = service.generate(fromPartial({ option: 2, province: 'AB' }));
    expect(result).toBe('AA0001');
  });

  it('should generate correct license for option 3', () => {
    const result = service.generate(fromPartial({ option: 3, province: 'AB' }));
    expect(result).toBe('000000001');
  });

  it('should return empty string for unknown option', () => {
    const result = service.generate(fromPartial({ option: 4, province: 'AB' }));
    expect(result).toBe('');
  });
});
