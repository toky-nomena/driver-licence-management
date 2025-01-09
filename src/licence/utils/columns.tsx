import { createColumnHelper } from '@tanstack/react-table';

import { LicenseDeleteConfirm } from '../components/LicenseDeleteConfirm';
import { LicenseDetails } from '../components/LicenseDetails';
import type { StoredLicense } from '../types';

import { provinces } from './provinces';

import { useTranslate } from '@/i18n/TranslationContext';
import { format } from '@/lib/date';
import { Copy } from '@/licence/components/Copy';

const columnHelper = createColumnHelper<StoredLicense>();

export function useColumns() {
  const { t } = useTranslate();

  return [
    columnHelper.accessor('province', {
      header: '',
      id: 'province',
      cell: (info) => {
        const province = provinces.find((p) => p.code === info.getValue());
        const value = province ? province.code : info.getValue() || '';
        return (
          <div
            className="flex w-full items-center justify-center py-2"
            aria-label={t('userInitials')}
          >
            <figure
              className={`flex h-8 w-8 items-center justify-center rounded-full ${province?.color || 'bg-muted'}`}
            >
              <span className="text-xs font-semibold">{value}</span>
            </figure>
          </div>
        );
      },
      enableHiding: false,
    }),
    columnHelper.accessor('firstName', {
      header: t('firstName'),
      enableGlobalFilter: true,
      enableColumnFilter: true,
      cell: (info) => <Copy value={info.getValue()}>{info.getValue()}</Copy>,
    }),
    columnHelper.accessor('lastName', {
      header: t('lastName'),
      enableGlobalFilter: true,
      enableColumnFilter: true,
      cell: (info) => <Copy value={info.getValue()}>{info.getValue()}</Copy>,
    }),
    columnHelper.accessor('dateOfBirth', {
      header: t('dateOfBirth'),
      cell: (info) => {
        const value = format(info.getValue(), 'YYYY-MM-DD');
        return <Copy value={value}>{value}</Copy>;
      },
    }),
    columnHelper.accessor('drivingLicense', {
      header: t('drivingLicense'),
      cell: (info) => (
        <Copy value={info.getValue()}>
          <span className="flex-1 truncate font-semibold">{info.getValue()}</span>
        </Copy>
      ),
    }),
    columnHelper.accessor('email', {
      header: t('email'),
      cell: (info) => <Copy value={info.getValue()}>{info.getValue()}</Copy>,
    }),
    columnHelper.display({
      id: 'actions',
      header: t('actions'),
      enableHiding: false,
      cell: ({ row, table }) => {
        const meta = table.options.meta as {
          onDeleteRow?: (index: number) => void;
        };
        return (
          <div className="flex gap-2">
            <LicenseDeleteConfirm
              licence={row.original}
              onConfirm={() => meta?.onDeleteRow?.(row.index)}
            />
            <LicenseDetails license={row.original} />
          </div>
        );
      },
    }),
  ];
}
