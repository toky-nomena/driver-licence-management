import { describe, it, expect } from 'vitest';

import { StringUtils } from '../license/StringUtils';

describe('LicenseGeneratorUtils', () => {
  describe('getFirstLetter', () => {
    it('should return the first letter of a word', () => {
      expect(StringUtils.first('Hello')).toBe('H');
      expect(StringUtils.first('World')).toBe('W');
      expect(StringUtils.first('')).toBe('');
    });
  });

  describe('removeLetters', () => {
    it('should remove specified letters from a word', () => {
      expect(StringUtils.remove('Hello', ['l'])).toBe('Heo');
      expect(StringUtils.remove('World', ['o', 'r'])).toBe('Wld');
      expect(StringUtils.remove('Test', [])).toBe('Test');
    });
  });

  describe('convertLetters', () => {
    it('should convert letters to numbers based on conversion arrays', () => {
      const conversion = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
      ];

      expect(StringUtils.convert('abc', conversion)).toBe('111');
      expect(StringUtils.convert('def', conversion)).toBe('222');
      expect(StringUtils.convert('ghi', conversion)).toBe('333');
    });
  });

  describe('uniq', () => {
    it('should remove consecutive duplicate characters', () => {
      expect(StringUtils.uniq('hello')).toBe('helo');
      expect(StringUtils.uniq('aabbcc')).toBe('abc');
      expect(StringUtils.uniq('unique')).toBe('unique');
    });
  });

  describe('pad', () => {
    it('should pad a word according to the new implementation', () => {
      expect(StringUtils.pad({ word: 'test', char: '0', length: 6, paddingIndex: 3 })).toBe(
        'tes00t'
      );
      expect(StringUtils.pad({ word: 'abc', char: 'x', length: 5, paddingIndex: 2 })).toBe('abxxc');
      expect(StringUtils.pad({ word: 'short', char: '9', length: 7, paddingIndex: 4 })).toBe(
        'shor99t'
      );

      expect(StringUtils.pad({ word: '', char: '0', length: 5, paddingIndex: 2 })).toBe('00000');
      expect(StringUtils.pad({ word: 'a', char: 'x', length: 3 })).toBe('xxa');
    });
  });
});
