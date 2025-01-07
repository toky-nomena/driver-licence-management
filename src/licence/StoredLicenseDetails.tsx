import { Copy } from '../components/Copy';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

import type { StoredLicense } from './types';
import { provinces } from './utils/provinces';

import { formatDateToYYYYMMDD } from '@/lib/date';

interface StoredLicenseDetailsProps {
  license: StoredLicense;
}

export function StoredLicenseDetails({ license }: StoredLicenseDetailsProps) {
  const provinceDetails = provinces.find((p) => p.code === license.province);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>License Details</span>
          {license.drivingLicense}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">First Name</p>
            <Copy value={license.firstName}>
              <span className="font-semibold">{license.firstName}</span>
            </Copy>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Last Name</p>
            <Copy value={license.lastName}>
              <span className="font-semibold">{license.lastName}</span>
            </Copy>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Date of Birth</p>
            <Copy value={formatDateToYYYYMMDD(license.dateOfBirth)}>
              <span>{formatDateToYYYYMMDD(license.dateOfBirth)}</span>
            </Copy>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Province</p>
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                {provinceDetails ? provinceDetails.code : license.province}
              </span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Email</p>
          <Copy value={license.email}>
            <span className="font-semibold">{license.email}</span>
          </Copy>
        </div>

        {license.description && (
          <div>
            <p className="text-xs text-muted-foreground">Description</p>
            <p className="text-sm">{license.description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
