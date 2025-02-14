import { useEffect } from 'react';
import { BaseTable } from '../BaseTableSystem/BaseTable';
import { Task } from '@prisma/client';
import { useTaskStore } from '@/store/taskStore';

export function TaskTable() {
  const { tasks, fetchTasks, updateTask, deleteTask, addTask, isLoading } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const columns = [
    { 
      accessorKey: 'title' as keyof Task,
      header: 'Title'
    },
    { 
      accessorKey: 'status' as keyof Task,
      header: 'Status'
    },
    { 
      accessorKey: 'description' as keyof Task,
      header: 'Description'
    },
    { 
      accessorKey: 'updatedAt' as keyof Task,
      header: 'Last Updated'
    }
  ];

  const renderCustomCell = (item: Task, key: keyof Task) => {
    if (key === 'status') {
      return (
        <span className={
          item.status === 'completed' ? 'text-green-600' :
          item.status === 'in_progress' ? 'text-blue-600' :
          'text-gray-600'
        }>
          {item.status === 'in_progress' ? 'in progress' : item.status}
        </span>
      );
    }
    return null;
  };

  const actions = [
    {
      label: 'Modify',
      action: (task: Task) => updateTask(task.id, task),
      variant: 'default' as const
    },
    {
      label: 'Mark In Progress',
      action: (task: Task) => updateTask(task.id, { status: 'in_progress' }),
      variant: 'default' as const
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

  const handleAddNewTask = (taskData: Partial<Task>) => {
    addTask({
      title: taskData.title || '',
      description: taskData.description || '',
      status: taskData.status || 'todo'
    });
  };

  const defaultNewItem = {
    title: '',
    description: '',
    status: 'todo' as const
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BaseTable<Task>
      data={tasks}
      columns={columns}
      actions={actions}
      title="Tasks"
      addNewItem={handleAddNewTask}
      renderCustomCell={renderCustomCell}
      defaultNewItem={defaultNewItem}
    />
  );
}