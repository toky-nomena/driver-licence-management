import { createColumnHelper } from '@tanstack/react-table';
import { Person } from './data';
import { formatDateToYYYYMMDD } from '@/lib/date';
import { Copy } from '@/components/Copy';
import { provinces } from './provinces';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { AlertDescription } from '@/components/ui/alert';

const columnHelper = createColumnHelper<Person>();

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
  columnHelper.accessor('driverLicense', {
    header: 'Driver License',
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
      return province ? `${province.label} (${province.code})` : info.getValue();
    },
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created At',
    cell: (info) => {
      const data = info.getValue() as Date;
      return data ? formatDateToYYYYMMDD(data) : '-';
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
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => meta?.onDeleteRow?.(row.index)}
                variant="destructive"
              >
                Yes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  }),
];
