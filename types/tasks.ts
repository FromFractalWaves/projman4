import { BaseItem } from './BaseTableTypes';

export type Status = 'todo' | 'in_progress' | 'completed';

export interface Task extends BaseItem {
  title: string;
  description: string;
  status: Status;
}

export type TaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

export const DEFAULT_TASK: TaskInput = {
  title: '',
  description: '',
  status: 'todo',
};
