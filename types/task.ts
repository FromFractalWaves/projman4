// app/types/task.ts
import { BaseItem } from './DataTableTypes'

export interface Task extends BaseItem {
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
}