import dayjs from 'dayjs';

export function isValidDateOfBirth(dateOfBirth: string | Date | undefined): string | undefined {
  if (!dateOfBirth) {
    return 'Date of birth is required';
  }

  const date = dayjs(dateOfBirth);

  if (!date.isValid()) {
    return 'Invalid date of birth';
  }

  const now = dayjs();

  if (date.isAfter(now)) {
    return 'Date of birth cannot be in the future';
  }
  const minDate = now.subtract(120, 'year');

  if (date.isBefore(minDate)) {
    return 'Date of birth cannot be more than 120 years ago';
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
