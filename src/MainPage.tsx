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
} from "./components/ui/resizable";

export default function DataGenerator() {
  const [data, setData] = useState<Person[]>([]);
  const onSubmit = (newPerson: Person) => {
    setData((prev) => [newPerson, ...prev]);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-semibold">Data generator</h1>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search people..." className="pl-8" />
        </div>
      </div>
      <ResizablePanelGroup
        direction="horizontal"
        className="flex overflow-hidden flex-col flex-1 gap-2 p-4 lg:flex-row"
      >
        <ResizablePanel className="flex flex-col min-h-0">
          <PersonList data={data} />
        </ResizablePanel>
        <ResizableHandle className="bg-transparent" />
        <ResizablePanel defaultSize={30} className="flex flex-col min-h-0">
          <PersonForm onSubmit={onSubmit} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
