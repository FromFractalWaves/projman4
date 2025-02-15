// Updated defaultItems.tsx
import { Status, Priority } from '@/types/base';
import { TaskInput } from '@/types/tasks';
import { ProjectInput } from '@/types/projects';
import { ObjectiveInput } from '@/types/objectives';

export const defaultTask: TaskInput = {
  title: '',
  description: '',
  status: Status.Todo
};

export const defaultProject: ProjectInput = {
  title: '',
  description: '',
  status: Status.Todo,
  priority: Priority.Medium,
  progress: 0,
  dueDate: null
};

export const defaultObjective: ObjectiveInput = {
  title: '',
  description: '',
  status: Status.Todo,
  priority: Priority.Medium,
  progress: 0,
  dueDate: null,
  startOn: null,
  started: null
};