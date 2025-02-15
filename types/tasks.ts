// types/tasks.ts
import { BaseDataItem, BaseInput, Status } from './base';

export interface Task extends BaseDataItem {
  status: Status;
}

export interface TaskInput extends BaseInput {
  status?: Status;
}