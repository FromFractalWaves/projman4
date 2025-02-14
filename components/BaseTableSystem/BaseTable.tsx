// components/BaseTableSystem/BaseTable.tsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BaseTableActionPopover } from "./BaseTableActionPopover";
import { BaseTableItem, BaseTableProps } from "@/types/BaseTableTypes";

// Map frontend display values to Prisma enum values
const normalizeStatus = (status: string) => {
  switch (status.toLowerCase()) {
    case 'in progress':
      return 'in_progress';
    case 'in-progress':
      return 'in_progress';
    case 'todo':
      return 'todo';
    case 'completed':
      return 'completed';
    default:
      return status;
  }
};

// Map Prisma enum values to frontend display values
const denormalizeStatus = (status: string) => {
  switch (status.toLowerCase()) {
    case 'in_progress':
      return 'In Progress';
    case 'todo':
      return 'Todo';
    case 'completed':
      return 'Completed';
    default:
      return status;
  }
};

export function BaseTable<T extends BaseTableItem>({
  data,
  columns,
  actions,
  title,
  addNewItem,
  renderCustomCell,
  defaultNewItem,
}: BaseTableProps<T>) {
  const [isAddingNew, setIsAddingNew] = React.useState(false);
  const [newItem, setNewItem] = React.useState<Partial<T>>(defaultNewItem || {});

  const finalColumns = [
    ...columns,
    {
      accessorKey: 'actions' as keyof T | 'actions',
      header: '',
      cell: ({ row }: { row: { original: T } }) => (
        <BaseTableActionPopover item={row.original} actions={actions} />
      ),
    },
  ];

  const formatCellValue = (item: T, accessorKey: keyof T | 'actions'): React.ReactNode => {
    if (accessorKey === 'actions') return '';
    
    // If there's a custom renderer for this cell, use it
    if (renderCustomCell) {
      const customRendered = renderCustomCell(item, accessorKey as keyof T);
      if (customRendered) return customRendered;
    }
    
    const value = item[accessorKey];
    
    // Handle status specially
    if (accessorKey === 'status') {
      return denormalizeStatus(String(value));
    }
    
    // Handle dates
    if (value instanceof Date) {
      return value.toLocaleDateString();
    }
    
    return String(value);
  };

  const handleAddNew = () => {
    if (addNewItem) {
      // Normalize the status before sending to the API
      const normalizedItem = {
        ...newItem,
        status: newItem.status ? normalizeStatus(String(newItem.status)) : 'todo'
      };
      addNewItem(normalizedItem as T);
      setNewItem(defaultNewItem || {});
      setIsAddingNew(false);
    }
  };

  const renderAddFields = () => {
    return columns.map((column) => {
      const key = String(column.accessorKey);
      // Skip internal fields and actions column
      if (['id', 'createdAt', 'updatedAt', 'actions'].includes(key)) return null;

      return (
        <div key={key} className="grid gap-2">
          <Label htmlFor={key} className="capitalize">{key}</Label>
          {key === 'status' ? (
            <select
              id={key}
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background"
              value={String(newItem[key] || 'todo')}
              onChange={(e) => setNewItem({...newItem, [key]: e.target.value})}
            >
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          ) : key === 'priority' ? (
            <select
              id={key}
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background"
              value={String(newItem[key] || 'medium')}
              onChange={(e) => setNewItem({...newItem, [key]: e.target.value})}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          ) : (
            <Input
              id={key}
              type="text"
              value={String(newItem[key] || '')}
              onChange={(e) => setNewItem({...newItem, [key]: e.target.value})}
            />
          )}
        </div>
      );
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {addNewItem && (
          <Button onClick={() => setIsAddingNew(true)} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {finalColumns.map((column) => (
                <TableHead key={String(column.accessorKey)}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: T) => (
              <TableRow key={item.id}>
                {finalColumns.map((column) => (
                  <TableCell key={`${item.id}-${String(column.accessorKey)}`}>
                    {column.cell 
                      ? column.cell({ row: { original: item } })
                      : formatCellValue(item, column.accessorKey)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {renderAddFields()}
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => {
              setIsAddingNew(false);
              setNewItem(defaultNewItem || {});
            }}>
              Cancel
            </Button>
            <Button onClick={handleAddNew}>
              Add
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}