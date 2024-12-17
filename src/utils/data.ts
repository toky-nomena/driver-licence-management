import { faker } from '@faker-js/faker';

import { formatDateToYYYYMMDD } from '@/lib/date';

export interface Person {
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  email?: string;
  driverLicense?: string;
  description?: string;
  gender?: 'male' | 'female';
  createdAt?: Date;
  province?: string;
}

export function generateFakeData(template: Partial<Person> = {}): Person {
  const firstName = template?.firstName || faker.person.firstName(template?.gender);
  const lastName = template?.lastName || faker.person.lastName(template?.gender);
  const gender = template?.gender || faker.helpers.arrayElement(['male', 'female'] as const);

  const email =
    template?.email ||
    faker.internet.email({ firstName, lastName, allowSpecialCharacters: false }).toLowerCase();
  const dateOfBirth =
    template?.dateOfBirth ||
    formatDateToYYYYMMDD(
      faker.date.between({
        from: '1950-01-01',
        to: '2005-12-31',
      })
    );

  return {
    gender,
    firstName,
    lastName,
    dateOfBirth,
    email,
    province: template?.province,
  };
}
