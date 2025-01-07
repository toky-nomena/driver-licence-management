export interface LicenseFormValues {
  firstName: string;
  lastName: string;
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
