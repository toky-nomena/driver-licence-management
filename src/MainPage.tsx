import { useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { PersonForm } from "./components/PersonForm";
import { PersonList } from "./components/PersonList";
import { Person } from "./utils/data";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { DeleteAllAlert } from "./components/DeleteAllAlert";
import { useLocalStorage } from "./components/hooks/useLocalStorage";

export default function DataGenerator() {
  const [globalFilter, onGlobalFilterChange] = useState("");
  const [data, setData] = useLocalStorage<Person[]>("driver-licence-data", []);
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
            {data.length > 0 && <DeleteAllAlert onConfirm={clearAllData} />}
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
          <PersonList
            data={data}
            globalFilter={globalFilter}
            onGlobalFilterChange={onGlobalFilterChange}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
