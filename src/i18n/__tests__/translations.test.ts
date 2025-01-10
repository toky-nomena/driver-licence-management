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
      for (const value of Object.keys(translations)) {
        expect(value.trim()).not.toBe('');
      }
    };

    checkEmptyValues(en);
    checkEmptyValues(fr);
  });

  it('has valid interpolation placeholders', () => {
    const placeholderRegex = /\{\{([^}]+)\}\}/g;

    const checkPlaceholders = (t1: Record<string, string>, t2: Record<string, string>) => {
      for (const key of Object.keys({ ...t1, ...t2 })) {
        const t1Placeholders = [...t1[key].matchAll(placeholderRegex)].map((m) => m[1]);
        const t2Placeholders = [...t2[key].matchAll(placeholderRegex)].map((m) => m[1]);
        expect(t1Placeholders.sort()).toEqual(t2Placeholders.sort());
      }
    };

    checkPlaceholders(en, fr);
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
