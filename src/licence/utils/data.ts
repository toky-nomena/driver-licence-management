import { randFirstName, randLastName, rand, randEmail, randBetweenDate } from '@ngneat/falso';

import type { StoredLicense } from '../types';

import { format } from '@/lib/date';

export function generateRandomData(template: Partial<StoredLicense> = {}): StoredLicense {
  const gender = template.gender || rand(['male', 'female'] as const);

  const firstName = template.firstName || randFirstName({ gender, withAccents: false });
  const lastName = template.lastName || randLastName({ withAccents: false });
  const middleName = template.middleName || randLastName({ withAccents: false });

  const email =
    template.email || randEmail({ firstName, lastName, nameSeparator: '.' }).toLowerCase();

  const dateOfBirth =
    template.dateOfBirth ||
    format(randBetweenDate({ from: '1950-01-01', to: '2005-12-31' }), 'YYYY-MM-DD');

  return {
    ...template,
    gender,
    firstName,
    lastName,
    middleName,
    dateOfBirth,
    email,
  };
}

export const downloadLicenses = <T>(data: T) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'driving-licenses.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function merge<T extends Record<string, any>>(values: Partial<T>, defaultValues: T): T {
  const result = {} as T;

  for (const key of Object.keys({ ...values, ...defaultValues }) as (keyof T)[]) {
    result[key] = values[key] ?? defaultValues[key];
  }

  return result;
}
