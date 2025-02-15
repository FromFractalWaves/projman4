# Entity Types Component System

## Overview
The `entityTypes/` directory provides a structured system for managing different entities within the project management dashboard. Each entity type—such as objectives, projects, and tasks—has a dedicated set of components for tabular and card-based representations, ensuring modularity and consistency across the application.

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

## Conclusion
The `entityTypes/` system provides a structured and scalable approach to managing objectives, projects, and tasks within the project management dashboard. By leveraging `BaseTable` and `BaseCard`, the system ensures consistency, modularity, and ease of maintenance. The table-based and card-based views offer flexibility in displaying and interacting with different entities based on user preferences and use cases.

