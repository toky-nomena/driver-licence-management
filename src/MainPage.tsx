import { Search, Trash2, Download } from 'lucide-react';
import { useState } from 'react';

import { DeleteAllAlert } from './components/DeleteAllAlert';
import { useLocalStorage } from './components/hooks/useLocalStorage';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { Button } from './components/ui/button';
import { EmptyList } from './licence/EmptyList';
import { LicenseForm } from './licence/LicenseForm';
import { LicenseTable } from './licence/LicenseTable';
import type { StoredLicense } from './licence/types';
import { downloadLicenses } from './licence/utils/data';

import { Input } from '@/components/ui/input';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

export function MainPage() {
  const [globalFilter, onGlobalFilterChange] = useState('');
  const [data, setData] = useLocalStorage<StoredLicense[]>('driving-license-data', []);

  const clearAllData = () => setData([]);

  const onSubmit = (newPerson: StoredLicense) => {
    setData((prev) => [newPerson, ...prev]);
  };

  return (
    <div className="flex h-screen flex-col dark:bg-gray-900 dark:text-white">
      <div className="flex items-center justify-between border-b px-4 py-2 dark:border-gray-700">
        <h1 className="font-semibold">Driving licence generator</h1>
        <ThemeSwitcher />
      </div>
      <ResizablePanelGroup
        direction="horizontal"
        className="flex flex-1 flex-col gap-2 overflow-hidden bg-background p-4 lg:flex-row"
      >
        <ResizablePanel defaultSize={30} className="flex flex-col rounded-lg border">
          <LicenseForm onSubmit={onSubmit} />
        </ResizablePanel>
        <ResizableHandle className="bg-transparent" />
        <ResizablePanel defaultValue={75} className="flex flex-col rounded-lg pl-[1px]">
          {data.length > 0 ? (
            <>
              <div className="z-50 flex items-center justify-between gap-4 pb-4">
                <div className="relative w-96">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search people..."
                    className="w-full pl-8 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    value={globalFilter}
                    onChange={(e) => onGlobalFilterChange(e.target.value)}
                  />
                </div>
                <div className="flex items-center">
                  {data.length > 0 && (
                    <DeleteAllAlert onConfirm={clearAllData}>
                      <span className="sr-only">Delete all licenses</span>
                      <Trash2 className="h-4 w-4" />
                    </DeleteAllAlert>
                  )}
                  <Button variant="ghost" onClick={() => downloadLicenses(data)}>
                    <span className="sr-only">Download licenses</span>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <LicenseTable
                data={data}
                onUpdateData={setData}
                globalFilter={globalFilter}
                onGlobalFilterChange={onGlobalFilterChange}
              />
            </>
          ) : (
            <EmptyList />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
