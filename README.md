# Project Management Dashboard

A modern, responsive project management dashboard built with Next.js.This application provides a comprehensive system for managing projects, objectives, and tasks with a focus on reusability and component-based architecture.

## Features

### Core Functionality
- **Project Management**: Track projects with status (todo, in progress, completed), priority levels, progress tracking, and due dates
- **Objective Tracking**: Set and monitor objectives with similar tracking capabilities as projects
- **Task Management**: Simple task tracking with status updates and descriptions
- **Dashboard Overview**: Unified view of high-priority projects, in-progress objectives, and recent tasks

### Technical Features
- **Reusable Component Systems**
  - BaseCard System for card-based layouts with action popovers
  - BaseTable System for tabular data with built-in date handling
  - DataTable system for simpler table views
  - Unified date selection component
  
- **Modern Architecture**
  - Type-safe development with TypeScript
  - Client-side components with Next.js 14
  - Global state management using Zustand
  - PostgreSQL database with Prisma ORM
  - RESTful API endpoints

- **UI/UX**
  - Responsive design with Tailwind CSS
  - shadcn/ui component library integration
  - Interactive dialogs and popovers
  - Progress tracking visualizations
  - Status and priority indicators with color coding

## Technology Stack

# Base Component System

## Overview
The `base/` directory contains a set of foundational UI components designed to be reusable, extendable, and customizable across various applications. This system includes core UI elements such as Cards, Tables, and Dashboards, each built to provide flexible functionality while maintaining a consistent design pattern.

## Directory Structure
```
base/
├── BaseCardSystem/
│   ├── BaseCard.tsx
│   ├── BaseCardActionPopover.tsx
│   ├── BaseCardGrid.tsx
├── BaseDashboard/
│   ├── BaseDashboard.tsx
│   ├── BaseDashboardLayout.tsx
│   ├── BaseDashboardWidget.tsx
├── BaseTableSystem/
│   ├── BaseTable.tsx
│   ├── BaseTableActionPopover.tsx
│   ├── DateSelector.tsx
├── CardControlGroup/
│   ├── CardControlGroup.tsx
├── DataTableControlGroup/
│   ├── DataTable.tsx
│   ├── DataTableActionPopover.tsx
```

## BaseCardSystem

### `BaseCard.tsx`
A reusable card component that serves as a container for displaying structured content. It supports dynamic rendering of content and optional action buttons.
- **Props:**
  - `item`: The data object used to populate the card.
  - `renderContent`: Function to render custom content within the card.
  - `title`: Optional title for the card.
  - `actions`: Array of action configurations that determine available interactions.

### `BaseCardActionPopover.tsx`
A popover menu that provides contextual actions for a card.
- **Props:**
  - `item`: The data object related to the card.
  - `actions`: Array of configurable actions such as Modify, Delete, etc.

### `BaseCardGrid.tsx`
A grid layout for rendering multiple `BaseCard` components dynamically.
- **Props:**
  - `items`: Array of objects representing individual cards.
  - `renderContent`: Function to display the content of each card.
  - `cardTitle`: Optional title applied to each card.
  - `actions`: Array of actions available for each card.

## BaseDashboard

### `BaseDashboard.tsx`
A flexible dashboard container that organizes widgets and statistics.
- **Props:**
  - `header`: Header component for the dashboard.
  - `sections`: Array of dashboard sections, each containing a title and content.
  - `stats`: Optional statistics summary displayed at the top.

### `BaseDashboardLayout.tsx`
Defines the layout structure for the dashboard, including a header and content area.

### `BaseDashboardWidget.tsx`
A wrapper component for dashboard widgets, providing a card-style layout with a title and content area.

## BaseTableSystem

### `BaseTable.tsx`
A configurable table component for displaying structured data in a tabular format.
- **Props:**
  - `data`: Array of data objects to populate the table.
  - `columns`: Defines the structure of the table.
  - `actions`: Set of available actions for each row.
  - `title`: Optional table title.
  - `addNewItem`: Callback function for adding new items.

### `BaseTableActionPopover.tsx`
A contextual popover providing action options for table rows.
- **Props:**
  - `item`: The associated row data.
  - `actions`: Array of actions such as Modify, Delete, etc.

### `DateSelector.tsx`
A reusable date picker component for handling date selection and management within tables.

## CardControlGroup

### `CardControlGroup.tsx`
A control group component for managing a set of cards with actions and data entry capabilities.
- **Props:**
  - `data`: List of items to be displayed as cards.
  - `renderContent`: Function to render card content.
  - `title`: Group title.
  - `actions`: Actions available on each card.
  - `addNewItem`: Callback for adding a new item.

## DataTableControlGroup

### `DataTable.tsx`
A structured data table for displaying tabular information with action popovers.
- **Props:**
  - `data`: Data items for the table.
  - `columns`: Table structure definition.
  - `actions`: Actions for each row.
  - `title`: Table title.
  - `addNewItem`: Callback for adding new items.

### `DataTableActionPopover.tsx`
A popover menu providing quick access to row-level actions within `DataTable`.

## Usage
To integrate these components into your project, import the necessary modules and provide the required props:
```tsx
import { BaseCard } from '@/components/base/BaseCardSystem/BaseCard';

<BaseCard
  item={{ id: 1, name: 'Example Item' }}
  renderContent={(item) => <p>{item.name}</p>}
  title="Sample Card"
  actions={[{ label: 'Edit', action: () => console.log('Edit clicked') }]}
/>
```

## Conclusion
The `base/` component system provides a highly modular and reusable set of UI components designed for scalability. Each component follows a structured approach, making it easy to extend and customize based on application needs.

# Dashboard Component System

## Directory Structure
```
dashboard/
├── DashboardLayout/
│   ├── DashboardHeader.tsx
│   ├── DashboardLayout.tsx
├── DashboardStats/
│   ├── DashboardStats.tsx
├── EnhancedDashboard/
│   ├── EnhancedDashboard.tsx
├── IntegratedDashboard/
│   ├── IntegratedDashboard.tsx
│   ├── index.ts
├── shared/
│   ├── PriorityBadge.tsx
│   ├── ProgressBar.tsx
│   ├── StatusBadge.tsx
│   ├── actionConfigs.tsx
│   ├── cardRenders.tsx
│   ├── dateFields.tsx
│   ├── defaultItems.tsx
│   ├── statsConfig.tsx
```

## DashboardLayout

### `DashboardHeader.tsx`
Provides the header section for the dashboard, including options to add tasks, projects, and objectives.
- **Props:**
  - `onAddTask`: Function to add a new task.
  - `onAddProject`: Function to add a new project.
  - `onAddObjective`: Function to add a new objective.
  - `viewModes`: Object storing the current view mode (`table` or `card`) for different entities.
  - `onToggleView`: Function to switch between `table` and `card` views.

### `DashboardLayout.tsx`
Defines the structure of the dashboard, integrating multiple sections for tasks, projects, and objectives.
- **Props:**
  - `header`: Header component of the dashboard.
  - `sections`: Array of dashboard sections, each containing a title and content.
  - `stats`: Optional statistical summary.

## DashboardStats

### `DashboardStats.tsx`
Displays key performance metrics in the form of statistics cards.
- **Props:**
  - `stats`: Array of statistical data objects (e.g., total tasks, active projects, completed objectives).
  - `isLoading`: Boolean indicating whether data is being loaded.
  - `error`: Optional error message when loading fails.

## EnhancedDashboard

### `EnhancedDashboard.tsx`
Expands upon the standard dashboard with additional analytics, such as progress trends over time.
- **Props:**
  - Uses the same props as `DashboardLayout.tsx` but includes a progress chart that tracks entity completion over a 7-day period.

## IntegratedDashboard

### `IntegratedDashboard.tsx`
Combines multiple dashboard functionalities into a single, cohesive interface, incorporating statistics, task/project/objective views, and an action-based UI.
- **Props:**
  - `header`: Dashboard header with entity addition and view toggles.
  - `viewModes`: Controls `card` or `table` layout selection for each entity type.
  - `taskActions`: Actions for task management.
  - `projectActions`: Actions for project management.
  - `objectiveActions`: Actions for objective management.

## Shared Utilities

### `PriorityBadge.tsx`
Displays priority levels (low, medium, high, critical) with color-coded badges.

### `ProgressBar.tsx`
Renders a progress bar showing the completion percentage of a project or objective.

### `StatusBadge.tsx`
Visual indicator of an entity's status (e.g., `completed`, `in progress`).

### `actionConfigs.tsx`
Defines action handlers for modifying, deleting, and updating tasks, projects, and objectives.

### `cardRenders.tsx`
Reusable render functions for displaying tasks, projects, and objectives within cards.

### `dateFields.tsx`
Manages date-related inputs for projects and objectives.

### `defaultItems.tsx`
Provides default data structures for tasks, projects, and objectives.

### `statsConfig.tsx`
Configures the statistical data displayed in the dashboard.

## Usage Example
To integrate the dashboard into your application:
```tsx
import { IntegratedDashboard } from '@/components/dashboard/IntegratedDashboard';

export default function DashboardPage() {
  return <IntegratedDashboard />;
}
```

## Directory Structure
```
entityTypes/
├── objective/
│   ├── ObjectiveTable.tsx
│   ├── ObjectiveCards.tsx
├── project/
│   ├── ProjectTable.tsx
│   ├── ProjectCards.tsx
├── task/
│   ├── TaskTable.tsx
│   ├── TaskCards.tsx
```

Each subdirectory contains components for managing and displaying its respective entity type using tables and cards.

---

## Objectives

### `ObjectiveTable.tsx`
A tabular representation of objectives using the `BaseTable` system.

- **Props:**
  - Fetches objectives from `useObjectiveStore` and displays them in a structured table.
  - Uses `BaseTable` for consistency in design.
  - Implements a custom cell renderer for status, priority, progress, and due date.
  - Allows modification, deletion, and status updates (In Progress, Complete) via an action popover.

**Usage:**
```tsx
<ObjectiveTable />
```

### `ObjectiveCards.tsx`
A card-based representation of objectives using the `BaseCard` system.

- **Props:**
  - Displays objectives in a card layout with status, priority, and progress indicators.
  - Uses `BaseCard` for consistent UI components.
  - Supports contextual actions for modifying and updating objectives.

**Usage:**
```tsx
<ObjectiveCard objective={objectiveData} actions={objectiveActions} />
```

---

## Projects

### `ProjectTable.tsx`
A tabular representation of projects.

- **Props:**
  - Fetches projects from `useProjectStore`.
  - Displays project status, priority, progress, due date, and description.
  - Supports modifications, status updates, and deletions.

**Usage:**
```tsx
<ProjectTable />
```

### `ProjectCards.tsx`
A card-based representation of projects.

- **Props:**
  - Displays projects with priority indicators, progress bars, and status badges.
  - Uses `BaseCard` for consistent UI.
  - Supports action popovers for modifying, marking progress, and deleting.

**Usage:**
```tsx
<ProjectCard project={projectData} actions={projectActions} />
```

---

## Tasks

### `TaskTable.tsx`
A tabular representation of tasks.

- **Props:**
  - Fetches tasks from `useTaskStore`.
  - Displays task title, status, description, and last update time.
  - Supports modifications, status updates, and deletions.

**Usage:**
```tsx
<TaskTable />
```

### `TaskCards.tsx`
A card-based representation of tasks.

- **Props:**
  - Displays task information with status indicators.
  - Uses `BaseCard` for consistent UI.
  - Supports action popovers for modifying, marking progress, and deleting.

**Usage:**
```tsx
<TaskCard task={taskData} actions={taskActions} />
```

---

---

# Store System

## Overview  
The `store/` directory contains Zustand-based global state management hooks for handling objectives, projects, and tasks. Each store provides a structured API for fetching, adding, updating, and deleting entities while maintaining a clean, modular architecture.

## Directory Structure  
```
store/
├── objectiveStore.ts  # Handles objectives state and actions
├── projectStore.ts    # Handles projects state and actions
└── taskStore.ts       # Handles tasks state and actions
```

---

## `objectiveStore.ts`

### Description  
Manages the global state for objectives, allowing retrieval, creation, updates, and deletion. Built with Zustand for efficient, client-side state management.

### State Structure  
```ts
interface ObjectiveState {
  objectives: Objective[];  // List of objectives
  isLoading: boolean;       // Loading state
  error: string | null;     // Error message if any
  fetchObjectives: () => Promise<void>;  // Fetch all objectives
  addObjective: (objective: ObjectiveInput) => Promise<void>;  // Create a new objective
  updateObjective: (id: string, updates: Partial<Objective>) => Promise<void>;  // Update objective
  deleteObjective: (id: string) => Promise<void>;  // Delete objective
}
```

### Usage Example  
```tsx
import { useObjectiveStore } from '@/store/objectiveStore';

const { objectives, fetchObjectives, addObjective } = useObjectiveStore();

// Fetch objectives on component mount
useEffect(() => {
  fetchObjectives();
}, []);

// Add a new objective
addObjective({ title: "New Objective", dueDate: "2025-02-20" });
```

---

## `projectStore.ts`

### Description  
Manages project-related data with state handling for fetching, adding, updating, and deleting projects.

### State Structure  
```ts
interface ProjectState {
  projects: Project[];  // List of projects
  isLoading: boolean;   // Loading state
  error: string | null; // Error message if any
  fetchProjects: () => Promise<void>;  // Fetch all projects
  addProject: (project: ProjectInput) => Promise<void>;  // Create a new project
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>;  // Update project
  deleteProject: (id: string) => Promise<void>;  // Delete project
}
```

### Usage Example  
```tsx
import { useProjectStore } from '@/store/projectStore';

const { projects, fetchProjects, addProject } = useProjectStore();

// Fetch projects on component mount
useEffect(() => {
  fetchProjects();
}, []);

// Add a new project
addProject({ title: "New Project", priority: "High" });
```

---

## `taskStore.ts`

### Description  
Manages task-related operations, ensuring consistency across task retrieval, creation, updates, and deletions.

### State Structure  
```ts
interface TaskState {
  tasks: Task[];  // List of tasks
  isLoading: boolean;   // Loading state
  error: string | null; // Error message if any
  fetchTasks: () => Promise<void>;  // Fetch all tasks
  addTask: (task: TaskInput) => Promise<void>;  // Create a new task
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;  // Update task
  deleteTask: (id: string) => Promise<void>;  // Delete task
}
```

### Usage Example  
```tsx
import { useTaskStore } from '@/store/taskStore';

const { tasks, fetchTasks, addTask } = useTaskStore();

// Fetch tasks on component mount
useEffect(() => {
  fetchTasks();
}, []);

// Add a new task
addTask({ title: "New Task", status: "Pending" });
```

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

structure

projman3-webui-new/
├── README.md
├── app/
│   ├── api/
│   │   ├── objectives/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   ├── projects/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   └── tasks/
│   │       ├── [id]/
│   │       │   └── route.ts
│   │       └── route.ts
│   ├── base/
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── new/
│   │   └── page.tsx
│   └── page.tsx
├── components/
│   ├── base/
│   │   ├── BaseCardSystem/
│   │   │   ├── BaseCard.tsx
│   │   │   ├── BaseCardActionPopover.tsx
│   │   │   └── BaseCardGrid.tsx
│   │   ├── BaseDashboard/
│   │   │   ├── BaseDashboard.tsx
│   │   │   ├── BaseDashboardLayout.tsx
│   │   │   └── BaseDashboardWidget.tsx
│   │   ├── BaseTableSystem/
│   │   │   ├── BaseTable.tsx
│   │   │   ├── BaseTableActionPopover.tsx
│   │   │   └── DateSelector.tsx
│   │   ├── CardControlGroup/
│   │   │   └── CardControlGroup.tsx
│   │   └── DataTableControlGroup/
│   │       ├── DataTable.tsx
│   │       ├── DataTableActionPopover.tsx
│   │       └── index.ts
│   ├── dashboard/
│   │   ├── DashboardLayout/
│   │   │   ├── DashboardHeader.tsx
│   │   │   └── DashboardLayout.tsx
│   │   ├── DashboardStats/
│   │   │   └── DashboardStats.tsx
│   │   ├── EnhancedDashboard/
│   │   │   └── EnhancedDashboard.tsx
│   │   ├── IntegratedDashboard/
│   │   │   ├── IntegratedDashboard.tsx
│   │   │   └── index.ts
│   │   └── shared/
│   │       ├── PriorityBadge.tsx
│   │       ├── ProgressBar.tsx
│   │       ├── StatusBadge.tsx
│   │       ├── actionConfigs.tsx
│   │       ├── cardRenders.tsx
│   │       ├── dateFields.tsx
│   │       ├── defaultItems.tsx
│   │       └── statsConfig.tsx
│   ├── entityType/
│   │   ├── objective/
│   │   │   ├── ObjectiveTable.tsx
│   │   │   └── Objectivecards.tsx
│   │   ├── project/
│   │   │   ├── ProjectCards.tsx
│   │   │   └── ProjectTable.tsx
│   │   └── task/
│   │       ├── TaskCards.tsx
│   │       └── TaskTable.tsx
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── popover.tsx
│       └── table.tsx
├── components.json
├── docs/
│   ├── BaseCard_system.md
│   ├── dashboard.md
│   ├── revelations.md
│   ├── short_lists.md
│   ├── stack.md
│   └── whats_the_idea.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── store/
│   ├── objectiveStore.ts
│   ├── projectStore.ts
│   └── taskStore.ts
├── tailwind.config.ts
├── tsconfig.json
└── types/
    ├── BaseCardTypes.ts
    ├── BaseTableTypes.ts
    ├── DataTableTypes.ts
    ├── base.ts
    ├── objectives.ts
    ├── projects.ts
    └── tasks.ts