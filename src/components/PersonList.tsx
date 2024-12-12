import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  PaginationState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { columns } from "@/utils/columns";
import { Person } from "@/utils/data";
import { useState } from "react";

interface PersonListProps {
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  data: Person[];
}

export function PersonList({
  globalFilter,
  onGlobalFilterChange,
  data,
}: PersonListProps) {
  const [pagination, onPaginationChange] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });

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
    globalFilterFn: (row, _, filterValue) => {
      const search = filterValue.toLowerCase().trim();
      return (
        row.original.firstName.toLowerCase().includes(search) ||
        row.original.lastName.toLowerCase().includes(search)
      );
    },
  });

  return (
    <div className="flex overflow-hidden flex-col flex-1 rounded-lg border">
      <div className="flex overflow-auto flex-1">
        <Table className="flex-1">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex gap-2 justify-between items-center p-2 border-t bg-background">
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
