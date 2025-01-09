import { FileStack } from 'lucide-react';

export function EmptyList() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-4 bg-muted/30 p-8 text-center">
      <div className="rounded-full bg-emerald-100 p-4 dark:bg-emerald-900/30">
        <FileStack className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          No Driving Licenses Yet
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Start by generating your first driving license using the form on the left.
        </p>
      </div>
    </div>
  );
}
