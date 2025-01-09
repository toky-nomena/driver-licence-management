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
} from '../../components/ui/alert-dialog';

import { Button } from '@/components/ui/button';
import { useTranslate } from '@/i18n/TranslationContext';

interface DeleteAllAlertProps {
  onConfirm: () => void;
  children: React.ReactNode;
  className?: string;
}

export function DeleteAllAlert({ onConfirm, children }: DeleteAllAlertProps) {
  const { t } = useTranslate();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="h-10 w-10" size="icon">
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="duration-300 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4">
        <AlertDialogHeader>
          <AlertDialogTitle>{t('clearAllEntries')}</AlertDialogTitle>
          <AlertDialogDescription>{t('clearAllConfirm')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="transition-colors duration-200 hover:bg-muted/50">
            {t('cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground transition-colors duration-200 hover:bg-destructive/90"
          >
            {t('deleteAll')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
