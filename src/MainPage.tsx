import { Search, Trash2, Download } from 'lucide-react';
import { useState } from 'react';

import { useLocalStorage } from './components/hooks/useLocalStorage';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Button } from './components/ui/button';
import { useI18n } from './i18n/I18nContext';
import { DeleteAllAlert } from './licence/components/DeleteAllAlert';
import { EmptyList } from './licence/components/EmptyList';
import { LicenseForm } from './licence/components/LicenseForm';
import { LicenseTable } from './licence/components/LicenseTable';
import type { StoredLicense } from './licence/types';
import { downloadLicenses } from './licence/utils/data';
import { ThemeSwitcher } from './ThemeSwitcher';

import { Input } from '@/components/ui/input';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

export function MainPage() {
  const { t } = useI18n();
  const [globalFilter, onGlobalFilterChange] = useState('');
  const [data, setData] = useLocalStorage<StoredLicense[]>('driving-license-data', []);

  const clearAllData = () => setData([]);

  const onSubmit = (newPerson: StoredLicense) => {
    setData((prev) => [newPerson, ...prev]);
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center justify-between border-b bg-gradient-to-r from-primary to-indigo-600 px-4 py-2 text-white dark:border-gray-700">
        <h1 className="font-semibold">{t('title')}</h1>
        <div className="flex flex-row items-center justify-center gap-2">
          <ThemeSwitcher />
          <LanguageSwitcher />
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
        <ResizablePanel defaultValue={75} className="flex flex-col rounded-lg pl-[1px]">
          {data.length > 0 ? (
            <>
              <div className="z-50 flex items-center justify-between gap-4 pb-4">
                <div className="relative w-96">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                  <Input
                    type="search"
                    placeholder={t('search')}
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
