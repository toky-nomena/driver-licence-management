import { Search } from 'lucide-react';
import { useState } from 'react';

import { DeleteAllAlert } from './components/DeleteAllAlert';
import { useLocalStorage } from './components/hooks/useLocalStorage';
import { PersonForm } from './components/PersonForm';
import { PersonList } from './components/PersonList';
import { Person } from './utils/data';

import { Input } from '@/components/ui/input';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';


export default function DataGenerator() {
  const [globalFilter, onGlobalFilterChange] = useState('');
  const [data, setData] = useLocalStorage<Person[]>('driver-licence-data', []);
  const clearAllData = () => setData([]);

  const onSubmit = (newPerson: Person) => {
    setData((prev) => [newPerson, ...prev]);
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <h1 className="text-xl font-semibold">Licence generator</h1>
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
            {data.length > 0 && <DeleteAllAlert onConfirm={clearAllData}>Clear all</DeleteAllAlert>}
          </div>
        </div>
      </div>
      <ResizablePanelGroup
        direction="horizontal"
        className="flex flex-1 flex-col gap-2 overflow-hidden p-4 lg:flex-row"
      >
        <ResizablePanel defaultSize={30} className="flex flex-col">
          <PersonForm onSubmit={onSubmit} />
        </ResizablePanel>
        <ResizableHandle className="bg-transparent" />
        <ResizablePanel defaultValue={75} className="flex flex-col">
          <PersonList
            data={data}
            onUpdateData={setData}
            globalFilter={globalFilter}
            onGlobalFilterChange={onGlobalFilterChange}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
