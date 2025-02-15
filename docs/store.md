
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