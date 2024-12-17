import { formatDateToDDMMYY } from '@/lib/date';

export function generate(params: {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string | undefined;
}): string {
  const lastName = params.lastName.toUpperCase().substring(0, 1);
  const date = formatDateToDDMMYY(params.dateOfBirth);

  return `${lastName}${params.firstName}${date}`.toUpperCase();
}
