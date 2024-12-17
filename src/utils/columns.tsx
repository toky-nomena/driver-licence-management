import { createColumnHelper } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';

import type { DrivingLicensePayData } from './data';
import { provinces } from './provinces';

import { Copy } from '@/components/Copy';
import { AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { formatDateToYYYYMMDD } from '@/lib/date';

const columnHelper = createColumnHelper<DrivingLicensePayData>();

export const columns = [
  columnHelper.accessor('firstName', {
    header: 'First Name',
    enableGlobalFilter: true,
    enableColumnFilter: true,
    cell: (info) => <Copy>{info.getValue()}</Copy>,
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    enableGlobalFilter: true,
    enableColumnFilter: true,
    cell: (info) => <Copy>{info.getValue()}</Copy>,
  }),
  columnHelper.accessor('dateOfBirth', {
    header: 'Date of Birth',
    cell: (info) => {
      const value = formatDateToYYYYMMDD(info.getValue());
      return <Copy>{value}</Copy>;
    },
  }),
  columnHelper.accessor('drivingLicense', {
    header: 'Driving License',
    cell: (info) => <Copy>{info.getValue()}</Copy>,
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => <Copy>{info.getValue()}</Copy>,
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: (info) => <Copy>{info.getValue()}</Copy>,
  }),
  columnHelper.accessor('province', {
    header: 'Province',
    cell: (info) => {
      const province = provinces.find((p) => p.code === info.getValue());
      return province ? province.code : info.getValue();
    },
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created At',
    cell: (info) => {
      const data = info.getValue() as Date;
      return data ? <span className='"whitespace-nowrap"'>{formatDateToYYYYMMDD(data)}</span> : '-';
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        onDeleteRow?: (index: number) => void;
      };
      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm</AlertDialogTitle>
              <AlertDescription>
                Do you want to remove{' '}
                <strong>
                  {row.original.firstName} {row.original.lastName}
                </strong>
                ?
              </AlertDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => meta?.onDeleteRow?.(row.index)}>
                Yes
              </AlertDialogAction>
              <AlertDialogCancel>No</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  }),
];
