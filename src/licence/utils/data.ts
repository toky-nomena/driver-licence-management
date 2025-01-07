import { faker } from '@faker-js/faker';

import type { StoredLicense } from '../types';

import { format } from '@/lib/date';

export function generateRandomData(template: Partial<StoredLicense> = {}): StoredLicense {
  const firstName = template?.firstName || faker.person.firstName(template?.gender);
  const lastName = template?.lastName || faker.person.lastName(template?.gender);
  const gender = template?.gender || faker.helpers.arrayElement(['male', 'female'] as const);

  const email =
    template?.email ||
    faker.internet.email({ firstName, lastName, allowSpecialCharacters: false }).toLowerCase();
  const dateOfBirth =
    template?.dateOfBirth ||
    format(faker.date.between({ from: '1950-01-01', to: '2005-12-31' }), 'YYYY-MM-DD');

  return {
    gender,
    firstName,
    lastName,
    dateOfBirth,
    email,
    province: template?.province,
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
