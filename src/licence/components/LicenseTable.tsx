import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getFilteredRowModel,
} from '@tanstack/react-table';
import type { PaginationState } from '@tanstack/react-table';
import { useState } from 'react';

import { useColumns } from '../utils/columns';

import { Pagination } from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { StoredLicense } from '@/licence/types';

interface LicenseTableProps {
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  onUpdateData: (data: StoredLicense[]) => void;
  data: StoredLicense[];
}

export function LicenseTable({
  globalFilter,
  onGlobalFilterChange,
  onUpdateData,
  data,
}: LicenseTableProps) {
  const columns = useColumns();
  const [pagination, onPaginationChange] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });

  // Handle row deletion
  const onDeleteRow = (rowIndex: number) => {
    onUpdateData(data.filter((_, index) => index !== rowIndex));
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      globalFilter,
    },
    onGlobalFilterChange,
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      onDeleteRow,
    },
    globalFilterFn: (row, _, filterValue) => {
      const search = filterValue.toLowerCase().trim();
      return (
        row.original.firstName.toLowerCase().includes(search) ||
        row.original.lastName.toLowerCase().includes(search)
      );
    },
  });

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-lg border">
      <div className="flex flex-1 overflow-auto">
        <Table className="flex-1">
          <TableHeader className="sticky top-0 z-10 border-b bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-2 py-0">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-2 py-0">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between gap-2 border-t bg-background p-2">
        <Pagination
          className="flex-1"
          currentPage={pagination.pageIndex + 1}
          pageSize={pagination.pageSize}
          totalItems={table.getFilteredRowModel().rows.length}
          onPageChange={(page) => {
            onPaginationChange({ ...pagination, pageIndex: page - 1 });
          }}
          onPageSizeChange={(size) => {
            onPaginationChange({ ...pagination, pageIndex: 0, pageSize: size });
          }}
        />
      </div>
    </div>
  );
}
