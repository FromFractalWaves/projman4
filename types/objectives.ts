// types/objective.ts
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

// Utility functions for status and priority display
export const formatStatus = (status: Status): string => {
  switch (status) {
    case 'in_progress':
      return 'In Progress';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

export const formatPriority = (priority: Priority): string => {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
};

// Color utilities for UI
export const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case 'critical':
      return 'text-red-600';
    case 'high':
      return 'text-orange-600';
    case 'medium':
      return 'text-yellow-600';
    case 'low':
      return 'text-green-600';
  }
};

export const getStatusColor = (status: Status): string => {
  switch (status) {
    case 'completed':
      return 'text-green-600';
    case 'in_progress':
      return 'text-blue-600';
    default:
      return 'text-gray-600';
  }
};

// Constants for default values
export const DEFAULT_OBJECTIVE: ObjectiveInput = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  progress: 0,
  dueDate: null
};