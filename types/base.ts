// types/base.ts

import { ReactNode } from 'react';

// Shared enums
export enum Status {
  Todo = 'todo',
  InProgress = 'in_progress',
  Completed = 'completed'
}

export enum Priority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  Critical = 'critical'
}

// Base interfaces
export interface BaseItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BaseDataItem extends BaseItem {
  title: string;
  description: string;
  status: Status;
}

// Shared action configuration
export interface BaseActionConfig<T> {
  label: string;
  action: (item: T) => void | Promise<void>;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  icon?: ReactNode;
  disabled?: boolean;
  tooltip?: string;
}

// Shared date field configurations
export interface DateField {
  label: string;
  value: Date | null;
  enabled: boolean;
}

export interface DateFields {
  [key: string]: DateField;
  startOn: DateField;
  started: DateField;
  dueDate: DateField;
}

// Base component state
export interface BaseComponentState {
  isLoading: boolean;
  error: string | null;
}
