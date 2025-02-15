---

# Type Definitions

## Overview  
The `types/` directory defines TypeScript interfaces and types for various components of the project management dashboard. These types ensure consistency across the application and improve type safety for entities, components, and actions.

## Directory Structure  
```
types/
├── BaseCardTypes.ts   # Types for card-based UI components
├── BaseTableTypes.ts  # Types for table-based UI components
├── DataTableTypes.ts  # Types for data table components
├── base.ts            # Core shared types (statuses, priorities, base structures)
├── objectives.ts      # Types for objectives
├── projects.ts        # Types for projects
└── tasks.ts           # Types for tasks
```

---

## `BaseCardTypes.ts`

### Description  
Defines type structures for card-based UI components, ensuring flexibility and consistency in rendering data.

### Type Definitions  
```ts
import { ReactNode } from 'react';
import { BaseDataItem, BaseActionConfig } from './base';

export interface BaseCardItem extends BaseDataItem {
  [key: string]: any;
}

export type ActionConfig<T extends BaseCardItem> = BaseActionConfig<T>;

export interface BaseCardProps<T extends BaseCardItem> {
  item: T;
  renderContent: (item: T) => ReactNode;
  title?: string;
  actions?: ActionConfig<T>[];
  className?: string;
}

export interface BaseCardGridProps<T extends BaseCardItem> {
  items: T[];
  renderContent: (item: T) => ReactNode;
  cardTitle?: string;
  actions?: ActionConfig<T>[];
  gridClassName?: string;
}
```

---

## `BaseTableTypes.ts`

### Description  
Defines type structures for table-based UI components.

### Type Definitions  
```ts
import { ReactNode } from 'react';
import { BaseDataItem, BaseActionConfig, ColumnConfig, BaseComponentState } from './base';

export interface BaseTableItem extends BaseDataItem {
  [key: string]: any;
}

export type ActionConfig<T extends BaseTableItem> = BaseActionConfig<T>;

export interface BaseTableProps<T extends BaseTableItem> extends BaseComponentState {
  data: T[];
  columns: ColumnConfig<T>[];
  actions: ActionConfig<T>[];
  title: string;
  addNewItem?: (item: T) => void | Promise<void>;
  renderCustomCell?: (item: T, key: keyof T) => ReactNode;
  defaultNewItem?: Partial<T>;
  className?: string;
  emptyStateMessage?: string;
}
```

---

## `DataTableTypes.ts`

### Description  
Defines type structures for general data table components.

### Type Definitions  
```ts
export interface BaseItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ColumnConfig<T> = {
  accessorKey: keyof T | 'actions';
  header: string;
  cell?: (props: { row: { original: T } }) => React.ReactNode;
};

export type ActionConfig<T> = {
  label: string;
  action: (item: T) => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
};

export interface DataTableProps<T extends BaseItem> {
  data: T[];
  columns: ColumnConfig<T>[];
  actions: ActionConfig<T>[];
  title: string;
  addNewItem?: () => void;
}
```

---

## `base.ts`

### Description  
Contains core shared types, including status enums, priority levels, and reusable interfaces.

### Type Definitions  
```ts
import { ReactNode } from 'react';

export enum Status {
  Todo = 'todo',
  InProgress = 'in_progress',
  Completed = 'completed',
}

export enum Priority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  Critical = 'critical',
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

// Shared entity data type
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
```

---

## `objectives.ts`

### Description  
Defines the structure for objectives, ensuring consistency in data representation.

### Type Definitions  
```ts
import { BaseDataItem, BasePrioritizedInput, Status, Priority } from './base';

export interface Objective extends BaseDataItem {
  status: Status;
  priority: Priority;
  progress: number;
  dueDate: Date | null;
  startOn?: Date | null;
  started?: Date | null;
}

export interface ObjectiveInput extends BasePrioritizedInput {
  status?: Status;
  priority?: Priority;
  progress?: number;
  dueDate?: Date | null;
  startOn?: Date | null;
  started?: Date | null;
}
```

---

## `projects.ts`

### Description  
Defines the structure for projects, ensuring type safety for data representation.

### Type Definitions  
```ts
import { BaseDataItem, BasePrioritizedInput, Status, Priority } from './base';

export interface Project extends BaseDataItem {
  status: Status;
  priority: Priority;
  progress: number;
  dueDate: Date | null;
}

export interface ProjectInput extends BasePrioritizedInput {
  status?: Status;
  priority?: Priority;
  progress?: number;
  dueDate?: Date | null;
}
```

---

## `tasks.ts`

### Description  
Defines the structure for tasks, ensuring uniformity in data handling.

### Type Definitions  
```ts
import { BaseDataItem, BaseInput, Status } from './base';

export interface Task extends BaseDataItem {
  status: Status;
}

export interface TaskInput extends BaseInput {
  status?: Status;
}
```

---

## Conclusion  
The `types/` system provides a robust and structured approach to type safety, ensuring that the project management dashboard remains scalable and maintainable. By centralizing type definitions, the system enforces consistency across components, improving code reliability and developer experience.