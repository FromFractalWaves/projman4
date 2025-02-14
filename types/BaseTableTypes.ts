// types/BaseTableTypes.ts
export interface BaseItem {
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface BaseTableItem extends BaseItem {
    [key: string]: any;  // Allow for dynamic properties
  }
  
  export type ColumnConfig<T extends BaseTableItem> = {
    accessorKey: keyof T | 'actions';
    header: string;
    cell?: (props: { row: { original: T } }) => React.ReactNode;
  }
  
  export type ActionConfig<T extends BaseTableItem> = {
    label: string;
    action: (item: T) => void;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  }
  
  export interface BaseTableProps<T extends BaseTableItem> {
    data: T[];
    columns: ColumnConfig<T>[];
    actions: ActionConfig<T>[];
    title: string;
    addNewItem?: (item: T) => void;
    renderCustomCell?: (item: T, key: keyof T) => React.ReactNode;
    defaultNewItem?: Partial<T>;
  }