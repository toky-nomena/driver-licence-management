import { fromPartial } from '@total-typescript/shoehorn';
import { describe, expect, it } from 'vitest';

import { generate } from '../ab';

describe('ab license generate function', () => {
  it('should generate correct license for option 1', () => {
    const result = generate(fromPartial({ option: 1 }));
    expect(result).toBe('A00001');
  });

  it('should generate correct license for option 2', () => {
    const result = generate(fromPartial({ option: 2 }));
    expect(result).toBe('AA0001');
  });

  it('should generate correct license for option 3', () => {
    const result = generate(fromPartial({ option: 3 }));
    expect(result).toBe('000000001');
  });

  it('should return empty string for unknown option', () => {
    const result = generate(fromPartial({ option: 4 }));
    expect(result).toBe('');
  });
});
