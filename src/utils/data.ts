import { faker } from "@faker-js/faker";
import { generateDriverLicense } from "./licence";
import { formatDateToYYYYMMDD } from "@/lib/date";

// Define form type
export interface Person {
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  email?: string;
  driverLicense?: string;
  policyNumber?: string;
  createdAt?: Date;
}

export function generateFakeData(): Person {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const dateOfBirth = formatDateToYYYYMMDD(
    faker.date.between({
      from: "1950-01-01",
      to: "2005-12-31",
    })
  );
  return {
    firstName,
    lastName,
    dateOfBirth,
    email: faker.internet.email().toLowerCase(),
    driverLicense: generateDriverLicense({
      firstName,
      lastName,
      dateOfBirth,
    }),
    createdAt: new Date(),
  };
}
