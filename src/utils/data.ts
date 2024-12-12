import { faker } from "@faker-js/faker";
import { generateDriverLicense } from "./licence";

// Define form type
export interface Person {
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  email?: string;
  driverLicense?: string;
  policyNumber?: string;
}

export function generateFakeData(): Person {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const dateOfBirth = faker.date.between({
    from: "1950-01-01",
    to: "2005-12-31",
  });
  return {
    firstName,
    lastName,
    dateOfBirth,
    email: faker.internet.email().toLowerCase(),
    policyNumber: faker.string.numeric(10),
    driverLicense: generateDriverLicense({
      firstName,
      lastName,
      dateOfBirth,
    }),
  };
}
