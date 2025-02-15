# Dashboard Component System

## Overview
The `dashboard/` directory contains a modular set of dashboard components designed for structuring and displaying project-related data. These components facilitate seamless integration of tasks, projects, and objectives, while providing flexible layouts, dynamic content rendering, and action controls.

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

## Conclusion
The `dashboard/` component system provides a highly flexible and scalable foundation for managing tasks, projects, and objectives. By modularizing UI elements and implementing shared utilities, this system enables dynamic and efficient dashboard creation.

