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

interface DeleteAllAlertProps {
  onConfirm: () => void;
  children: React.ReactNode;
}

export function DeleteAllAlert({ onConfirm, children }: DeleteAllAlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>{children}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to delete all entries ?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete all data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
