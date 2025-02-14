// app/components/TaskTable/TaskTypes.ts
import { BaseItem } from '@/types/DataTableTypes';

export interface Task extends BaseItem {
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
}