export function isValidDateOfBirth(value: Date | undefined): boolean {
  if (!value) {
    return false;
  }

  const selectedDate = new Date(value);

  if (selectedDate > new Date()) {
    return false;
  }

  if (selectedDate < new Date("1900-01-01")) {
    return false;
  }

  return true;
}

export function isValidName(value: string | undefined): boolean {
  return !!value && value.trim().length > 2;
}

export function validateEmail(value: string | undefined): boolean {
  return !!value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
