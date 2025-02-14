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
import { BaseTableActionPopover } from "./BaseTableActionPopover";
import { BaseTableItem, BaseTableProps } from "@/types/BaseTableTypes";

export function BaseTable<T extends BaseTableItem>({
  data,
  columns,
  actions,
  title,
  addNewItem,
  renderCustomCell,
}: BaseTableProps<T>) {
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
    
    // Handle dates
    if (value && typeof value === 'object' && 'toLocaleDateString' in value) {
      return value.toLocaleDateString();
    }
    
    // Handle other types
    return String(value);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {addNewItem && (
          <Button onClick={addNewItem} size="sm">
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
    </Card>
  );
}