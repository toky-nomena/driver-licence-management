import { formatDateToDDMMYY } from '@/lib/date';

export function generate(params: {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string | undefined;
}): string {
  if (!params.firstName || !params.lastName || !params.dateOfBirth) {
    return '';
  }

  return `${params.lastName.toUpperCase().substring(0, 1)}${
    params.firstName
  }${formatDateToDDMMYY(params.dateOfBirth)}`;
}
