export interface LicenseFormValues {
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth?: string;
  email?: string;
  drivingLicense?: string;
  description?: string;
  gender?: 'male' | 'female';
  province?: string;
  option?: number;
}

export interface StoredLicense extends LicenseFormValues {
  id?: string;
  createdAt?: number;
}

export interface Province {
  code: string;
  name: string;
  color: string;
}
