import { Search, FileStack, Trash2, Download } from 'lucide-react';
import { useState } from 'react';

import { DeleteAllAlert } from './components/DeleteAllAlert';
import { useLocalStorage } from './components/hooks/useLocalStorage';
import { LicenseTable } from './components/LicenseTable';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { Button } from './components/ui/button';
import { LicenseForm } from './licence/LicenseForm';
import type { DrivingLicensePayData } from './utils/data';

import { Input } from '@/components/ui/input';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

export function MainPage() {
  const [globalFilter, onGlobalFilterChange] = useState('');
  const [data, setData] = useLocalStorage<DrivingLicensePayData[]>('driving-license-data', []);

  const clearAllData = () => setData([]);

  const downloadLicenses = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'driving-licenses.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const onSubmit = (newPerson: DrivingLicensePayData) => {
    setData((prev) => [newPerson, ...prev]);
  };

  return (
    <div className="flex h-screen flex-col dark:bg-gray-900 dark:text-white">
      <div className="flex items-center justify-between border-b px-4 py-2 dark:border-gray-700">
        <h1 className="font-semibold">Driving licence generator</h1>
        <div className="flex items-center gap-4">
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
            <ThemeSwitcher />
            {data.length > 0 && (
              <DeleteAllAlert onConfirm={clearAllData}>
                <span className="sr-only">Delete all licenses</span>
                <Trash2 className="h-4 w-4" />
              </DeleteAllAlert>
            )}
            <Button variant="ghost" onClick={downloadLicenses}>
              <span className="sr-only">Download licenses</span>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <ResizablePanelGroup
        direction="horizontal"
        className="flex flex-1 flex-col gap-2 overflow-hidden bg-background p-4 lg:flex-row"
      >
        <ResizablePanel defaultSize={30} className="flex flex-col rounded-lg border">
          <LicenseForm onSubmit={onSubmit} />
        </ResizablePanel>
        <ResizableHandle className="bg-transparent" />
        <ResizablePanel defaultValue={75} className="flex flex-col">
          {data.length > 0 ? (
            <LicenseTable
              data={data}
              onUpdateData={setData}
              globalFilter={globalFilter}
              onGlobalFilterChange={onGlobalFilterChange}
            />
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center space-y-4 rounded-lg border bg-muted/30 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
              <FileStack className="h-16 w-16 text-muted-foreground dark:text-gray-400" />
              <div className="space-y-2">
                <h2 className="text-xl font-semibold dark:text-white">No Driving Licenses Yet</h2>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  Start by generating your first driving license using the form on the left.
                </p>
              </div>
            </div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
