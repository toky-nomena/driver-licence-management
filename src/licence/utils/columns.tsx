import { createColumnHelper } from '@tanstack/react-table';

import { LicenseDeleteConfirm } from '../LicenseDeleteConfirm';
import type { StoredLicense } from '../types';

import { provinces } from './provinces';

import { Copy } from '@/components/Copy';
import { formatDateToYYYYMMDD } from '@/lib/date';

const columnHelper = createColumnHelper<StoredLicense>();

export const columns = [
  columnHelper.accessor('province', {
    header: '',
    cell: (info) => {
      const province = provinces.find((p) => p.code === info.getValue());
      const value = province ? province.code : info.getValue() || '';
      return (
        <div className="flex w-full items-center justify-center py-2" aria-label="User Initials">
          <figure className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <span className="text-xs font-semibold">{value}</span>
          </figure>
        </div>
      );
    },
  }),
  columnHelper.accessor('firstName', {
    header: 'First Name',
    enableGlobalFilter: true,
    enableColumnFilter: true,
    cell: (info) => <Copy value={info.getValue()}>{info.getValue()}</Copy>,
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    enableGlobalFilter: true,
    enableColumnFilter: true,
    cell: (info) => <Copy value={info.getValue()}>{info.getValue()}</Copy>,
  }),
  columnHelper.accessor('dateOfBirth', {
    header: 'Date of Birth',
    cell: (info) => {
      const value = formatDateToYYYYMMDD(info.getValue());
      return <Copy value={value}>{value}</Copy>;
    },
  }),
  columnHelper.accessor('drivingLicense', {
    header: 'Driving License',
    cell: (info) => (
      <Copy value={info.getValue()}>
        <span className="flex-1 truncate font-semibold">{info.getValue()}</span>
      </Copy>
    ),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => <Copy value={info.getValue()}>{info.getValue()}</Copy>,
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        onDeleteRow?: (index: number) => void;
      };
      return (
        <LicenseDeleteConfirm
          licence={row.original}
          onConfirm={() => meta?.onDeleteRow?.(row.index)}
        />
      );
    },
  }),
];
