// components/DataTableControlGroup/DataTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataTableActionPopover } from "./DataTableActionPopover"
import { Plus } from "lucide-react"
import { BaseItem, DataTableProps } from "@/types/DataTableTypes"

export function DataTable<T extends BaseItem>({
  data,
  columns,
  actions,
  title,
  addNewItem,
}: DataTableProps<T>) {
  const finalColumns = [
    ...columns,
    {
      accessorKey: 'actions',
      header: '', // Removed the "Actions" label
      cell: ({ row }: { row: { original: T } }) => (
        <DataTableActionPopover item={row.original} actions={actions} />
      ),
    },
  ]

  const formatCellValue = (item: T, accessorKey: keyof T | 'actions'): string => {
    if (accessorKey === 'actions') return '';
    
    const value = item[accessorKey];
    
    // Handle dates specifically
    if (accessorKey === 'createdAt' || accessorKey === 'updatedAt') {
      const dateValue = value as unknown as Date;
      return dateValue instanceof Date 
        ? dateValue.toLocaleDateString()
        : new Date(dateValue).toLocaleDateString();
    }
    
    return String(value);
  }

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
  )
}