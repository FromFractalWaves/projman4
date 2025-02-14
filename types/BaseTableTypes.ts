// types/BaseTableTypes.ts

import { ReactNode } from 'react';
import { BaseItem, BaseDataItem, BaseActionConfig, DateFields, BaseComponentState } from './base';

export interface BaseTableItem extends BaseDataItem {
  [key: string]: any;  // Allow for additional dynamic properties
}

export type ActionConfig<T extends BaseTableItem> = BaseActionConfig<T>;

export interface ColumnConfig<T extends BaseTableItem> {
  accessorKey: keyof T | 'actions';
  header: string;
  cell?: (props: { row: { original: T } }) => ReactNode;
  sortable?: boolean;
}

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
  dateFields?: DateFields;
}