import { Eye } from 'lucide-react';

import type { StoredLicense } from '../types';
import { provinces } from '../utils/provinces';

import { Copy } from './Copy';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useTranslate } from '@/i18n/TranslationContext';
import { format } from '@/lib/date';

interface StoredLicenseDetailsProps {
  license: StoredLicense;
}

export function LicenseDetails({ license }: StoredLicenseDetailsProps) {
  const { t } = useTranslate();
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
              <span className="font-semibold">{t('licenseDetails')}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">{t('firstName')}</p>
                <Copy value={license.firstName}>
                  <span className="font-semibold">{license.firstName}</span>
                </Copy>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t('lastName')}</p>
                <Copy value={license.lastName}>
                  <span className="font-semibold">{license.lastName}</span>
                </Copy>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">{t('dateOfBirth')}</p>
                <Copy value={format(license.dateOfBirth, 'YYYY-MM-DD')}>
                  <span className="font-semibold">{format(license.dateOfBirth, 'YYYY-MM-DD')}</span>
                </Copy>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t('province')}</p>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {provinceDetails ? provinceDetails.code : license.province}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">{t('email')}</p>
              <Copy value={license.email}>
                <span className="font-semibold">{license.email}</span>
              </Copy>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">{t('drivingLicense')}</p>
                <Copy value={license.drivingLicense}>
                  <span className="font-semibold">{license.drivingLicense}</span>
                </Copy>
              </div>
            </div>

            {license.description && (
              <div>
                <p className="text-xs text-muted-foreground">{t('description')}</p>
                <p className="text-sm">{license.description}</p>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
