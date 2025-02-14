// app/types/DataTableTypes.ts
export interface BaseItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ColumnConfig<T> = {
  accessorKey: keyof T | 'actions';
  header: string;
  cell?: (props: { row: { original: T } }) => React.ReactNode;
}

export type ActionConfig<T> = {
  label: string;
  action: (item: T) => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

export interface DataTableProps<T extends BaseItem> {
  data: T[];
  columns: ColumnConfig<T>[];
  actions: ActionConfig<T>[];
  title: string;
  addNewItem?: () => void;
}