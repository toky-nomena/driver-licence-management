import { Eye } from 'lucide-react';

import type { StoredLicense } from '../types';
import { provinces } from '../utils/provinces';

import { Copy } from './Copy';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { formatDateToYYYYMMDD } from '@/lib/date';

interface StoredLicenseDetailsProps {
  license: StoredLicense;
}

export function LicenseDetails({ license }: StoredLicenseDetailsProps) {
  const provinceDetails = provinces.find((p) => p.code === license.province);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Eye className="h-4 w-4 text-muted-foreground hover:text-destructive" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-md">
        <div className="mt-3 space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-semibold">License Details</span>
            </div>
          </div>
          <div className="space-y-4">
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
                  <span className="font-semibold">{formatDateToYYYYMMDD(license.dateOfBirth)}</span>
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

            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Driving License</p>
                <Copy value={license.drivingLicense}>
                  <span className="font-semibold">{license.drivingLicense}</span>
                </Copy>
              </div>
            </div>

            {license.description && (
              <div>
                <p className="text-xs text-muted-foreground">Description</p>
                <p className="text-sm">{license.description}</p>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
