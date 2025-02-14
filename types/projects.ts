import { BaseItem } from './BaseTableTypes';

export type Status = 'todo' | 'in_progress' | 'completed';
export type Priority = 'low' | 'medium' | 'high' | 'critical';

export interface Project extends BaseItem {
  title: string;
  description: string;
  status: Status;
  dueDate: Date | null;
  priority: Priority;
  progress: number;
}

// Input type for creating/updating projects without system fields
export type ProjectInput = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

// Default values for a new project
export const DEFAULT_PROJECT: ProjectInput = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  progress: 0,
  dueDate: null,
};
