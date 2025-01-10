// File: src/licence/utils/__tests__/validators.test.ts
import dayjs from 'dayjs';
import { describe, it, expect } from 'vitest';

import { isValidDateOfBirth, isValidName, validateEmail } from '../validators';

describe('Validators', () => {
  describe('isValidDateOfBirth', () => {
    it('returns error for undefined date', () => {
      expect(isValidDateOfBirth(undefined)).toBe('Date of birth is required');
    });

    it('returns error for invalid date', () => {
      expect(isValidDateOfBirth('invalid-date')).toBe('Invalid date of birth');
    });

    it('returns error for future date', () => {
      const futureDate = dayjs().add(1, 'day').format('YYYY-MM-DD');
      expect(isValidDateOfBirth(futureDate)).toBe('Date of birth cannot be in the future');
    });

    it('returns error for date more than 120 years ago', () => {
      const oldDate = dayjs().subtract(121, 'year').format('YYYY-MM-DD');
      expect(isValidDateOfBirth(oldDate)).toBe('Date of birth cannot be more than 120 years ago');
    });

    it('returns undefined for valid date', () => {
      const validDate = dayjs().subtract(30, 'year').format('YYYY-MM-DD');
      expect(isValidDateOfBirth(validDate)).toBeUndefined();
    });

    it('accepts different date formats', () => {
      const validDates = [
        dayjs().subtract(25, 'year').toDate(),
        dayjs().subtract(40, 'year').format('YYYY-MM-DD'),
        dayjs().subtract(50, 'year').toISOString(),
      ];

      validDates.forEach((date) => {
        expect(isValidDateOfBirth(date)).toBeUndefined();
      });
    });
  });

  describe('isValidName', () => {
    it('returns error for undefined value', () => {
      expect(isValidName('First Name', undefined)).toBe('First Name is required');
    });

    it('returns error for name shorter than 3 characters', () => {
      expect(isValidName('Last Name', 'AB')).toBe('Last Name must be at least 3 characters');
    });

    it('returns undefined for valid name', () => {
      expect(isValidName('Middle Name', 'John')).toBeUndefined();
    });

    it('trims whitespace when checking name length', () => {
      expect(isValidName('Name', '  AB  ')).toBe('Name must be at least 3 characters');
      expect(isValidName('Name', '  John  ')).toBeUndefined();
    });
  });

  describe('validateEmail', () => {
    it('returns undefined for undefined email', () => {
      expect(validateEmail(undefined)).toBeUndefined();
    });

    it('returns undefined for valid email', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'firstname+lastname@domain.com',
      ];

      validEmails.forEach((email) => {
        expect(validateEmail(email)).toBeUndefined();
      });
    });

    it('returns error for invalid email', () => {
      const invalidEmails = [
        'invalid-email',
        'missing@domain',
        '@missingusername.com',
        'spaces in@email.com',
      ];

      invalidEmails.forEach((email) => {
        expect(validateEmail(email)).toBe('Email is not valid');
      });
    });
  });
});
