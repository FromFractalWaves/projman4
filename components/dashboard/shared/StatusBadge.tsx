// components/dashboard/shared/StatusBadge.tsx
import { Status } from '@/types/base';

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`px-2 py-1 rounded-full text-sm ${
      status === 'completed' 
        ? 'bg-green-100 text-green-800' 
        : status === 'in_progress'
        ? 'bg-blue-100 text-blue-800'
        : 'bg-gray-100 text-gray-800'
    }`}>
      {status === 'in_progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}