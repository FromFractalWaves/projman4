'use client';

import { BaseTable } from '@/components/BaseTableSystem/BaseTable';
import { useTaskStore } from '@/store/taskStore';
import { Task } from '@/types/tasks';
import { useEffect } from 'react';

export function TaskTable() {
  const { tasks, updateTask, deleteTask, addTask, fetchTasks } = useTaskStore();

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const columns = [
    { accessorKey: 'title' as keyof Task, header: 'Title' },
    { accessorKey: 'status' as keyof Task, header: 'Status' },
    { accessorKey: 'description' as keyof Task, header: 'Description' },
    { accessorKey: 'updatedAt' as keyof Task, header: 'Last Updated' },
  ];

  const actions = [
    {
      label: 'Modify',
      action: async (task: Task) => {
        try {
          await updateTask(task.id, task);
          fetchTasks();
        } catch (error) {
          console.error('Error modifying task:', error);
        }
      },
      variant: 'default',
    },
    {
      label: 'Mark In Progress',
      action: async (task: Task) => {
        try {
          await updateTask(task.id, { status: 'in_progress' });
          fetchTasks();
        } catch (error) {
          console.error('Error marking task in progress:', error);
        }
      },
      variant: 'default',
    },
    {
      label: 'Mark Complete',
      action: async (task: Task) => {
        try {
          await updateTask(task.id, { status: 'completed' });
          fetchTasks();
        } catch (error) {
          console.error('Error marking task complete:', error);
        }
      },
      variant: 'default',
    },
    {
      label: 'Delete',
      action: async (task: Task) => {
        try {
          await deleteTask(task.id);
          fetchTasks();
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      },
      variant: 'destructive',
    },
  ];

  const defaultNewItem = {
    title: '',
    description: '',
    status: 'todo' as const,
  };

  return (
    <BaseTable<Task>
      data={tasks}
      columns={columns}
      actions={actions}
      title="Tasks"
      addNewItem={addTask}
      defaultNewItem={defaultNewItem}
    />
  );
}
