import { flexRender } from '@tanstack/react-table';
import type { Table as ReactTable } from '@tanstack/react-table';

import { Pagination } from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { StoredLicense } from '@/licence/types';

interface LicenseTableProps {
  className?: string;
  table: ReactTable<StoredLicense>;
  onPaginationChange: (page: { pageIndex: number; pageSize: number }) => void;
  pagination: { pageIndex: number; pageSize: number };
}

export function LicenseTable({
  table,
  onPaginationChange,
  pagination,
  className,
}: LicenseTableProps) {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col overflow-hidden rounded-lg border bg-background',
        className
      )}
    >
      <div className="flex flex-1 overflow-auto">
        <Table className="flex-1">
          <TableHeader className="sticky top-0 z-10 rounded-lg border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-2 py-0 text-muted-foreground">
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
                  <TableCell key={cell.id} className="px-2 py-0 text-foreground">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between gap-2 border-t bg-background/95 p-2">
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
