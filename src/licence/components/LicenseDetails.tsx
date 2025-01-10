import type { StoredLicense } from '../types';
import { provinces } from '../utils/provinces';

import { Copy } from './Copy';

import { useTranslate } from '@/i18n/TranslationContext';
import { format } from '@/lib/date';

interface StoredLicenseDetailsProps {
  license: StoredLicense;
}

export function LicenseDetails({ license }: StoredLicenseDetailsProps) {
  const { t } = useTranslate();
  const provinceDetails = provinces.find((p) => p.code === license.province);

  return (
    <div className="space-y-4 py-4">
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
          {license.middleName && (
            <div>
              <p className="text-xs text-muted-foreground">{t('middleName')}</p>
              <Copy value={license.middleName}>
                <span className="font-semibold">{license.middleName}</span>
              </Copy>
            </div>
          )}
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
              <span className="text-lg font-semibold">{license.drivingLicense}</span>
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
  );
}
