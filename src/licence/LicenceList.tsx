import { Trash2, Search } from 'lucide-react';
import { useState } from 'react';

import { LicenseListItem } from './LicenseListItem';
import type { StoredLicense } from './types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EmptyList } from '@/licence/EmptyList';

interface LicenseListProps {
  licenses: StoredLicense[];
  onDelete: (id: string) => void;
  onDeleteAll: () => void;
}

export function LicenseList({ licenses, onDelete, onDeleteAll }: LicenseListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLicenses = licenses.filter(
    (license) =>
      license.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.drivingLicense?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col">
      <div className="border-b">
        <div className="border-b p-3">
          <h2 className="font-semibold">Licenses</h2>
        </div>
        <div className="flex items-center gap-3 p-3">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search licenses..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="destructive" size="sm" onClick={onDeleteAll}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete all
          </Button>
        </div>
      </div>

      {filteredLicenses.length === 0 ? (
        <EmptyList />
      ) : (
        <ScrollArea className="flex-grow">
          <div className="space-y-4 p-4">
            <ul className="space-y-4">
              {filteredLicenses.map((license) => (
                <LicenseListItem key={license.id} license={license} onDelete={onDelete} />
              ))}
            </ul>
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
