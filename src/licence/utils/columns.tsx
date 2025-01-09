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
      header: () => null,
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
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${province?.color || 'bg-gray-100'}`}
            >
              <span className="text-xs font-semibold">{value}</span>
            </figure>
          </div>
        );
      },
      enableHiding: false,
    }),
    columnHelper.accessor('firstName', {
      header: () => (
        <div className="text-xs font-medium tracking-wider text-gray-500 dark:text-gray-400">
          {t('firstName')}
        </div>
      ),
      enableGlobalFilter: true,
      enableColumnFilter: true,
      cell: (info) => (
        <div className="py-4">
          <Copy value={info.getValue()}>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{info.getValue()}</span>
            </div>
          </Copy>
        </div>
      ),
    }),
    columnHelper.accessor('lastName', {
      header: () => (
        <div className="text-xs font-medium tracking-wider text-gray-500 dark:text-gray-400">
          {t('lastName')}
        </div>
      ),
      enableGlobalFilter: true,
      enableColumnFilter: true,
      cell: (info) => (
        <div className="py-4">
          <Copy value={info.getValue()}>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{info.getValue()}</span>
            </div>
          </Copy>
        </div>
      ),
    }),
    columnHelper.accessor('dateOfBirth', {
      header: () => (
        <div className="text-xs font-medium tracking-wider text-gray-500 dark:text-gray-400">
          {t('dateOfBirth')}
        </div>
      ),
      cell: (info) => {
        const value = format(info.getValue(), 'YYYY-MM-DD');
        return (
          <div className="py-4">
            <Copy value={value}>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{value}</span>
              </div>
            </Copy>
          </div>
        );
      },
    }),
    columnHelper.accessor('drivingLicense', {
      header: () => (
        <div className="text-xs font-medium tracking-wider text-gray-500 dark:text-gray-400">
          {t('drivingLicense')}
        </div>
      ),
      cell: (info) => (
        <div className="py-4">
          <Copy value={info.getValue()}>
            <div className="flex flex-col">
              <span className="max-w-[200px] truncate text-sm font-bold">{info.getValue()}</span>
            </div>
          </Copy>
        </div>
      ),
    }),
    columnHelper.accessor('email', {
      header: () => (
        <div className="text-xs font-medium tracking-wider text-gray-500 dark:text-gray-400">
          {t('email')}
        </div>
      ),
      cell: (info) => (
        <div className="py-4">
          <Copy value={info.getValue()}>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{info.getValue()}</span>
            </div>
          </Copy>
        </div>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: () => (
        <div className="text-xs font-medium tracking-wider text-gray-500 dark:text-gray-400">
          {t('actions')}
        </div>
      ),
      enableHiding: false,
      cell: ({ row, table }) => {
        const meta = table.options.meta as {
          onDeleteRow?: (index: number) => void;
        };
        return (
          <div className="flex items-center gap-3">
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
