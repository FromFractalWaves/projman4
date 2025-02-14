// app/components/TaskTable.tsx

'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useTaskStore } from '../store/taskStore'
import { Task } from '../types/task'

export function TaskTable() {
  const { tasks, updateTask, deleteTask } = useTaskStore()
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const columns = [
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'createdAt', header: 'Created At' },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }: { row: { original: Task } }) => (
        <Popover>
          <PopoverTrigger className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
            Actions
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div className="p-2 space-y-2">
              <div className="text-sm font-medium">Task Options</div>
              <select 
                value={row.original.status}
                onChange={(e) => updateTask(row.original.id, { status: e.target.value as Task['status'] })}
                className="w-full p-1 border rounded"
              >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <button 
                className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-red-600"
                onClick={() => deleteTask(row.original.id)}
              >
                Delete Task
              </button>
            </div>
          </PopoverContent>
        </Popover>
      ),
    },
  ]

  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.accessorKey}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              {columns.map((column) => (
                <TableCell key={`${task.id}-${column.accessorKey}`}>
                  {column.cell ? 
                    column.cell({ row: { original: task } }) : 
                    column.accessorKey === 'createdAt' ?
                      new Date(task[column.accessorKey]).toLocaleDateString() :
                      task[column.accessorKey as keyof Task]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
