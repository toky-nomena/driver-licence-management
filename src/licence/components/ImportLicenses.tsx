import { Upload } from 'lucide-react';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useTranslate } from '@/i18n/TranslationContext';
import type { StoredLicense } from '@/licence/types';

interface ImportLicensesProps {
  onImport: (licenses: StoredLicense[]) => void;
}

export function ImportLicenses({ onImport }: ImportLicensesProps) {
  const { t } = useTranslate();

  const handleImport = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const data = JSON.parse(text);

        if (!Array.isArray(data)) {
          throw new Error('Invalid format');
        }

        onImport(data);

        toast(t('importSuccess', { count: data.length }), {
          action: {
            label: t('close'),
            onClick: () => toast.dismiss(),
          },
        });
      } catch (error) {
        toast(t(error instanceof SyntaxError ? 'importInvalidFormat' : 'importError'), {
          action: {
            label: t('close'),
            onClick: () => toast.dismiss(),
          },
        });
      }

      // Reset the input
      event.target.value = '';
    },
    [onImport, t]
  );

  return (
    <Button
      variant="outline"
      className="h-10 w-10"
      onClick={() => document.getElementById('import-licenses')?.click()}
    >
      <input
        id="import-licenses"
        type="file"
        className="hidden"
        accept="application/json"
        onChange={handleImport}
        aria-label={t('importSelectFile')}
      />
      <span className="sr-only">{t('importButton')}</span>
      <Upload className="h-4 w-4 text-muted-foreground" />
    </Button>
  );
}
