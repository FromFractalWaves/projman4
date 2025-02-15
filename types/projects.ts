// types/projects.ts
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