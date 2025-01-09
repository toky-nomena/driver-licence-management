import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getFilteredRowModel,
} from '@tanstack/react-table';
import type { PaginationState } from '@tanstack/react-table';
import { Search, Trash2, Download } from 'lucide-react';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

import { useLocalStorage } from './components/hooks/useLocalStorage';
import { Button } from './components/ui/button';
import { useTranslate } from './i18n/TranslationContext';
import { DeleteAllAlert } from './licence/components/DeleteAllAlert';
import { EmptyList } from './licence/components/EmptyList';
import { ImportLicenses } from './licence/components/ImportLicenses';
import { LicenseForm } from './licence/components/LicenseForm';
import { LicenseTable } from './licence/components/LicenseTable';
import { ColumnsVisibility } from './licence/components/toolbar/ColumnsVisibility';
import type { StoredLicense } from './licence/types';
import { useColumns } from './licence/utils/columns';
import { downloadLicenses } from './licence/utils/data';
import { MainHeader } from './MainHeader';

import { Input } from '@/components/ui/input';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Toaster } from '@/components/ui/sooner';

export function MainPage() {
  const { t } = useTranslate();
  const [globalFilter, onGlobalFilterChange] = useState('');
  const [data, setData] = useLocalStorage<StoredLicense[]>('driving-license-data', []);

  const clearAllData = () => {
    setData([]);
    toast(t('dataCleared'));
  };

  const onSubmit = (newPerson: StoredLicense) => {
    setData((prev) => [newPerson, ...prev]);
    toast(t('licenseAdded'));
  };

  const columns = useColumns();
  const [pagination, onPaginationChange] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });

  // Handle row deletion
  const onDeleteRow = (rowIndex: number) => {
    setData((items) => items.filter((_, index) => index !== rowIndex));
    toast(t('licenseDeleted'));
  };

  const handleImport = useCallback(
    (importedLicenses: StoredLicense[]) => {
      setData((prev) => [...importedLicenses, ...prev]);
    },
    [setData]
  );

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

  const hasData = data.length > 0;

  return (
    <div className="flex h-screen flex-col bg-muted/30">
      <MainHeader />
      <ResizablePanelGroup
        direction="horizontal"
        className="flex flex-1 flex-col gap-2 overflow-hidden bg-muted/30 p-4 lg:flex-row"
      >
        <ResizablePanel defaultSize={30} className="flex flex-col rounded-lg border bg-background">
          <LicenseForm onSubmit={onSubmit} />
        </ResizablePanel>
        <ResizableHandle className="bg-transparent" />
        <ResizablePanel defaultValue={75} className="flex flex-col rounded-lg pl-[2px] pt-[2px]">
          <>
            <div className="z-50 flex items-center justify-between gap-4 pb-4">
              <div className="flex items-center gap-2">
                <div className="relative w-96 rounded-lg bg-background">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={t('search')}
                    className="h-10 w-full pl-8"
                    value={globalFilter}
                    onChange={(e) => onGlobalFilterChange(e.target.value)}
                    disabled={!hasData}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <ColumnsVisibility table={table} disabled={!hasData} />
                <DeleteAllAlert onConfirm={clearAllData} disabled={!hasData}>
                  <span className="sr-only">Delete all licenses</span>
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </DeleteAllAlert>
                <ImportLicenses onImport={handleImport} />
                <Button
                  variant="outline"
                  className="h-10 w-10"
                  onClick={() => downloadLicenses(data)}
                  disabled={!hasData}
                >
                  <span className="sr-only">Download licenses</span>
                  <Download className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>
            {hasData ? (
              <LicenseTable
                table={table}
                onPaginationChange={onPaginationChange}
                pagination={pagination}
              />
            ) : (
              <EmptyList />
            )}
          </>
        </ResizablePanel>
      </ResizablePanelGroup>
      <Toaster expand={true} richColors />
    </div>
  );
}
