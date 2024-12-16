import dayjs from 'dayjs';

export function isValidDateOfBirth(value: string | Date | undefined): string | undefined {
  const date = dayjs(value);

  if (!date.isValid()) {
    return 'Date is not valid';
  }

  if (date.isAfter(new Date())) {
    return 'Date must be in the past';
  }

  if (date.isBefore(new Date('1900-01-01'))) {
    return 'Date must be at least 1900-01-01';
  }

  return undefined;
}

export function isValidName(name: string, value: string | undefined): string | undefined {
  if (!value) {
    return `${name} is required`;
  }

  if (value.trim().length < 3) {
    return `${name} must be at least 3 characters`;
  }
  return undefined;
}

export function validateEmail(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? undefined : 'Email is not valid';
}
