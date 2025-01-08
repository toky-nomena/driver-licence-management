import { describe, it, expect } from 'vitest';

import { en } from '../translations/en';
import { fr } from '../translations/fr';

describe('Translations', () => {
  it('has matching keys in both languages', () => {
    const enKeys = Object.keys(en).sort();
    const frKeys = Object.keys(fr).sort();

    expect(enKeys).toEqual(frKeys);
  });

  it('has no empty translations', () => {
    const checkEmptyValues = (translations: Record<string, string>) => {
      Object.keys(translations).forEach((value) => {
        expect(value.trim()).not.toBe('');
      });
    };

    checkEmptyValues(en);
    checkEmptyValues(fr);
  });

  it('has valid interpolation placeholders', () => {
    const placeholderRegex = /\{\{([^}]+)\}\}/g;

    const checkPlaceholders = (translations: Record<string, string>) => {
      Object.entries(translations).forEach(([key, value]) => {
        const enPlaceholders = [...value.matchAll(placeholderRegex)].map((m) => m[1]);
        const frPlaceholders = [
          ...(fr[key as keyof typeof fr] as string).matchAll(placeholderRegex),
        ].map((m) => m[1]);

        expect(enPlaceholders.sort()).toEqual(frPlaceholders.sort());
      });
    };

    checkPlaceholders(en);
  });

  it('has no duplicate values within each language', () => {
    const findDuplicates = (translations: Record<string, string>) => {
      const values = Object.values(translations);
      return values.filter((value, index) => values.indexOf(value) !== index);
    };

    expect(findDuplicates(en)).toEqual([]);
    expect(findDuplicates(fr)).toEqual([]);
  });
});
