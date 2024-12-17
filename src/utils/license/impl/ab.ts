import type { licensePayload } from '../types';

import { formatDateToDDMMYY } from '@/lib/date';

export function generate(params: licensePayload): string {
  const lastName = params.lastName.toUpperCase().substring(0, 1);
  const date = formatDateToDDMMYY(params.dateOfBirth);

  return `${lastName}${params.firstName}${date}`.toUpperCase();
}
