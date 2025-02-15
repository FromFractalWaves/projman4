// types/base.ts
import { ReactNode } from 'react';

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


// Base interfaces with system fields
export interface BaseItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Base interfaces for input types (without system fields)
export interface BaseInput {
  title: string;
  description: string;
  status?: Status;
}


export interface BasePrioritizedInput extends BaseInput {
  priority?: Priority;
  progress?: number;
  dueDate?: Date | null;
}

// Update BaseDataItem to include all shared fields
export interface BaseDataItem extends BaseItem {
  title: string;
  description: string;
  status: Status;
  priority?: Priority;
  progress?: number;
  dueDate?: Date | null;
}

// Update BaseDataItem to include all shared fields
export interface BaseDataItem extends BaseItem {
  title: string;
  description: string;
  status: Status;
  priority?: Priority;
  progress?: number;
  dueDate?: Date | null;
}

// Define the ColumnConfig type
export interface ColumnConfig<T> {
  accessorKey: keyof T;
  header: string;
  cell?: (props: { row: { original: T } }) => ReactNode;
  sortable?: boolean;
}

// Action configuration
export interface BaseActionConfig<T> {
  label: string;
  action: (item: T) => void | Promise<void>;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  icon?: ReactNode;
  disabled?: boolean;
  tooltip?: string;
}

// Update base types with proper interfaces
export interface BaseCardProps<T extends BaseDataItem> {
  item: T;
  renderContent: (item: T) => ReactNode;
  cardTitle?: string;
  actions?: BaseActionConfig<T>[];
  className?: string;
}

export interface BaseTableProps<T extends BaseDataItem> {
  data: T[];
  columns: ColumnConfig<T>[];
  actions: BaseActionConfig<T>[];
  title: string;
  addNewItem?: (newItem: Partial<T>) => void | Promise<void>;
  renderCustomCell?: (item: T, key: keyof T) => ReactNode;
  defaultNewItem?: Partial<T>;
  className?: string;
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

