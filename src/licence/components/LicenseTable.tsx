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

import { ColumnVisibilityDropdown } from './ColumnVisibilityDropdown';

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
    <div className="flex flex-1 flex-col overflow-hidden rounded-lg border bg-background">
      <div className="flex flex-1 overflow-auto">
        <Table className="flex-1">
          <TableHeader className="sticky top-0 z-10 rounded-lg border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:bg-slate-900/95 dark:supports-[backdrop-filter]:bg-slate-900/80">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-2 py-0 text-slate-600 dark:text-slate-300"
                  >
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
                  <TableCell key={cell.id} className="px-2 py-0 text-slate-700 dark:text-slate-200">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between gap-2 border-t bg-white/95 p-2 dark:bg-slate-900/95">
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
        <ColumnVisibilityDropdown table={table} />
      </div>
    </div>
  );
}
