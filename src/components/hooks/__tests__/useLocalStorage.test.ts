import { describe, it, expect, beforeEach } from 'vitest';

import { useLocalStorage } from '../useLocalStorage';

import { act, renderHook } from '@/tests/setup';

describe('useLocalStorage', () => {
  // Clear localStorage before each test
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns initial value when no saved data exists', () => {
    const initialValue = { name: 'Test' };
    const { result } = renderHook(() => useLocalStorage('testKey', initialValue));

    expect(result.current[0]).toEqual(initialValue);
  });

  it('retrieves saved data from localStorage', () => {
    const initialValue = { name: 'Initial' };
    const savedValue = { name: 'Saved' };

    // Manually set localStorage before rendering hook
    localStorage.setItem('testKey', JSON.stringify(savedValue));

    const { result } = renderHook(() => useLocalStorage('testKey', initialValue));

    expect(result.current[0]).toEqual(savedValue);
  });

  it('updates localStorage when data changes', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));

    act(() => {
      result.current[1]('updated');
    });

    // Check localStorage
    const storedValue = localStorage.getItem('testKey');
    expect(storedValue).toBe(JSON.stringify('updated'));

    // Check hook state
    expect(result.current[0]).toBe('updated');
  });

  it.each([
    {
      name: 'number',
      initial: 42,
      updated: 100,
    },
    {
      name: 'boolean',
      initial: true,
      updated: false,
    },
    {
      name: 'array',
      initial: [1, 2, 3],
      updated: [4, 5, 6],
    },
    {
      name: 'nested object',
      initial: { nested: { value: 1 } },
      updated: { nested: { value: 2 } },
    },
  ])('handles $name type correctly', ({ initial, updated }) => {
    const key = `typeTestKey-${Math.random().toString(36).substring(7)}`;

    const { result, rerender } = renderHook(() => useLocalStorage(key, initial));

    // Initial state check
    expect(result.current[0]).toEqual(initial);
    expect(JSON.parse(localStorage.getItem(key) || 'null')).toEqual(initial);

    // Update state
    act(() => {
      result.current[1](updated);
    });

    // Verify updated state
    expect(result.current[0]).toEqual(updated);
    expect(JSON.parse(localStorage.getItem(key) || 'null')).toEqual(updated);

    // Rerender to simulate component remount
    rerender();
    expect(result.current[0]).toEqual(updated);
  });

  it('handles JSON parsing errors gracefully', () => {
    // Simulate a corrupt localStorage value
    localStorage.setItem('errorKey', '{invalid json}');

    const initialValue = { fallback: 'value' };
    const { result } = renderHook(() => useLocalStorage('errorKey', initialValue));

    expect(result.current[0]).toEqual(initialValue);
  });
});
