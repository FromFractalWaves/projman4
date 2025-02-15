// types/objectives.ts
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
