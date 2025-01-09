import { Trash2 } from 'lucide-react';

import type { StoredLicense } from '../types';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useTranslate } from '@/i18n/TranslationContext';

interface LicenseDeleteConfirmProps {
  licence: StoredLicense;
  onConfirm: () => void;
}

export function LicenseDeleteConfirm({ licence, onConfirm }: LicenseDeleteConfirmProps) {
  const { t } = useTranslate();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="duration-300 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4">
        <AlertDialogHeader>
          <AlertDialogTitle>{t('removeEntry')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('removeEntryConfirm')}{' '}
            <strong>
              {licence.firstName} {licence.lastName}
            </strong>
            ? {t('cannotBeUndone')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="transition-colors duration-200 hover:bg-muted/50">
            {t('cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground transition-colors duration-200 hover:bg-destructive/90"
          >
            {t('remove')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
