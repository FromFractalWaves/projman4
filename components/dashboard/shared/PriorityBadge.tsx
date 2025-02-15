// components/dashboard/shared/PriorityBadge.tsx
import { Priority } from '@/types/base';

interface PriorityBadgeProps {
  priority: Priority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <span className={`px-2 py-1 rounded-full text-sm ${
      priority === 'critical'
        ? 'bg-red-100 text-red-800'
        : priority === 'high'
        ? 'bg-orange-100 text-orange-800'
        : priority === 'medium'
        ? 'bg-yellow-100 text-yellow-800'
        : 'bg-green-100 text-green-800'
    }`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
}
