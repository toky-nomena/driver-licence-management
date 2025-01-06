import { Trash2 } from 'lucide-react';

import type { StoredLicense } from './types';

import { Button } from '@/components/ui/button';

interface LicenseListItemProps {
  item: StoredLicense;
  onDelete: (id: string) => void;
}

export function LicenseListItem({ item, onDelete }: LicenseListItemProps) {
  return (
    <li className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
      <div className="flex items-center gap-3">
        <figure
          className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-semibold"
          aria-label="User Initials"
        >
          <span className="text-sm">
            {item.firstName.charAt(0).toUpperCase() + item.lastName.charAt(0).toUpperCase()}
          </span>
        </figure>
        <div>
          <h3 className="font-semibold text-foreground">
            {item.firstName} {item.lastName}
          </h3>
          <p className="text-sm text-muted-foreground">Province: {item.province}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <dl className="grid grid-cols-2 gap-x-4 text-sm">
          <dt className="text-muted-foreground">License</dt>
          <dd className="font-medium">{item.drivingLicense || 'Not issued'}</dd>
          <dt className="text-muted-foreground">Birth Date</dt>
          <dd className="font-medium">
            {item.dateOfBirth
              ? new Date(item.dateOfBirth).toLocaleDateString('en-CA')
              : 'Not provided'}
          </dd>
        </dl>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(item.id)}
          aria-label="Delete License"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </li>
  );
}
