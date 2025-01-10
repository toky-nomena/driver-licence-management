// File: src/licence/utils/__tests__/data.test.ts
import { describe, it, expect } from 'vitest';

import { merge } from '../data';

interface TestObject {
  name: string;
  age: number;
  active: boolean;
  tags?: string[];
}

describe('merge function', () => {
  const defaultValues: TestObject = {
    name: 'John Doe',
    age: 30,
    active: true,
    tags: ['default'],
  };

  it('returns default values when no input is provided', () => {
    const result = merge({}, defaultValues);
    expect(result).toEqual(defaultValues);
  });

  it('overrides default values with provided values', () => {
    const input = { name: 'Jane Doe', age: 25 };
    const result = merge(input, defaultValues);

    expect(result).toEqual({
      name: 'Jane Doe',
      age: 25,
      active: true,
      tags: ['default'],
    });
  });

  it('handles partial updates', () => {
    const input = { age: 35 };
    const result = merge(input, defaultValues);

    expect(result).toEqual({
      name: 'John Doe',
      age: 35,
      active: true,
      tags: ['default'],
    });
  });

  it('handles undefined values', () => {
    const input = { name: undefined, age: undefined };
    const result = merge(input, defaultValues);

    expect(result).toEqual(defaultValues);
  });

  it('works with different types of values', () => {
    const testCases = [
      {
        input: { name: 'New Name' },
        expected: { ...defaultValues, name: 'New Name' },
      },
      {
        input: { age: 40 },
        expected: { ...defaultValues, age: 40 },
      },
      {
        input: { active: false },
        expected: { ...defaultValues, active: false },
      },
      {
        input: { tags: ['custom'] },
        expected: { ...defaultValues, tags: ['custom'] },
      },
    ];

    testCases.forEach(({ input, expected }) => {
      const result = merge(input, defaultValues);
      expect(result).toEqual(expected);
    });
  });

  it('preserves reference for unchanged values', () => {
    const input = { age: 35 };
    const result = merge(input, defaultValues);

    expect(result.name).toBe(defaultValues.name);
    expect(result.active).toBe(defaultValues.active);
    expect(result.tags).toBe(defaultValues.tags);
  });
});
