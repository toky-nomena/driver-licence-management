import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useTransition } from 'react';

import { Button } from './button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  className?: string;
  disabled?: boolean;
}

export function Pagination({
  currentPage,
  pageSize,
  totalItems,
  pageSizeOptions = [10, 20, 50, 100, 200],
  onPageChange,
  onPageSizeChange,
  className,
  disabled,
}: PaginationProps) {
  const [internalPageSize, setInternalPageSize] = useState(pageSize);
  const [internalPage, setInternalPage] = useState(currentPage);

  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = (internalPage - 1) * pageSize + 1;
  const endItem = Math.min(internalPage * pageSize, totalItems);
  const [loading, setTransition] = useTransition();

  const canClick = !disabled && totalPages > 0 && !loading;

  const changePage = (page: number) => {
    setInternalPage(page);
    setTransition(() => {
      onPageChange(page);
    });
  };

  return (
    <div className={cn('flex items-center justify-between gap-3 px-2', className)}>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span>
          Showing {startItem} - {endItem} of {totalItems}
        </span>
        <Select
          value={internalPageSize.toString()}
          onValueChange={(value) => {
            setInternalPageSize(Number(value));
            setTransition(() => {
              onPageSizeChange(Number(value));
            });
          }}
          disabled={!canClick}
        >
          <SelectTrigger className="h-8 w-[110px]" disabled={!canClick}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size} rows
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => changePage(1)}
          disabled={internalPage === 1 || !canClick}
          aria-label="First page"
        >
          <ChevronFirst className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => changePage(internalPage - 1)}
          disabled={internalPage === 1 || !canClick}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-1 text-xs">
          <span className="text-muted-foreground">Page</span>
          <span className="font-medium">{internalPage}</span>
          <span className="text-muted-foreground">of</span>
          <span className="font-medium">{totalPages}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => changePage(internalPage + 1)}
          disabled={internalPage === totalPages || !canClick}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => changePage(totalPages)}
          disabled={internalPage === totalPages || !canClick}
          aria-label="Last page"
        >
          <ChevronLast className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
