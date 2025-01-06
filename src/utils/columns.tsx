import { createColumnHelper } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';

import type { DrivingLicensePayData } from './data';
import { provinces } from './provinces';

import { Copy } from '@/components/Copy';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { formatDateToYYYYMMDD } from '@/lib/date';

const columnHelper = createColumnHelper<DrivingLicensePayData>();

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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="duration-300 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4">
            <AlertDialogHeader>
              <AlertDialogTitle>Remove Entry</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove the entry for{' '}
                <strong>
                  {row.original.firstName} {row.original.lastName}
                </strong>
                ? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="transition-colors duration-200 hover:bg-muted/50">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => meta?.onDeleteRow?.(row.index)}
                className="bg-destructive text-destructive-foreground transition-colors duration-200 hover:bg-destructive/90"
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  }),
];
