import { FileStack } from 'lucide-react';

export function EmptyList() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-4 bg-muted/30 p-8 text-center">
      <FileStack className="h-16 w-16 text-muted-foreground" />
      <div className="space-y-2">
        <h2 className="text-xl font-semibold dark:text-white">No Driving Licenses Yet</h2>
        <p className="text-sm text-muted-foreground">
          Start by generating your first driving license using the form on the left.
        </p>
      </div>
    </div>
  );
}
