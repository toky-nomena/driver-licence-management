import { LicenceForm } from './LicenceForm';
import { LicenseList } from './LicenceList';
import type { StoredLicense } from './types';

import { useLocalStorage } from '@/components/hooks/useLocalStorage';
import { Card } from '@/components/ui/card';

export function MainPage() {
  const [licenses, setLicenses] = useLocalStorage<StoredLicense[]>('licenses', []);

  return (
    <div className="flex h-screen flex-col p-8">
      <h1 className="mb-3 text-xl font-bold">Driving License Generator</h1>
      <div className="flex flex-grow flex-col gap-6 overflow-hidden lg:flex-row">
        <Card className="min-h-[500px] flex-1 overflow-auto">
          <LicenceForm
            onSubmit={(newLicense) => {
              const data = { id: Date.now().toString(), createdAt: Date.now(), ...newLicense };
              console.log(data);
              setLicenses([...licenses, data]);
            }}
          />
        </Card>
        <Card className="min-h-[500px] flex-1 overflow-hidden">
          <LicenseList
            licenses={licenses}
            onDelete={(id) => {
              console.log('delete', id);
              setLicenses((data) => data.filter((license) => license.id !== id));
            }}
            onDeleteAll={() => setLicenses([])}
          />
        </Card>
      </div>
    </div>
  );
}
