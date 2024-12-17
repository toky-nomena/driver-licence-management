import { Search, FileStack } from 'lucide-react';
import { useState } from 'react';

import { DeleteAllAlert } from './components/DeleteAllAlert';
import { useLocalStorage } from './components/hooks/useLocalStorage';
import { LicenseForm } from './components/LicenseForm';
import { LicenseList } from './components/LicenseList';
import type { DrivingLicensePayData } from './utils/data';

import { Input } from '@/components/ui/input';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

export default function DataGenerator() {
  const [globalFilter, onGlobalFilterChange] = useState('');
  const [data, setData] = useLocalStorage<DrivingLicensePayData[]>('driving-license-data', []);
  const clearAllData = () => setData([]);

  const onSubmit = (newPerson: DrivingLicensePayData) => {
    setData((prev) => [newPerson, ...prev]);
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <h1 className="text-xl font-semibold">Driving licence generator</h1>
        <div className="flex items-center gap-4">
          <div className="relative w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search people..."
              className="w-full pl-8"
              value={globalFilter}
              onChange={(e) => onGlobalFilterChange(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            {data.length > 0 && (
              <DeleteAllAlert onConfirm={clearAllData}>Delete all</DeleteAllAlert>
            )}
          </div>
        </div>
      </div>
      <ResizablePanelGroup
        direction="horizontal"
        className="flex flex-1 flex-col gap-2 overflow-hidden p-4 lg:flex-row"
      >
        <ResizablePanel defaultSize={30} className="flex flex-col">
          <LicenseForm onSubmit={onSubmit} />
        </ResizablePanel>
        <ResizableHandle className="bg-transparent" />
        <ResizablePanel defaultValue={75} className="flex flex-col">
          {data.length > 0 ? (
            <LicenseList
              data={data}
              onUpdateData={setData}
              globalFilter={globalFilter}
              onGlobalFilterChange={onGlobalFilterChange}
            />
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center space-y-4 rounded-lg border bg-muted/30 p-8 text-center">
              <FileStack className="h-16 w-16 text-muted-foreground" />
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">No Driving Licenses Yet</h2>
                <p className="text-sm text-muted-foreground">
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
