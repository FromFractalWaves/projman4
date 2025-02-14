import { BaseItem } from './BaseTableTypes';

export type Status = 'todo' | 'in_progress' | 'completed';
export type Priority = 'low' | 'medium' | 'high' | 'critical';

export interface Objective extends BaseItem {
  title: string;
  description: string;
  status: Status;
  dueDate: Date | null;
  priority: Priority;
  progress: number;
}

// Input type for creating/updating objectives without system fields
export type ObjectiveInput = Omit<Objective, 'id' | 'createdAt' | 'updatedAt'>;

// Type for objective updates that makes all fields optional
export type ObjectiveUpdate = Partial<ObjectiveInput>;

// Type guard to check if a status string is a valid Status
export function isValidStatus(status: string): status is Status {
  return ['todo', 'in_progress', 'completed'].includes(status);
}

// Type guard to check if a priority string is a valid Priority
export function isValidPriority(priority: string): priority is Priority {
  return ['low', 'medium', 'high', 'critical'].includes(priority);
}

// Constants
export const DEFAULT_OBJECTIVE: ObjectiveInput = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  progress: 0,
  dueDate: null
};