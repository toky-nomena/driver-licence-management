import { Search, FileStack } from 'lucide-react';
import { useState } from 'react';

import { DeleteAllAlert } from './components/DeleteAllAlert';
import { useLocalStorage } from './components/hooks/useLocalStorage';
import { PersonForm } from './components/PersonForm';
import { PersonList } from './components/PersonList';
import { Person } from './utils/data';

import { Input } from '@/components/ui/input';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';

export default function DataGenerator() {
  const [globalFilter, onGlobalFilterChange] = useState('');
  const [data, setData] = useLocalStorage<Person[]>('driver-licence-data', []);
  const clearAllData = () => setData([]);

  const onSubmit = (newPerson: Person) => {
    setData((prev) => [newPerson, ...prev]);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-semibold">Licence generator</h1>
        <div className="flex gap-4 items-center">
          <div className="relative w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search people..."
              className="pl-8 w-full"
              value={globalFilter}
              onChange={(e) => onGlobalFilterChange(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            {data.length > 0 && <DeleteAllAlert onConfirm={clearAllData}>Clear all</DeleteAllAlert>}
          </div>
        </div>
      </div>
      <ResizablePanelGroup
        direction="horizontal"
        className="flex overflow-hidden flex-col flex-1 gap-2 p-4 lg:flex-row"
      >
        <ResizablePanel defaultSize={30} className="flex flex-col">
          <PersonForm onSubmit={onSubmit} />
        </ResizablePanel>
        <ResizableHandle className="bg-transparent" />
        <ResizablePanel defaultValue={75} className="flex flex-col">
          {data.length > 0 ? (
            <PersonList
              data={data}
              onUpdateData={setData}
              globalFilter={globalFilter}
              onGlobalFilterChange={onGlobalFilterChange}
            />
          ) : (
            <div className="flex flex-col flex-1 justify-center items-center p-8 space-y-4 text-center rounded-lg border bg-muted/30">
              <FileStack className="w-16 h-16 text-muted-foreground" />
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">No Driver Licenses Yet</h2>
                <p className="text-sm text-muted-foreground">
                  Start by generating your first driver license using the form on the left.
                </p>
              </div>
            </div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
