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
} from './ui/alert-dialog';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DeleteAllAlertProps {
  onConfirm: () => void;
  children: React.ReactNode;
  className?: string;
}

export function DeleteAllAlert({ onConfirm, children, className }: DeleteAllAlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className={cn(className)}>
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="duration-300 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4">
        <AlertDialogHeader>
          <AlertDialogTitle>Clear All Entries</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to permanently delete all driving license entries. This action cannot be
            undone and will remove all stored data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="transition-colors duration-200 hover:bg-muted/50">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground transition-colors duration-200 hover:bg-destructive/90"
          >
            Delete All
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
