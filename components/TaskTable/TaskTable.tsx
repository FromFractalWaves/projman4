// app/components/TaskTable/TaskTable.tsx
import React from 'react';
import { DataTable } from '../DataTableControlGroup/DataTable';
import { Task } from '@/types/task';
import { useTaskStore } from '@/store/taskStore';
import { ColumnConfig } from '@/types/DataTableTypes';

export function TaskTable() {
  const { tasks, updateTask, deleteTask, addTask } = useTaskStore();

  const columns: ColumnConfig<Task>[] = [
    { 
      accessorKey: 'title',
      header: 'Title'
    },
    { 
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className={
          row.original.status === 'completed' ? 'text-green-600' :
          row.original.status === 'in-progress' ? 'text-blue-600' :
          'text-gray-600'
        }>
          {row.original.status}
        </span>
      )
    },
    { 
      accessorKey: 'description',
      header: 'Description'
    },
    { 
      accessorKey: 'updatedAt',
      header: 'Last Updated',
      cell: ({ row }) => new Date(row.original.updatedAt).toLocaleDateString()
    }
  ];

  const actions = [
    {
      label: 'Mark In Progress',
      action: (task: Task) => updateTask(task.id, { status: 'in-progress' }),
      variant: 'secondary' as const
    },
    {
      label: 'Mark Complete',
      action: (task: Task) => updateTask(task.id, { status: 'completed' }),
      variant: 'default' as const
    },
    {
      label: 'Delete',
      action: (task: Task) => deleteTask(task.id),
      variant: 'destructive' as const
    }
  ];

  const handleAddNewTask = () => {
    addTask({
      title: 'New Task',
      description: 'Add description here',
      status: 'todo'
    });
  };

  return (
    <DataTable<Task>
      data={tasks}
      columns={columns}
      actions={actions}
      title="Tasks"
      addNewItem={handleAddNewTask}
    />
  );
}